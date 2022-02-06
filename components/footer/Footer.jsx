// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import Image from 'next/image'

// data stubs
import theme from '../../data/theme';

export default function Footer() {
  const legalLinks = [
    { title: 'Gizlilik Politikası', url: '/site/gizlilik' },
    { title: 'Kullanım Koşulları', url: '/site/kosullar' },
    { title: 'Satış Sözleşmesi', url: '/site/sozlesmeler' },
  ];

  const informationLinks = [
    { title: 'Hakkımızda', url: '/site/hakkimizda' },
    { title: 'İletişim', url: '/site/iletisim' },
    { title: 'Sıkça Sorulan Sorular', url: '/site/sss' },

  ];

  return (
    <div className="site-footer">
      <div className="container">
        <div className="site-footer__widgets">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <FooterContacts />
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <FooterLinks title="Kurumsal" items={informationLinks} />
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <FooterLinks title="Yasal" items={legalLinks} />
            </div>
            <div className="col-12 col-md-12 col-lg-4">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__copyright">
            Powered by
            {' '}
            <a href="https://www.bizleal.com/" rel="noopener noreferrer" target="_blank">bizleal.com</a>
            {' '}
            — Managed by
            {' '}
            <a href={theme.author.profile_url} target="_blank" rel="noopener noreferrer">
              {theme.author.name}
            </a>
          </div>
          <div className="site-footer__payments">
            <Image src="/png/iyzico.png" height={30} width={350} />
          </div>
        </div>
      </div>
    </div>
  );
}
