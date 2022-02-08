// react
import React, { useState, useEffect } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { useHistory, useLocation } from 'react-router-dom';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router';
import {
    shallowEqual, useDispatch, useSelector,
} from 'react-redux';
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';
import moment from 'moment';
import {
    FacebookShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    TelegramIcon,
    FacebookIcon,
    WhatsappIcon,
} from 'react-share';
import FlipNumbers from 'react-flip-numbers';
import AsyncAction from './AsyncAction';
import Currency from './Currency';
import InputNumber from './InputNumber';
import { cartUpdate } from '../../store/cart';
import 'moment/locale/tr';
import FollowButton from './FollowButton';
import ToolTip from './ToolTip';
import RatingPoint from '../shared/RatingPoint'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import ChartView from './ChartView'

function Product(props) {
    const { ad, layout } = props;
    const { cart, favorites } = useSelector((state) => ({
        favorites: state.userAccount.favorites,
        cart: state.cart,
    }), shallowEqual);
    const dispatch = useDispatch()
    const cartId = cart?.info?.uuid || null;
    const [amount, setAmount] = useState(1);

    // const location = useLocation();
    // const history = useHistory();

    // useEffect(() => {
    //     const queryParams = new URLSearchParams(location.search)

    //     if (queryParams.has('ref')) {
    //         const ref = queryParams.get('ref');
    //         console.log(ref);
    //         queryParams.delete('ref')
    //         Router.replace({
    //             search: queryParams.toString(),
    //         })
    //     }
    // }, [location, history])

    const handleChangeAmount = (amount) => {
        setAmount(amount);
    };
    const salePrice = `${(ad.productPrice).toLocaleString(undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${' '}₺`;

    let isFollowing = false;
    const [updatedParticipants, setUpdatedParticipants] = useState((ad && ad.participants) || 0);
    const onAdFollow = (participants) => {
        setUpdatedParticipants(participants);
    };

    const adName = ad && (`${ad.categoryName} ${ad.brandName} ${ad.modelName}`);
    const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
    favorites && favorites.map((fav) => {
        if (fav === ad.adId) {
            isFollowing = true;
        }
    });

    let instantPrice;
    let instantProfit;
    let targetPrice;
    let listPrice = 0;
    let instantDiscount = '0';
    let navigator;

    if (ad.instantPrice) {
        instantPrice = `${(ad.instantPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;

        instantProfit = `${((ad.productPrice - ad.instantPrice)).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }

    if (ad.targetPrice) {
        targetPrice = `${(ad.targetPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }

    if (ad.instantDiscountPercent) {
        instantDiscount = `% ${(ad.instantDiscountPercent).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
    }

    listPrice = (
        <div style={{ paddingBottom: '5px', paddingTop: '15px' }}>
            <span style={{
                color: '#9ab2b3',
                fontSize: '13px',
                fontWeight: 'lighter',
                paddingRight: '5px',
                color: '#006a7c',
            }}
            >
                Başlangıç Fiyatı:
            </span>
            <span className="text-danger" style={{ textDecoration: 'line-through' }}>
                <Currency value={ad.productPrice} />
            </span>
        </div>
    );

    if (ad.instantPrice) {
        instantPrice = `${(ad.instantPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;

        instantProfit = `${(ad.productPrice - ad.instantPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }

    // let images = [];
    // if (ad && ad.imageUrl) {
    //     images = ad?.images?.map(
    //         {
    //             return <Image/>
    //         });

    //     // for(i in ad.images) {
    //     //     let im = ad.images[i].url;
    //     // }
    //     // // images = [ad.imageUrl];
    //     // images[0] = (ad.imageUrl);
    // }

    const images = ad?.images?.map((image, index) => {
        return (
            <div key={index}>
                <Image src={image.url} height={300} width={300} />
            </div>
        )
    })

    const shareSheet = (url) => {
        const shareData = {
            title: 'Ortak Satın Almaya Davet Edildin...',
            text: 'Ortak satın alma platformu!',
            url,
        };
        if (navigator?.share) {
            navigator?.share(shareData)
                .then(() => {
                }).catch((err) => {
                    console.log(err);
                });
        }
    };
    const ad_finish_date = moment(ad.endDate);
    moment().locale('tr');

    const CompletionList = () => (
        <div style={{ paddingTop: '10px' }}>
            <h6>İlan Süresi Dolmuştur!</h6>
        </div>
    );
    const renderer = ({
        days, hours, minutes, seconds, completed,
    }) => {
        if (completed) {
            return <CompletionList />;
        }
        // Render a countdown
        return (
            <div>
                <div className="countdown_container">
                    {days !== 0 ? (
                        <div className="countdown-item">
                            {days === 0 ? 0 : days}
                            <span>gün</span>
                        </div>
                    ) : null}
                    {hours !== 0 ? (
                        <div className="countdown-item">
                            {hours === 0 ? 0 : hours}
                            <span>saat</span>
                        </div>
                    ) : null}
                    {minutes !== 0
                        ? (
                            <div className="countdown-item">
                                {minutes === 0 ? 0 : minutes}
                                <span>dakika</span>
                            </div>
                        ) : null}
                    {
                        <div className="countdown-item">
                            {seconds === 0 ? 0 : seconds}
                            <span>saniye</span>
                        </div>
                    }
                </div>
            </div>
        );
    };
    return (
        <>
            <Head>
                <title>{`${ad.brandName} ${ad.modelName} ${ad.instantPrice} TL'ye`}</title>
                <meta name="description" content={`${ad.categoryName} ${ad.brandName} ${ad.modelName}`} />
                <meta property="og:type" content="https://bizleal.com" />
                <meta property="og:image" content={`${ad.image}`} />
                <meta property="og:url" content={`https://bizleal.com/ilanlar/${ad.adId}/${friendlyUrl}`} />
            </Head>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    <Carousel autoPlay autoFocus stopOnHover swipeable dynamicHeight emulateTouch >
                        {images}
                    </Carousel>
                    {/* <ProductGallery layout={layout} images={images} /> */}
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                    <div className="row">
                        <div className="col-10 col-lg-4">
                            <div className="bizleal_product_detail_title_first">
                                {ad.brandName}
                                {' '}
                                {ad.modelName}
                            </div>
                            <div className="bizleal_product_detail_title_second">{ad.description}</div>
                        </div>
                        <div className="col-2 col-lg-2">
                            <div className="bizleal_product_detail_like">
                                <FollowButton
                                    adId={ad.adId}
                                    isFollowing={isFollowing}
                                    onFollow={(participants) => onAdFollow(participants)}
                                    numOfParticipants={updatedParticipants}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 mt-3 mt-lg-0">
                            <Countdown
                                date={ad_finish_date.toDate()}
                                renderer={renderer}
                            />
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-12 col-lg-6">
                            {/* <ChartView ad={ad} /> */}
                            <div className="row mt-3 mt-sm-0">
                                <div className="col-12 d-flex justify-content-between my-2">
                                    {ad?.numOrders > 0 &&
                                        <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline">
                                            Satılan:&nbsp;
                                            <span className="text-success">
                                                {ad.numOrders}
                                            </span>
                                        </div>}
                                    {ad?.numOrders > 0 &&
                                        <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline">
                                            Kalan:&nbsp;
                                            <span className="text-danger">
                                                {ad.quantity - ad.numOrders}
                                            </span>
                                        </div>}
                                    <div style={{ fontSize: '12px' }} className="d-flex align-items-baseline">
                                        Stok:&nbsp;
                                        <span className="text-info">
                                            {ad?.quantity}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="row mt-3 mt-lg-0">
                                <div className="col-12 d-flex" data-tip data-for="salePriceInfo">
                                    <span>
                                        <Image src={'/icons/info-icon.svg'} height={16} width={16} />
                                    </span>&nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }} >
                                        Ürünler satış fiyatından alınır</span>
                                </div>
                                <ToolTip id={'salePriceInfo'}
                                    text={'Ürünün son fiyatı ancak ilan süresi sonunda netleşeceği için, başlangıçta her üyemiz ilk satış fiyatını öder'} />
                                <div
                                    className="col-12 d-flex my-3"
                                    data-tip data-for="discountInfo"
                                >
                                    <span><Image src={'/icons/info-icon.svg'} height={16} width={16} /></span>&nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }}>
                                        Toplam satın alma adedine göre fiyat düşer&nbsp;
                                        {(ad?.instantPrice < ad?.productPrice) && <span className="text-success">{`(${instantPrice})`}</span>}
                                    </span>
                                </div>
                                <ToolTip id={'discountInfo'}
                                    text={'Ürünün fiyatı, üyelerin toplu satın alma adedine göre düşecektir'} />
                                <div
                                    className="col-12 d-flex mb-3"
                                    data-tip data-for="diffInfo"
                                >
                                    <span><Image src={'/icons/info-icon.svg'} height={16} width={16} /></span>&nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }}>
                                        İlan süresi sonunda, fiyat farkı hesabınıza iade edilir&nbsp;
                                        {(ad.productPrice - ad.instantPrice) > 0 && <span className="text-success">{`(${instantProfit})`}</span>}
                                    </span>
                                </div>
                                <ToolTip id={'diffInfo'}
                                    text={'Ödediğiniz ilk satış fiyatından, ilan süresi sonunda netleşen son fiyat çıkartılıp hesabınıza iade edilir'} />
                                <div
                                    className="col-12 d-flex"
                                    data-tip data-for="shareInfo"
                                >
                                    <span><Image src={'/icons/info-icon.svg'} height={16} width={16} /></span>&nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }} className="pl-2 text-info">
                                        İlanı arkadaşlarınıza paylaşarak, ürün fiyatının düşmesine katkı sağlayabilirsiniz
                                    </span>
                                </div>
                                <ToolTip id={'shareInfo'}
                                    text={'İlanı sosyal medyada, whatsapp ve telegram gibi uygulamarda paylaşarak, ürün fiyatının düşmesine katkı sağlayabilirsiniz.'} />
                                <div className="col-12 d-flex align-items-center justify-content-around my-4">
                                    <span>
                                        <WhatsappShareButton
                                            data-tip
                                            //   data-for="share"
                                            quote="title"
                                            description={"deneme"}
                                            url={`https://bizleal.com/ilanlar/${ad.adId}/${friendlyUrl}`}
                                        >
                                            <WhatsappIcon
                                                size={32}
                                                borderRadius={10}
                                            />
                                        </WhatsappShareButton>
                                    </span>
                                    {navigator?.share ?
                                        <span>
                                            <button data-tip data-for="share"
                                                className="btn btn-plain"
                                                quote={'title'}
                                                url={`https://bizleal.com/ilanlar/${ad.adId}/${friendlyUrl}`}
                                                onClick={() => { shareSheet(`https://bizleal.com/ilanlar/${ad.adId}/${friendlyUrl}`) }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                                            </button>
                                        </span>
                                        :
                                        <span>
                                            <FacebookShareButton
                                                data-tip data-for="share"
                                                quote="title"
                                                url={`https://bizleal.com/ilanlar/${ad.adId}/${friendlyUrl}`}
                                            >
                                                <FacebookIcon
                                                    size={32} borderRadius={10}
                                                />
                                            </FacebookShareButton>
                                        </span>
                                    }
                                    <span>
                                        <TelegramShareButton
                                            data-tip
                                            data-for="share"
                                            quote="title"
                                            url={`https://bizleal.com/ilanlar/${ad.adId}/${friendlyUrl}`}
                                        >
                                            <TelegramIcon
                                                size={32}
                                                borderRadius={10}
                                            />
                                        </TelegramShareButton>
                                    </span>
                                </div>
                                <div className="col-12 d-flex align-items-baseline">
                                    <span style={{ fontSize: '14px' }} className="pl-2 d-flex align-items-baseline">
                                        Satıcı:&nbsp;&nbsp;
                                        <Link href={`/tedarikci/${ad.sellerId}`} >
                                            <a style={{ color: '#f1861d' }}>
                                                {ad.sellerName}
                                            </a>
                                        </Link>
                                    </span>&nbsp;
                                    <RatingPoint value={8.9} />
                                </div>

                                <div className="card container d-none d-md-flex m-3">
                                    <div className="card_body">
                                        <div className="row my-3">
                                            <div className="col-12 d-flex align-items-center justify-content-between"
                                                data-tip data-for="salesArea">
                                                <div>
                                                    <span>
                                                        <Image src={'/icons/info-icon.svg'} height={16} width={16} />
                                                    </span>&nbsp;&nbsp;
                                                    <span className="ml-2" style={{ fontSize: '15px', fontFamily: 'Helvetica' }}>
                                                        Satış Fiyatı:
                                                    </span>
                                                    <ToolTip id={'salesArea'}
                                                        text={'Kartınızdan en başta çekilecek tutar'} />
                                                </div>
                                                <span style={{ fontSize: '21px' }}>
                                                    {salePrice}
                                                </span>
                                            </div>
                                            <div className="col-12 d-flex align-items-center justify-content-between mt-3">
                                                <span>
                                                    <InputNumber
                                                        id="ad-amount"
                                                        aria-label="amount"
                                                        className="product__amount"
                                                        size="sm"
                                                        min={1}
                                                        value={amount}
                                                        onChange={handleChangeAmount}
                                                        readOnly
                                                    />
                                                </span>
                                                <span>
                                                    <AsyncAction
                                                        action={() => dispatch(cartUpdate(cartId, ad.adId, amount))}
                                                        render={({ run, loading }) => (
                                                            <button
                                                                style={{ borderRadius: '10px' }}
                                                                type="submit"
                                                                className={classNames('btn btn-primary', {
                                                                    'btn-loading': loading,
                                                                })}
                                                                onClick={run}
                                                            >
                                                                <Image src={'/icons/cart-16.svg'} height={16} width={16} />
                                                                &nbsp;&nbsp;&nbsp;
                                                                <span style={{ fontSize: '14px' }}>
                                                                    Sepete Ekle
                                                                </span>
                                                            </button>
                                                        )}
                                                    />
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="shop_fixed_all">
                                    <div className="shop_fixed_content d-md-none">
                                        <div className="container">

                                            <div className="row">
                                                <div className="col-12 d-flex align-items-center justify-content-between mb-2">
                                                    <span style={{ fontSize: '15px', fontFamily: 'Helvetica' }}>
                                                        Satış Fiyatı:
                                                    </span>
                                                    <span style={{ fontSize: '21px' }}>
                                                        {salePrice}
                                                    </span>
                                                </div>
                                                <div className="col-12 d-flex align-items-center justify-content-between">
                                                    <span>
                                                        <InputNumber
                                                            id="ad-amount"
                                                            aria-label="Amount"
                                                            className="product__amount"
                                                            size="sm"
                                                            min={1}
                                                            value={amount}
                                                            onChange={handleChangeAmount}
                                                            readOnly
                                                        />
                                                    </span>
                                                    <span>
                                                        <AsyncAction
                                                            action={() => dispatch(cartUpdate(cartId, ad.adId, amount))}
                                                            render={({ run, loading }) => (
                                                                <button
                                                                    style={{ borderRadius: '10px' }}
                                                                    type="submit"
                                                                    className={classNames('btn btn-primary', {
                                                                        'btn-loading': loading,
                                                                    })}
                                                                    onClick={run}
                                                                >

                                                                    <span className="mr-3">
                                                                        <Image src={'/icons/cart-16.svg'} height={16} width={16} />
                                                                    </span>
                                                                    <span style={{ fontSize: '14px' }}>
                                                                        Sepete Ekle
                                                                    </span>
                                                                </button>
                                                            )}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


Product.propTypes = {
    /** ad object */
    ad: PropTypes.object.isRequired,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
};

Product.defaultProps = {
    layout: 'standard',
};
export default Product