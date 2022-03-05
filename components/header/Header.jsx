// third-party
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";
import Topbar from "./Topbar";
import Indicator from "./Indicator";
import { IndicatorAccountDispatch } from "./IndicatorAccountDispatch";
import IndicatorCart from "./IndicatorCart";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { getFavorites } from "../../store/userAccount";
import { useEffect, useCallback, useState } from "react";
import { cartGet } from "../../store/cart";
import { getUserAddress } from "../../store/profile";
import { getUserOrders } from "../../store/order";

import { Heart20Svg } from "../../svg";

function Header() {
  const { favorites } = useSelector(
    (state) => ({
      favorites: state.userAccount.favorites,
    }),
    shallowEqual
  );

  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const sessionCallback = useCallback(() => {
    dispatch(getFavorites());
    dispatch(getUserAddress());
    dispatch(getUserOrders());
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      sessionCallback();
    }
  }, [sessionCallback]);

  let bannerSection = (
    <div className="site-header__middle container">
      <div className="site-header__logo">
        <Link href="/">
          <a className="logo-bizleal">
            <Image src={"/png/bizleal-logo.png"} height={43} width={142} />
          </a>
        </Link>
      </div>
      <div className="site-header__search">
        <Search context="header" />
      </div>

      <div className="nav-panel__indicators">
        {session && (
          <div className="account_icons_custom">
            <Indicator
              url={session ? "/favoriler" : "/hesap/cikis"}
              value={favorites?.length != 0 ? favorites?.length : undefined}
              icon={<Heart20Svg />}
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
  layout: PropTypes.oneOf(["default", "compact"]),
};

Header.defaultProps = {
  layout: "default",
};
export default Header;
