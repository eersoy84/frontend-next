import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import moment from 'moment';
import axios from 'axios';
// data stubs
import theme from '../../data/theme';
import 'moment/locale/tr';
import { API_BASE } from '../../config';
import { authHeaderWithSecret } from '../../helpers';
import Spinner from '../shared/Spinner';
import addressInfo from '../../helpers/addressInfo';
import classNames from 'classnames';
import ReviewSellerModal from './ReviewSellerModal';
import { Collapse } from 'reactstrap';
import ReviewProductModal from './ReviewProductModal';
import { cartGet } from '../../store/cart'
import { toast } from 'react-toastify';


export default function AccountPageReviews(props) {
    const { match } = props;
    const { address } = useSelector((state) => ({
        address: state.profile.address,
    }), shallowEqual);

    const dispatch = useDispatch();
    // const orderId = match.params.id;
    const orderId = 'eae85b43-0e6c-11ec-baea-d2c8bee234e7'
    const [cart, setCart] = useState();

    const [reviewQuestions, setReviewQuestions] = useState(null);
    const [reasons, setReasons] = useState(null);

    //modal
    const [sellerValues, setSellerValues] = useState(null);

    const [isReviewButtonVisible, setIsReviewButtonVisible] = useState(null);
    const [isReviewProductButtonVisible, setIsReviewProductButtonVisible] = useState(null);

    const [reviewProductModalItem, setReviewProductModalItem] = useState(null);



    const [isAdId, setIsAdId] = useState(null)

    useEffect(() => {
        const asyncAction = axios.post(`${API_BASE}/cart/get`,
            { cartId: orderId, isOrder: 1 },
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            let cart = response?.data;
            setCart(cart);
        }).catch((err) => { });
    }, [orderId, isReviewButtonVisible]);


    useEffect(() => {
        axios.get(`${API_BASE}/cart/rating-form`)
            .then((response) => {
                setReviewQuestions(response.data)
            }).catch((err) => {
                if (err?.response)
                    toast.error(err?.response?.data?.message)
            });
    }, []);

    useEffect(() => {
        axios.get(`${API_BASE}/cart/return-reasons`)
            .then((response) => {
                setReasons(response.data)
            }).catch((err) => {
                if (err?.response)
                    toast.error(err?.response?.data?.message)
            });
    }, []);



    const formatDate = (date) => {
        let newDate = moment(date)
        return newDate.format("Do MMMM yyyy dddd")
    }
    const toggleProductReturnStatus = (adId) => {
        if (isAdId === adId) {
            setIsAdId(null)
        }
        else
            setIsAdId(adId)
    }


    const products = cart && cart.items.map(item => {
        return item.product
    });


    const groupBy = (array, key) =>
        array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            return result;
        }, {});

    const productsBySellerId = groupBy(products || [], 'sellerId');

    let sellerArray = [];
    for (var key in productsBySellerId) {
        let object = {
            sellerId: key,
            sellerName: productsBySellerId[key][0].sellerName,
            sellerLogo: productsBySellerId[key][0].sellerLogo,
            products: productsBySellerId[key]
        }
        sellerArray.push(object)
    }

    const evalutateSeller = (sellerId, sellerName, sellerLogo) => {
        setSellerValues({ sellerId, sellerName, sellerLogo })
    }
    const evaluateProduct = (productItem) => {
        setReviewProductModalItem(productItem)
    }

    const formatSellerName = (sellerName) => {
        return (sellerName.substring(0, 40) + '...');
    }

    const ordersBySeller = sellerArray && sellerArray.map((item) => {
        const ratings = cart.ratings;
        let isRated = ratings && ratings.length > 0 && ratings.find(q => q === parseInt(item.sellerId))
        let products = item.products
        const orders = products && products.map((product, index) => {
            let adId = product.adId;
            let productItem = cart.items.find(item => item.adId === adId)
            let isReviewable = productItem.reviewAvailable
            const adName = product && (`${product.categoryName} ${product.brandName} ${product.modelName}`);
            const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
            if (productItem)
                return (
                    <div className="col-12 col-md-6" key={index}>
                        <div className="card">
                            <div className="card-body p-2">
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="cart-table__column--image">
                                            <Link to={`/ilanlar/${product.adId}?seoUrl=${friendlyUrl}`}>
                                                <img src={product.imageUrl} alt="" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-8 d-flex flex-column">
                                        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                            {product.brandName}
                                        </span>
                                        <span style={{ fontSize: '11px' }}>
                                            {product.modelName}
                                        </span>
                                        <span style={{ fontSize: '12px', marginTop: '10px' }}>
                                            <span>Teslim Tarihi:</span>&nbsp;{productItem.dateCreated}
                                        </span>
                                        <div style={{ fontSize: '12px' }}>
                                            <span>Sipariş Durumu:</span>&nbsp;{productItem.totalPrice}
                                        </div>

                                        {isReviewable && <div className="mt-2">
                                            <span
                                                className="evaluate_button mr-2"
                                                onClick={() => evaluateProduct(productItem)}
                                                style={{ fontWeight: 500 }}
                                            >
                                                <i className="fas fa-star mr-2" style={{ color: '#f1861d' }} />
                                                <span style={{ fontSize: '12px' }}>Ürünü Değerlendir</span>
                                            </span>
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3"></div>

                    </div>

                )
        })
        return (
            <div className="card mb-5" key={item.sellerId} >
                <div className="card-header" style={{ backgroundColor: '#fafafa' }} >
                    <div className="row" >
                        <div className="col-12 col-md-7">
                            <span style={{ fontSize: '12px' }}>
                                Satıcı: </span>&nbsp;
                            <span style={{ fontSize: '14px', color: '#4d8ee1' }}><Link to={`/tedarikci/${item.sellerId}`}>{formatSellerName(item.sellerName)}</Link>
                            </span>
                            <div style={{ fontSize: '12px' }}>
                                Teslimat No:&nbsp;<span style={{ fontSize: '13px' }}>{"#23423423423"}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 mt-3 mt-md-0 d-flex flex-row justify-content-start justify-content-md-end">
                            {!isRated &&
                                <div>
                                    <span
                                        className="evaluate_button mr-2"
                                        onClick={() => evalutateSeller(item.sellerId, item.sellerName, item.sellerLogo)}
                                        style={{ fontWeight: 500 }}
                                    >
                                        <i className="fas fa-star mr-2" style={{ color: '#f1861d' }} />
                                        <span style={{ fontSize: '12px' }}>Satıcıyı Değerlendir</span>
                                    </span>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="row p-4">
                    {orders}
                </div>
            </div>
        )
    })


    if (cart && cart.length > 0) {
        return (
            <div>
                <Helmet>
                    <title>{`Sipariş Detay — ${theme.name}`}</title>
                </Helmet>

                {sellerValues ?
                    (<ReviewSellerModal
                        sellerValues={sellerValues}
                        show={true}
                        onHide={() => setSellerValues(null)}
                        hideSellerReviewButton={() => { setIsReviewButtonVisible(Math.random()) }}
                        reviewQuestions={reviewQuestions}
                        cartId={orderId}
                        {...props}>
                    </ReviewSellerModal >) : null}

                {reviewProductModalItem ? (<ReviewProductModal
                    productItem={reviewProductModalItem}
                    show={true}
                    onHide={() => setReviewProductModalItem(null)}
                    hideReviewProductButton={() => { setIsReviewProductButtonVisible(Math.random()) }}
                    reasons={reasons}
                    cartId={orderId}
                    {...props}>
                </ReviewProductModal >) : null}
                <div>
                    {cart?.info && (
                        <div>
                            <div className="card mb-3">
                                <div className="card-header">
                                    <span style={{ fontSize: 'calc(70% + 0.5vw)', fontWeight: 600 }}>Değerlendirmelerim </span>
                                </div>
                            </div>
                            {ordersBySeller}
                        </div>
                    )}
                </div>

            </div>
        );
    }
    else if (cart) {
        return (
            <div>
                <div className="card mb-3">
                    <div className="card-header">
                        <span style={{ fontSize: 'calc(70% + 0.5vw)', fontWeight: 600 }}>Değerlendirmelerim </span>
                    </div>
                </div>
                <div className="block block-empty">
                    <div className="container">
                        <div className="block-empty__body">
                            <div className="block-empty__message">Herhangi bir değerlendirmeniz bulunmamaktadır!</div>
                        </div>
                    </div>
                </div>
            </div>
        )

    } else
        return <Spinner />;
}
