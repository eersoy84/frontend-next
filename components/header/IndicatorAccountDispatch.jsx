import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
// third-party
import Image from 'next/image'
// third-party
import Link from 'next/link'
// application
import Indicator from './Indicator';
import IndicatorDeneme from './IndicatorDeneme';

export function IndicatorAccountDispatch({ user }) {
    let dropDown;
    let url;
    if (user) {
        url = "/hesap"
        dropDown = (
            <div className="account-menu">
                <Link href={"/hesap"}>
                    <a className='account-menu__user'>
                        <div className="account-menu__user-avatar">
                            {user?.images && <Image src={user?.image} height={20} width={20} />}
                        </div>
                        <div className="account-menu__user-info">
                            <div className="account-menu__user-name">
                                {user?.firstName}
                                {' '}
                                {user?.lastName}
                            </div>
                            <div className="account-menu__user-email">{user.email}</div>
                        </div>
                    </a>
                </Link>
                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li><Link href="/hesap/profil"><a>Profili Düzenle</a></Link></li>
                    <li><Link href="/hesap/siparis"><a>Siparişlerim</a></Link></li>
                    <li><Link href="/hesap/adres"><a>Adres Bilgisi</a></Link></li>
                    <li><Link href="/hesap/sifre-yenile"><a>Şifre İşlemleri</a></Link></li>
                </ul>
                <div className="account-menu__divider" />
                <ul className="account-menu__links">
                    <li><Link href="/hesap/cikis"><a>Çıkış</a></Link></li>
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
                            <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                                <button type="submit" className="btn btn-primary btn-sm btn-block">Giriş Yap</button>
                            </div>
                        </a>
                    </Link>
                </div>
                <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                    <div className="account-menu__divider" />
                </div>
                <div className="form-group-avatar-icon account-menu__form-button-user-icon">
                    <Link href="/hesap/cikis/2">
                        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                            <button type="submit" className="btn btn-secondary btn-sm btn-block">Üye Ol</button>
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
                icon={<Image src="/icons/person-20.svg" height={20} width={20} />}
            />
        </>
    );
}