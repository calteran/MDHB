import Head from 'next/head'

export default function Home({ title }) {
  const pages = [
    { name: 'Appliances', path: '/appliances' },
    { name: 'Utilities', path: '/utilities' },
    { name: 'Wifi & Technology', path: '/tech' },
    { name: 'Access & Security', path: '/security' },
    { name: 'Emergency Contacts', path: '/emergency' },
    { name: 'Arrival & Departure', path: '/hellogoodbye' },
    { name: 'The Neighborhood', path: '/nearby' },
  ];

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
    return {
        props: {
          title: process.env.HOME_TITLE || 'My Digital Home Binder',
        }
    }
}
