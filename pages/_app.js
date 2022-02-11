import '@fortawesome/fontawesome-free/css/all.min.css';
import 'slick-carousel/slick/slick.css';
import '../styles/style.scss'
import Layout from '../components/Layout'
import { IntlProvider } from 'react-intl';
import languages from '../i18n';
import Head from "next/head";
// import the two exports from the last code snippet.
import { wrapper } from '../store/configureStore';
import { useRouter } from "next/router";
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.min.css';
// import 'react-input-range/lib/css/index.css';
// import { Provider } from "react-redux";

import { SessionProvider } from "next-auth/react"

function Main({ Component, pageProps }) {
  const { messages, direction } = languages['tr'];
  const { pathname } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1000)
  }, [pathname]);
  console.log("myapp renderd")
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i" />
      </Head>
      <SessionProvider session={pageProps.session}
        refetchOnWindowFocus={false}>
        <IntlProvider locale={'tr'} messages={messages} direction={direction}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </IntlProvider>
      </SessionProvider>
    </>
  )
}

export default wrapper.withRedux(Main)
