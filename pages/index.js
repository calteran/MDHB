import Head from 'next/head'
import {select} from "../utils/db";

export default function Home({ pages, title }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={'Digital House Binder for ' + title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="title">
                    Welcome to {title}
                </h1>
                <ul>
                    {pages.map(page => (
                        <li key={page.path}>
                            <a href={page.path}>{page.name}</a>
                        </li>
                    ))}
                </ul>
            </main>

            <footer>
                Powered by <a target='_blank' href={'https://www.github.com/calteran/mdhb'} rel="noreferrer">My Digital Home Binder</a>.
            </footer>
        </div>
    )
}

export async function getStaticProps() {
    const pages = await select(
        'SELECT path, name FROM pages WHERE enabled = true ORDER BY list_order ASC'
    );

    return {
        props: {
            pages: pages,
            title: process.env.HOME_TITLE || 'My Digital Home Binder',
        }
    }
}
