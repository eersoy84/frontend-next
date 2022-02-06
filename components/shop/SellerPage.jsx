// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import { getInstantAdsInfo } from '../../store/ad/adActions';
import ProductsView from './ProductsView';
import CategorySidebar from './CategorySidebar';
import theme from '../../data/theme';
import { mergeArrays } from '../../helpers/merger';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating'
import axios from 'axios';
import { API_BASE } from '../../config';
import { authHeaderWithSecret } from '../../helpers';
import Spinner from '../shared/Spinner';
import RatingPoint from '../shared/RatingPoint'


export default function SellerPage(props) {
    const { match } = props;
    const [mergedList, setMergedList] = useState([]);
    const { adList, instantAdsInfo } = useSelector((state) => ({
        adList: state.ad.adList,
        instantAdsInfo: state.ad.instantAdsInfo,
        categories: state.category.categories,
    }), shallowEqual);
    console.log(match)
    let filteredList = mergedList && mergedList.filter(q => q.sellerId === parseInt(match.params.id));

    useEffect(() => {
        setMergedList(mergeArrays(adList, instantAdsInfo));
    }, [adList, instantAdsInfo]);
    console.log(adList)
    let provider = adList && adList.find(q => q.sellerId === parseInt(match.params.id))
    let breadcrumb = [
        { title: 'Anasayfa', url: '/' },
        { title: 'Satıcılar', url: '' },
        { title: provider && `${provider.sellerName}`, url: '' },
    ];
    let image = (
        provider && provider.sellerLogo ?
            <div>
                <img src={provider.sellerLogo} alt="..." className="seller_page_image"></img>
            </div>
            : <Spinner />
    );
    const dispatch = useDispatch();

    const sidebar = (
        <div className="shop-layout__sidebar">
            <CategorySidebar offcanvas="mobile" />
        </div>
    );
    return (
        <>
            <Helmet>
                <title>{`İlanlar — ${theme.name}`}</title>
            </Helmet>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="container">
                <div className="card px-2 mb-3" style={{ boxShadow: '0 6px 7px 0 rgb(0 0 0 / 13%)' }}>
                    <div className="row my-3">
                        <div className="col-4 col-sm-2 col-xl-1 d-flex align-items-center">
                            {image}
                        </div>
                        <div className="col-8 col-sm-10 col-xl-11 d-flex flex-column">
                            <div className="row d-flex align-items-center my-1">
                                <span style={{ color: '#f1861d' }}>{provider && provider.sellerName}</span>
                                &nbsp;
                                <RatingPoint value={9.1}/>&nbsp;
                                {/* <Rating value={4}/> */}
                            </div>
                            <div className="row" style={{ fontSize: '10pt' }}>
                                Satıcının&nbsp;<span className="text-success">{filteredList.length}</span>&nbsp;ürünü listeleniyor</div>
                        </div>
                    </div>
                </div>
                <div className="shop-layout shop-layout--sidebar--start">
                    {sidebar}
                    <div className="shop-layout__content">
                        <div className="block">
                            {(filteredList && filteredList.length > 0)
                                ? (
                                    <ProductsView
                                        mergedList={filteredList}
                                        limit={15}
                                    />
                                )
                                : (
                                    <div className="block-empty__body">
                                        <Spinner />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
