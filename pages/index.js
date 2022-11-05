import Head from 'next/head'
import {Sequelize} from "sequelize";

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
    const sequelize = new Sequelize({
        dialect: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: false
    });

    const pages = await sequelize.query(
        'SELECT path, name FROM pages WHERE enabled = true ORDER BY list_order ASC',
        { type: sequelize.QueryTypes.SELECT }
    );

    return {
        props: {
            pages: pages,
            title: process.env.HOME_TITLE || 'My Digital Home Binder',
        }
    }
}
