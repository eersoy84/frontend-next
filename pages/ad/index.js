// react
import { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head'
import ProductsView from '../../components/shop/ProductsView';
import CategorySidebar from '../../components/shop/CategorySidebar';
import theme from '../../data/theme';
import { mergeArrays } from '../../helpers/merger';
import PageHeader from '../../components/shared/PageHeader';
import Spinner from '../../components/shared/Spinner'
import axios from 'axios';
import { API_BASE } from '../../config';

export default function Ads(props) {
    const { location, ads, instantAds } = props;
    const { categories, } = useSelector((state) => ({
        categories: state.category.categories,
    }), shallowEqual);

    console.log("ads in props", ads)
    console.log("instantAds", instantAds)
    const queryString = require('query-string');
    let breadcrumb = [
        { title: 'Anasayfa', url: '/' },
        { title: 'İlanlar', url: '/ilanlar' },
    ];

    const items = ads || [];
    const parsed = queryString.parse(location?.search);
    const { parentId, categoryId, brandId } = parsed;

    let filteredList = [];
    if (categoryId && brandId) {
        filteredList = items?.filter((q) => (q.brandId === parseInt(brandId) && q.categoryId === parseInt(categoryId)));
        const item = filteredList[0];
        breadcrumb = [...breadcrumb,
        ...(item
            ? ([...(item.parentId ? [{ title: `${item.parentId}`, url: `/ilanlar/?categoryId=${parentId}` }] : []),
            { title: `${item.categoryName}`, url: `/ilanlar/?categoryId=${categoryId}` },
            { title: `${item.brandName}`, url: `/ilanlar/?brandId=${brandId}` }])
            : []),
        ];
    } else if (parentId) {
        filteredList = items.filter((q) => (q.parentId || q.categoryId) === parseInt(parentId));
        const item = categories.find((q) => q.id === parseInt(parentId));
        breadcrumb = [...breadcrumb,
        ...(item ? [{ title: `${item.name}`, url: `/ilanlar/?parentId=${parseInt(parentId)}` }] : []),
        ];
    } else if (categoryId) {
        filteredList = items.filter((q) => (q.categoryId) === parseInt(categoryId));
        const item = filteredList[0];
        breadcrumb = [...breadcrumb,
        ...(item
            ? ([...(item.parentId ? [{ title: `${item.parentName} ${item.parentId}`, url: `/ilanlar/?categoryId=${categoryId}` }] : []),
            { title: `${item.categoryName}`, url: `/ilanlar/?categoryId=${categoryId}` }])
            : []),
        ];
    } else if (brandId) {
        filteredList = items.filter((q) => q.brandId === parseInt(brandId));
        const item = filteredList[0];
        breadcrumb = [...breadcrumb,
        ...(item ? [{ title: item && `${item.brandName}`, url: `/ilanlar/?categoryId=${parseInt(brandId)}` }] : []),
        ];
    } else {
        filteredList = ads;
    }
    const sidebar = (
        <div className="shop-layout__sidebar">
            <CategorySidebar offcanvas="mobile" />
        </div>
    );
    return (
        <>
            <Head>
                <title>{`Bizleal İlanlar — ${theme.name}`}</title>
                <meta name="description" content="Bizleal ilanlar" />
                <meta name="keywords" content="bizleal en uygun fiyatlı ilanlar" />
            </Head>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="container">
                <div className="shop-layout shop-layout--sidebar--start">
                    {sidebar}
                    <div className="shop-layout__content">
                        <div className="block">
                            {(filteredList?.length > 0)
                                ? (
                                    <ProductsView
                                        adList={filteredList}
                                        limit={15}
                                    />
                                )
                                : (<Spinner />)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export const getStaticProps = async () => {
    const { data: instantAds } = await axios.get(`${API_BASE}/routines/instantadinfo`);
    const { data: ads } = await axios.get(`${API_BASE}/routines/ads`);
    console.log("instantAds", instantAds)
    console.log("ads", ads)

    return {
        props: {
            ads,
            instantAds
        }
    }
}