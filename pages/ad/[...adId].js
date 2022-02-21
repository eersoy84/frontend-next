// react
import React, { useState, useEffect } from 'react';
// third-party
import PropTypes from 'prop-types';
import PageHeader from '../../components/shared/PageHeader';
import ProductTabs from '../../components/shop/ProductTabs';
import Product from '../../components/shared/Product';
import axios from 'axios';
import { API_BASE } from '../../config';
import { useRouter } from 'next/router'
import Spinner from '../../components/shared/Spinner';
import globalFetch from '../../helpers/globalFetch';

export default function ShopPageProduct(props) {
    const { query } = useRouter();
    const router = useRouter();
    const { layout, ad } = props;
    const [reviews, setReviews] = useState([]);
    const [questions, setQuestions] = useState([]);
    const { adId } = query
    let breadcrumb;
    let content;
    if (!adId) {
        return (<div>Böyle bir ilan bulunmamaktadır!</div>)
    }
    if (router.isFallback) {
        return <Spinner />
    }
    // useEffect(() => {
    //     const fetcher = async () => {
    //         const { data } = await axios.post(`${API_BASE}/item/questions`, { adId: parseInt(adId) })
    //         setQuestions(data)
    //     }
    //     fetcher();
    // }, [adId]);

    // useEffect(() => {
    //     const fetcher = async () => {
    //         const { data } = await axios.post(`${API_BASE}/item/reviews`, { adId: parseInt(adId) })
    //         setReviews(data)
    //     }
    //     fetcher()
    // }, [adId]);


    const adSpecs = ad && ad.specs;
    if (ad) {
        breadcrumb = [
            { title: 'Anasayfa', url: '/' },
            { title: 'İlanlar', url: '/ilanlar' },
            { title: ad && `${ad.categoryName}`, url: `/ilanlar?categoryId=${ad.categoryId}` },
            { title: ad && ad.brandName, url: `/ilanlar?categoryId=${ad.categoryId}&brandId=${ad.brandId}` },
            { title: ad && ad.modelName, url: '' },
        ];

        content = (
            <>
                <div className="block">
                    <div className="container">
                        {ad && <Product ad={ad} layout={layout} />}
                        {ad && <ProductTabs adSpecs={adSpecs} ad={ad} questions={questions} reviews={reviews} />}
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


export const getStaticProps = async (ctx) => {
    const { params } = ctx
    try {
        const ad = await globalFetch(`/routines/ads/${params.adId}`)
        console.log(`Generating Static Paths /ads/${params.adId}`)
        if (!ad) {
            return {
                notFound: true
            }
        }
        return {
            props: {
                ad
            },
            revalidate: 120
        }
    } catch (err) {
        console.log("hata bolumu", err)
        return {
            notFound: true
        }
    }
}
export const getStaticPaths = async () => {
    const ads = await globalFetch(`/routines/ads`)
    const paths = ads?.slice(0, 10).map(ad => {
        const { adId } = ad
        return {
            params: { adId: [`${adId}`] }
            // params:  adId: [`${adId}`] 
        }
    })
    console.log("paths", paths)
    // console.log(`Static Path For: /ads/${adId}`)
    return {
        paths,
        fallback: true
    };
}