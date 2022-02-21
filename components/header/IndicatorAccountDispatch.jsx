import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
// third-party
import Image from 'next/image'
// third-party
import Link from 'next/link'
// application
import Indicator from './Indicator';
import IndicatorDeneme from './IndicatorDeneme';
import { useSession, signOut } from 'next-auth/react';
import Router from 'next/router'
import { Person20Svg } from '../../svg';

export function IndicatorAccountDispatch() {
    let dropDown;
    let url;
    const { data: session, status } = useSession()
    const user = session?.user
    const logout = async () => {
        const res = await signOut({ redirect: false, callbackUrl: "/hesap/cikis/1" })
        Router.push(res?.url)
    }
    if (status === "authenticated") {
        url = "/hesap"
        dropDown = (
            <div className="account-menu">
                <Link href={"/hesap"}>
                    <a className='account-menu__user'>
                        <div className="account-menu__user-avatar">
                            {user?.image && <Image src={user?.image} height={20} width={20} />}
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
                    {/* <li><Link href="/hesap/profil"><a>Profili Düzenle</a></Link></li> */}
                    <li><Link href="/hesap/siparis"><a>Siparişlerim</a></Link></li>
                    <li><Link href="/hesap/adres"><a>Adres Bilgisi</a></Link></li>
                    <li><Link href="/hesap/sifre-yenile"><a>Şifre İşlemleri</a></Link></li>
                </ul>
                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li><Link href="/hesap/cikis"><a onClick={logout}>Çıkış</a></Link></li>
                </ul>
            </div>
        )
    }
    else {
        url = "/hesap/cikis"
        dropDown = (
            <div className="account-menu-avatar-icon">
                <div className="form-group-avatar-icon account-menu__form-button-user-icon">
                    <Link
                        href="/hesap/cikis/1"
                    >
                        <a>
                            <div style={{ paddingLeft: '10px', paddingRight: '10px' }} className='d-grid'>
                                <button type="submit" className="btn btn-primary btn-sm">Giriş Yap</button>
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
                            <button type="submit" className="btn btn-secondary btn-sm">Üye Ol</button>
                        </div>
                    </Link>
                </div>

            </div>
        )
    }
    return (
        <>
            <IndicatorDeneme
                url={url}
                dropdown={dropDown}
                icon={<Person20Svg/>}
            />
        </>
    );
}