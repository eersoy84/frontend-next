import Head from 'next/head'
import { wrapper } from '../store/configureStore'
// third-party
import HomePage from '../components/home/HomePage';
import { getAds } from '../store/ad';
import theme from '../data/theme';
import { getCategories } from '../store/category';
import { getFavorites } from '../store/userAccount';

export default function Index() {

  return (
    <>
      <Head>
        <title>{`Ortak Satın Alma Platformu — ${theme.name}`}</title>
        <meta name="description" content="Türkiye'nin ortak satın alma platformu" />
        <meta name="keywords" content="ortak satın alma" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  await store.dispatch(getCategories())
  await store.dispatch(getAds())
})
