// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// third-party
import PropTypes from 'prop-types';
import {
    Route,
    Redirect,
    Switch,
    Router,
    useLocation,
} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { IntlProvider } from 'react-intl';
import ScrollToTop from './ScrollToTop';

// application
import languages from '../i18n';
import { localeChange } from '../store/locale';

// pages
import Layout from './Layout';
import HomePage from './home/HomePage';
import { getAds, getInstantAdsInfo } from '../store/ad/adActions';
import { getFavorites } from '../store/userAccount/userAccountActions';
import { fetchProjectPhotos } from '../store/photo/photoActions';
import { getCategories } from '../store/category/categoryActions';
import { getUserAddress } from '../store/profile/profileActions';
import { getUserOrders } from '../store/order/orderActions';




// import HomePageTwo from './home/HomePageTwo';
export default function Root() {
    const { locale, user } = useSelector((state) => ({
        locale: state.locale,
        user: state.userAccount.user,
    }), shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            const preloader = document.querySelector('.site-preloader');

            preloader.addEventListener('transitionend', (event) => {
                if (event.propertyName === 'opacity') {
                    preloader.parentNode.removeChild(preloader);
                }
            });
            preloader.classList.add('site-preloader__fade');
        }, 500);
        // const direction = new URLSearchParams(window.location.search).get('dir');
        // if (direction !== null) {
        //     dispatch(localeChange(direction === 'rtl' ? 'ar' : 'en'));
        // }
    }, []);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getAds());
        dispatch(getInstantAdsInfo());
        dispatch(fetchProjectPhotos());
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(getUserAddress())
            dispatch(getUserOrders())
            dispatch(getFavorites());
        }
    }, [user])
    const { messages, direction } = languages[locale];

    return (
        <IntlProvider locale={locale} messages={messages}>
            {/* <Router basename={process.env.PUBLIC_URL} history={history}> */}
                <HelmetProvider>
                    <Helmet htmlAttributes={{ lang: locale, dir: direction }} />
                    <ScrollToTop />
                    <Switch>
                        <Route
                            path="/"
                            render={(props) => (
                                <Layout {...props} headerLayout="default" homeComponent={HomePage} user={user} />
                            )}
                        />
                        <Redirect to="/" />
                    </Switch>
                </HelmetProvider>
            {/* </Router> */}
        </IntlProvider>
    );
}
Root.propTypes = {
    /** current locale */
    locale: PropTypes.string,
};
