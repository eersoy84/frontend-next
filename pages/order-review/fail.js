import Link from 'next/link';
import Head from 'next/head';
import theme from '../../data/theme';
import 'moment/locale/tr';

export default function PaymentFail() {
    return (
        <div className="block order-success">
            <Head>
                <title>{`Hatalı İşlem — ${theme.name}`}</title>
            </Head>
            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <i className="far fa-times-circle fa-5x" style={{ color: 'red' }}></i>
                        <h1 className="order-success__title">Hatalı İşlem</h1>
                        <div className="order-success__subtitle">Ödeme İşlemi Sırasında Bir Hata Oluştu!</div>
                        <div className="order-success__actions">
                            <Link href={`/odeme`}>
                                <a className='btn btn-xs btn-secondary'>
                                    Ödeme Sayfasına Geri Dön
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
