import { NextResponse } from "next/server";
import { getIronSession} from "iron-session/edge";
import { db } from "./utils/db";

/**
 * @param {import("next/server").NextRequest} req
 * @returns {Promise<NextResponse>}
 *
 * Handle iron session management across all routes
 *
 * Cases:
 * 1. Route is * and user is not logged in -> redirect to login page
 * 2. Route is * and user is logged in -> continue
 * 3. Route is /login and user is not logged in -> continue
 * 4. Route is /login and user is logged in -> redirect to home page
 * 5. Route is /login, user is not logged in but credentials are in the request body
 *      -> process login & redirect to path in query string
 */
export const middleware = async (req) => {
    const res = NextResponse.next();
    const session = await getIronSession(req, res, {
        cookieName: '_fe',
        password: process.env.SESSION_PASS,
        cookieOptions: {
            secure: process.env.NODE_ENV === 'production',
        },
    });

    const { user } = session;

    if (!user && req.nextUrl.pathname !== '/login') {
        const url = req.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url);
    }

    if (!user && req.nextUrl.pathname === '/login') {
        // check for credentials in request body
        const body = Object.fromEntries(new URLSearchParams((await req.text())));
        if (body.username && body.password) {
            // process login
            const { username, password } = body;
            const { Users } = await db();
            const user = await Users.findOne({ where: { username: username }});
            if (user) {
                // user.password is in the format <version>:<salt>:<hash>
                const [_, salt, hash] = user.password.split(':');
                const valid = await verifyPassword(password, hash, salt);
                if (valid) {
                    session.set('user', user);
                    await session.save();
                    const url = req.nextUrl.clone()
                    url.pathname = '/'
                    return NextResponse.redirect(url);
                }
            }
            const message = 'Invalid username or password';
            const url = req.nextUrl.clone()
            url.pathname = '/login'
            url.searchParams.set('message', message)
            return NextResponse.redirect(url);
        }
    }

    return res;
}

async function verifyPassword(password, hash, salt) {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
        'SHA-256',
        encoder.encode(salt + password)
    );
    return crypto.timingSafeEqual(hashBuffer, encoder.encode(hash));
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|favicon.ico).*)',
    ],
}
