import { useEffect, useState, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { mobileMenuOpen } from '../../store/mobile-menu';
import useHasMounted from '../../hooks/useHasMounted';
import Indicator from "../header/Indicator";
import classNames from "classnames";
import Link from 'next/link'
import Image from 'next/image'
import Search from '../../components/header/Search'
import { useSession } from "next-auth/react";
import UseHasMounted from "../../hooks/useHasMounted";
const MobileHeader = () => {
    const { favorites, cart } = useSelector((state) => ({
        favorites: state.userAccount.favorites,
        cart: state.cart,
    }), shallowEqual);
    const hasMounted = UseHasMounted()
    const { data: session } = useSession()
    const user = session?.user

    const [searchOpen, setSearchOpen] = useState(false)

    const searchInput = useRef()

    const dispatch = useDispatch()

    useEffect(() => {
        if (searchOpen === true) {
            searchInput.current.focus()
        }
    }, [searchOpen])

    const searchClasses = classNames('mobile-header__search', {
        'mobile-header__search--open': searchOpen,
    });
    let dropdown;

    if (hasMounted) {
        dropdown = (
            <div className="account-menu">
                <Link href="/hesap">
                    <a className="account-menu__user">
                        <div className="account-menu__user-avatar">
                            <img src="images/avatars/avatar-3.jpg" alt="" />
                        </div>
                        <div className="account-menu__user-info">
                            <div className="account-menu__user-name">
                                {user?.firstName}
                                {' '}
                                {user?.lastName}
                            </div>
                            <div className="account-menu__user-email">{user?.email}</div>
                        </div>
                    </a>
                </Link>
                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li><Link href="/hesap/profil"><a>Profili D??zenle</a></Link></li>
                    <li><Link href="/hesap/siparis"><a>Sipari??lerim</a></Link></li>
                    <li><Link href="/hesap/adres"><a>Adres Bilgisi</a></Link></li>
                    <li><Link href="/hesap/sifre-yenile"><a>??ifre ????lemleri</a></Link></li>
                </ul>
                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li><Link href="/hesap/cikis"><a>????k????</a></Link></li>
                </ul>
            </div>
        );
    } else {
        dropdown = (
            <div className="account-menu-avatar-icon">
                <div className="form-group-avatar-icon account-menu__form-button-user-icon">
                    <Link href="/hesap/cikis/1">
                        <a>
                            <div style={{ paddingLeft: '10px', paddingRight: '10px' }} className='d-grid'>
                                <button type="submit" className="btn btn-primary btn-sm">Giri?? Yap</button>
                            </div>
                        </a>
                    </Link>
                </div>
                <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <div className="account-menu__divider" />
                </div>
                <div className="form-group-avatar-icon account-menu__form-button-user-icon">
                    <Link href="/hesap/cikis/2">
                        <div style={{ paddingLeft: '10px', paddingRight: '10px' }} className='d-grid'>
                            <button type="submit" className="btn btn-secondary btn-sm">??ye Ol</button>
                        </div>
                    </Link>
                </div>

            </div>
        );
    }
    return (
        <>
            <div className="mobile-header mb-4">
                <div className="mobile-header__panel">
                    <div className="container">
                        <div className="mobile-header__body">
                            <button type="button"
                                className="mobile-header__menu-button"
                                onClick={() => dispatch(mobileMenuOpen)}>
                                <Image src="/icons/menu-18x14.svg" height={17} width={21} />
                            </button>
                            <Link href="/">
                                <a
                                    className='logo-bizleal'>
                                    <Image src={"/icons/mobilelogo.svg"}
                                        height={40} width={100}
                                    />
                                </a>

                            </Link>
                            <Search
                                context="mobile-header"
                                className={searchClasses}
                                inputRef={searchInput}
                                onClose={() => setSearchOpen(false)}
                            />
                            <div className="mobile-header__indicators">
                                <Indicator
                                    className="indicator--mobile indicator--mobile-search d-md-none"
                                    onClick={() => setSearchOpen(true)}
                                    icon={<Image src="/icons/search-20.svg" height={20} width={20} />}

                                />
                                {user && (
                                    <Indicator
                                        url={'/favoriler'}
                                        value={favorites?.length > 0 ? favorites?.length : undefined}
                                        icon={<Image src="/icons/heart-20.svg" height={20} width={20} />}
                                    />
                                )}
                                <Indicator
                                    className="indicator--mobile"
                                    url="/sepet"
                                    value={cart?.items?.length > 0 ? cart?.items?.length : undefined}
                                    icon={<Image src="/icons/cart-20.svg" height={20} width={20} />}

                                />
                                <Indicator
                                    url="/hesap"
                                    className="indicator--mobile"
                                    dropdown={dropdown}
                                    icon={<Image src="/icons/person-20.svg" height={20} width={20} />}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
}

export default MobileHeader;