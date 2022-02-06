// react
import React, { Fragment, useState, useEffect } from 'react';
import {
    shallowEqual, useDispatch, useSelector, connect,
} from 'react-redux';

// third-party
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import PageHeader from '../shared/PageHeader';
import ProductTabs from './ProductTabs';
import Product from '../shared/Product';
import { mergeArrays } from '../../helpers/merger';
import axios from 'axios';
import { API_BASE } from '../../config';

export default function ShopPageProduct(props) {
    const [mergedList, setMergedList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [questions, setQuestions] = useState([]);
    const { layout, match } = props;
    const { adId } = match.params;
    let breadcrumb;
    let content;
    let product = {};
    let adSpecs;
    const {
        adList, instantAdsInfo, numOfOrders, favorites,
    } = useSelector((state) => ({
        adList: state.ad.adList,
        instantAdsInfo: state.ad.instantAdsInfo,
        numOfOrders: state.order.numOfOrders,
        favorites: state.userAccount.favorites,
    }), shallowEqual);

    useEffect(() => {
        setMergedList(mergeArrays(adList, instantAdsInfo));
    }, [adList, instantAdsInfo]);

    useEffect(() => {
        axios.post(`${API_BASE}/item/reviews`, { adId })
            .then((response) => {
                setReviews(response.data)
            }).catch((err) => { });
    }, []);

    useEffect(() => {
        axios.post(`${API_BASE}/item/questions`, { adId })
            .then((response) => {
                setQuestions(response.data)
            }).catch((err) => { });
    }, []);

    if (adId) {
        product = (mergedList && mergedList.length > 0) && mergedList.find((x) => x.adId === parseFloat(adId));
        adSpecs = product && product.specs;
    }
    if ((adList && adList.length > 0) && (instantAdsInfo && instantAdsInfo.length > 0)) {
        breadcrumb = [
            { title: 'Anasayfa', url: '/' },
            { title: 'İlanlar', url: '/kategori' },
            { title: product && `${product.categoryName}`, url: `/kategori?categoryId=${product.categoryId}` },
            { title: product && product.brandName, url: `/kategori?categoryId=${product.categoryId}&brandId=${product.brandId}` },
            { title: product && product.modelName, url: '' },
        ];

        content = (
            <>
                <div className="block">
                    <div className="container">
                        {product && <Product product={product} layout={layout} />}
                        {product && <ProductTabs adSpecs={adSpecs} product={product} questions={questions} reviews={reviews} />}
                    </div>
                </div>

            </>
        );
        // }

        return (
            <>
                <PageHeader breadcrumb={breadcrumb} />
                {content}
            </>
        );
    }
    return null;
}

ShopPageProduct.propTypes = {
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
};

ShopPageProduct.defaultProps = {
    layout: 'standard',
    sidebarPosition: 'start',
};
