// react

import theme from '../../data/theme';
import PageHeader from '../../components/shared/PageHeader';
// data stubs
import Head from 'next/head'

function SitePageContactUs() {
    const breadcrumb = [
        { title: 'Anasayfa', url: '/' },
        { title: 'İletişim', url: '/site/iletisim' },
    ];

    return (
        <>
            <Head>
                <title>{`İlteisim — ${theme.name}`}</title>
                <meta name="description" content="Bizleal iletişim adresi" />
                <meta name="keywords" content="bizleal iletişim" />
            </Head>

            <PageHeader header="İletişim" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="card mb-0 contact-us">
                        <div className="contact-us__map">
                            <iframe
                                title="Google Map"
                                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%C3%87ak%C4%B1r%20Sk.%20No:9,%20Do%C4%9Fu,%2034890%20Pendik/%C4%B0stanbul+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                // src="https://maps.google.com/maps?q=Holbrook-Palmer%20Park&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                            />
                        </div>
                        <div className="card-body">
                            <div className="contact-us__container">
                                <div className="row">
                                    <div className="col-12 col-lg-6 pb-4 pb-lg-0">

                                        <div className="contact-us__address">
                                            <div className="site-footer__widget footer-contacts">
                                                <h6 className="footer-contacts__title">Adresimiz</h6>

                                                <ul className="footer-contacts__contacts">
                                                    <li>
                                                        <i className="footer-contacts__icon fas fa-globe-americas" />
                                                        {theme.contacts.address}
                                                    </li>
                                                    <li>
                                                        <i className="footer-contacts__icon far fa-envelope" />
                                                        {theme.contacts.email}
                                                    </li>
                                                    <li>
                                                        <i className="footer-contacts__icon fas fa-mobile-alt" />
                                                        {`${theme.contacts.phone}`}
                                                    </li>
                                                    <li>
                                                        <i className="footer-contacts__icon far fa-clock" />
                                                        Pazartesi-Cumartesi 10:00 - 19:00
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SitePageContactUs;
