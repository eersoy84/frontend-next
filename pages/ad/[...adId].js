// react
import React, { useState, useEffect } from 'react';
import {
    shallowEqual, useDispatch, useSelector,
} from 'react-redux';

// third-party
import PropTypes from 'prop-types';
import PageHeader from '../../components/shared/PageHeader';
import ProductTabs from '../../components/shop/ProductTabs';
import Product from '../../components/shared/Product';
import { mergeArrays } from '../../helpers/merger';
import axios from 'axios';
import { API_BASE } from '../../config';
import { useRouter } from 'next/router'

export default function ShopPageProduct(props) {
    const [mergedList, setMergedList] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [questions, setQuestions] = useState([]);
    const { query } = useRouter()
    const { adId } = query
    const { layout } = props;
    let breadcrumb;
    let content;
    const { adList, instantAdsInfo } = useSelector((state) => ({
        adList: state.ad.adList,
        instantAdsInfo: state.ad.instantAdsInfo,
    }), shallowEqual);

    useEffect(() => {
        setMergedList(mergeArrays(adList, instantAdsInfo));
    }, [adList, instantAdsInfo]);

    useEffect(async () => {
        try {
            const { data } = await axios.post(`${API_BASE}/item/questions`, { adId: parseInt(adId) })
            setQuestions(data)
        } catch (err) {
            console.log(err.response.data)
        }
    }, []);

    useEffect(async () => {
        try {
            const { data } = await axios.post(`${API_BASE}/item/reviews`, { adId: parseInt(adId) })
            setReviews(data)
        } catch (err) {
            console.log(err.response.data)
        }
    }, []);

    if (!adId) {
        return (<div>Böyle bir ilan bulunmamaktadır!</div>)
    }
    const product = (mergedList && mergedList.length > 0) && mergedList.find((x) => x.adId === parseFloat(adId));
    const adSpecs = product && product.specs;
    if ((adList && adList.length > 0) && (instantAdsInfo && instantAdsInfo.length > 0)) {
        breadcrumb = [
            { title: 'Anasayfa', url: '/' },
            { title: 'İlanlar', url: '/ilanlar' },
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
