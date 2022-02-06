// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

// application
import MobileLinks from './MobileLinks';
import MobileCategory from './MobileCategory';
import { Cross20Svg } from '../../svg';
import { currencyChange } from '../../store/currency';
import { localeChange } from '../../store/locale';
import { mobileMenuClose } from '../../store/mobile-menu';

// data stubs
import currencies from '../../data/shopCurrencies';
import mobileMenuLinks from '../../data/mobileMenu';
import MobileLogo from '../../svg/mobilelogo.svg';
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom';


export default function MobileMenu() {
    const { mobileMenuState, categories } = useSelector((state) => ({
        mobileMenuState: state.mobileMenu,
        categories: state.category.categories,
    }), shallowEqual);

    const dispatch = useDispatch();
    const classes = classNames('mobilemenu', {
        'mobilemenu--open': mobileMenuState.open,
    });

    const handleItemClick = (time) => {
        console.log(time)
        setTimeout(() => {
            dispatch(mobileMenuClose());
        }, (time || 300))
    };
    const logo = (
        <img
            src={MobileLogo}
            alt="Logo"
            className="logo-bizleal"
        />
    );

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={() => handleItemClick(1)} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <Ripples className="w-100">
                        <Link to={`/`} className="mobilemenu__title"
                            onClick={() => handleItemClick()}>
                            {logo}
                        </Link>
                    </Ripples>
                    <button type="button" className="mobilemenu__close"
                        onClick={() => handleItemClick(1)}
                    >
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileCategory categories={categories} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}
