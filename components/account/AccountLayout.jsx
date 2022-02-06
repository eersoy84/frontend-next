import classNames from 'classnames';
import { useRouter } from 'next/router'
import Link from 'next/link'

// application
import PageHeader from '../../components/shared/PageHeader';
import { useEffect } from 'react';

// pages
// import AccountPageAddresses from '../../components/account/AccountPageAddresses';
// import AccountPageDashboard from '../../components/account/AccountPageDashboard';
// import AccountPageOrders from '../../components/account/AccountPageOrders';
// import AccountPagePassword from '../../components/account/AccountPagePassword';
// import AccountPageProfile from '../../components/account/AccountPageProfile';
// import AccountPageOrderDetails from '../../components/account/AccountPageOrderDetails';
// import AccountPageReviews from '../../components/account/AccountPageReviews';
export default function AccountLayout({ children }) {
    const router = useRouter();
    const { pathname, asPath, query } = router
    const breadcrumb = [
        { title: 'Ana Sayfa', url: '' },
        { title: 'Hesabım', url: '' },
    ];
    console.log("pathName in ac lay", asPath)
    const links = [
        { id: 0, title: 'Kullanıcı Bilgileri', url: '' },
        { id: 1, title: 'Siparişlerim', url: '/siparis' },
        { id: 2, title: 'Değerlendirmelerim', url: '/degerlendirmelerim' },
        { id: 3, title: 'Adres Bilgisi', url: '/adres' },
        { id: 4, title: 'Şifre İşlemleri', url: '/sifre-yenile' },
    ].map((link) => {
        const url = `/hesap${link.url}`;
        const isActive = asPath === `${url}`
        const classes = classNames('account-nav__item', {
            'account-nav__item--active': isActive,
        });
        return (
            <li key={link.id} className={classes}>
                <Link href={url}><a>{link.title}</a></Link>
            </li>
        );
    });
    return (
        <>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-3 d-flex align-items-start">
                            <div className="account-nav flex-grow-1">
                                <h4 className="account-nav__title">Hesap İşlemleri</h4>
                                <ul>{links}</ul>
                            </div>
                        </div>
                        <div className="col-12 col-lg-9 mt-4 mt-lg-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
