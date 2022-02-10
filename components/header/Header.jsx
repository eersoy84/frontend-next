

// third-party
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Link from 'next/link'
import Image from 'next/image'
// import Search from './Search';
import Topbar from './Topbar';
import Indicator from './Indicator';
import { IndicatorAccountDispatch } from './IndicatorAccountDispatch';
import IndicatorCart from './IndicatorCart';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useHasMounted from '../../hooks/useHasMounted';
import { useSession } from "next-auth/react"

function Header() {
  const { favorites } = useSelector((state) => ({
    favorites: state.userAccount.favorites,
  }), shallowEqual);


  const { data: session, status } = useSession()
  console.log("session in header =>",session)
  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return null;
  }

  let bannerSection = (
    <div className="site-header__middle container">
      <div className="site-header__logo">
        <Link href="/">
          <a className='logo-bizleal'>
            <Image src={"/png/bizleal-logo.png"} height={43} width={142} />
          </a>
        </Link>
      </div>
      <div className="site-header__search">
        {/* <Search context="header" /> */}
      </div>

      <div className="nav-panel__indicators">

        {session && (
          <div className="account_icons_custom">

            <Indicator
              url={session ? '/favoriler' : '/hesap/cikis'}
              value={favorites?.length != 0 ? favorites?.length : undefined}
              icon={<Image src="/icons/heart-20.svg" height={20} width={20} />}

            />
            <p>Favorilerim</p>
          </div>
        )}

        <div className="account_icons_custom">
          <IndicatorCart />
          <p>Sepetim</p>
        </div>

        <div className="account_icons_custom">
          <IndicatorAccountDispatch user={session?.user} />
          <p>Hesabım</p>
        </div>
      </div>
    </div>
  );


  return (
    <div className="site-header">
      <Topbar />
      {bannerSection}
    </div>
  );
}

Header.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(['default', 'compact']),
};

Header.defaultProps = {
  layout: 'default',
};
export default Header
