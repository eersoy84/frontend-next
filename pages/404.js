import Link from 'next/link'
import { useEffect } from 'react';
import Head from 'next/head'
// third-party
import { useRouter } from 'next/router'
// data stubs
import theme from '../data/theme';

function PageNotFound() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/', undefined, { shallow: true })
    }, 3000)
  }, [])
  return (
    <div className="block">
      <Head>
        <title>{`404 Page Not Found — ${theme.name}`}</title>
      </Head>

      <div className="container">
        <div className="not-found">
          <div className="not-found__404">
            Eyvah! 404 Hatası!
          </div>

          <div className="not-found__content">
            <h1 className="not-found__title">Sayfa Bulunamadı!</h1>

            <p className="not-found__text">
              Aradığınız sayfayı bulamadık!
            </p>
          </div>
        </div>
      </div>
    </div >
  );
}

export default PageNotFound;
