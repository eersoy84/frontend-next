// react
import { FormattedMessage } from 'react-intl';
// import { Link } from 'react-router-dom';
import Link from 'next/link'

// application
// import Dropdown from './Dropdown';
// import DropdownCurrency from './DropdownCurrency';
// import DropdownLanguage from './DropdownLanguage';

function Topbar() {
  // const user = JSON.parse(localStorage.getItem('user'));
  const links = [
    { title: <FormattedMessage id="topbar.aboutUs" defaultMessage="About Us" />, url: '/site/hakkimizda' },
    { title: <FormattedMessage id="topbar.contacts" defaultMessage="Contacts" />, url: '/site/iletisim' },
    // { title: <FormattedMessage id="topbar.trackOrder" defaultMessage="Track Order" />, url: user ? '/hesap/siparis' : '/hesap/cikis' },
    { title: <FormattedMessage id="topbar.blog" defaultMessage="Blog" />, url: '/blog/category-classic' },
  ];
  let label = "Müşteri Hizmetleri";
  let phone = <FormattedMessage id="header.phone" />;
  const linksList = links.map((item, index) => (
    <div key={index} className="topbar__item topbar__item--link">
      <Link href={item.url}>
        <a className="topbar-link">{item.title}</a>
      </Link>
      {/* <Link className="topbar-link" to={item.url}>{item.title}</Link> */}
    </div>
  ));

  return (
    <div className="site-header__topbar topbar">
      <div className="topbar__container container">
        <div className="topbar__row">
          {linksList}
          <div className="topbar__spring" />

          <div className="topbar__item">{label}</div>
          <div className="topbar__item">&nbsp;&nbsp;</div>
          <div className="topbar__item">{phone}</div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
