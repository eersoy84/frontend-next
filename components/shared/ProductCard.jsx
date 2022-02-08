// react
import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link'
import Image from 'next/image'

// application
import {
    FacebookShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookIcon,
    WhatsappIcon,
    TelegramIcon,
} from 'react-share';


import Countdown from 'react-countdown';
import moment from 'moment';
import 'moment/locale/tr';
import FollowButton from './FollowButton';
import Spinner from '../shared/Spinner';
import ToolTip from './ToolTip';


export default function ProductCard({ product }) {
    const { favorites } = useSelector((state) => ({
        favorites: state.userAccount.favorites,
    }));

    const adName = product && (`${product.categoryName} ${product.brandName} ${product.modelName}`);
    const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
    let isFollowing = false;

    favorites && favorites.map((fav) => {
        if (fav === product.adId) {
            isFollowing = true;
        }
    });
    const [updatedParticipants, setUpdatedParticipants] = useState((product && product.participants) || 0);
    const onAdFollow = (participants) => {
        setUpdatedParticipants(participants);
    };

    const image = (
        product.imageUrl ?
            <Link href={`/ilanlar/${product.adId}/${friendlyUrl}`} >
                <a
                    style={{ backgroundImage: `url(${product?.imageUrl})` }}
                >
                </a>
            </Link>
            : <Spinner />
    );
    let instantPrice;
    let instantDiscount = '% 0';
    let instantProfit;
    let targetPrice;
    const salePrice = `${(product.productPrice).toLocaleString(undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}${' '}₺`;
    if (product.targetPrice) {
        targetPrice = `${(product.targetPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }

    if (product.instantPrice) {
        instantPrice = `${(product.instantPrice).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;

        instantProfit = `${((product.productPrice - product.instantPrice)).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}${' '}₺`;
    }

    if (product.instantDiscountPercent) {
        instantDiscount = `% ${(product.instantDiscountPercent).toLocaleString(undefined,
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
    }

    const ad_finish_date = moment(product.endDate);
    moment().locale('tr');
    const CompletionList = () => (
        <div style={{ paddingTop: '10px' }}>
            <h6>İlan Süresi Dolmuştur!</h6>
        </div>
    );
    let navigator;
    const shareSheet = (url) => {
        const shareData = {
            title: 'Ortak Satın Almaya Davet Edildin...',
            text: 'Ortak satın alma platformu!',
            url,
        };
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => {
                }).catch((err) => {
                });
        }
    };
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);
    const renderer = ({
        days, hours, minutes, seconds, completed,
    }) => {
        if (completed) {
            return <CompletionList />;
        }
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
    //
    return (
        <>
            <div style={{ display: 'block' }}>
                <div className="card p-3 bizleal_product_list_container2" style={{ borderRadius: '10px' }}>
                    <div className="row">
                        <div className="col-10 col-sm-4">
                            <Link href={`/ilanlar/${product.adId}/${friendlyUrl}`}>
                                <a>
                                    <div className="bizleal_product_list__title--first">
                                        {product.brandName}
                                        {' '}
                                        {product.modelName}
                                    </div>
                                    <div className="bizleal_product_list__title--second">{product.description}</div>
                                </a>
                            </Link>
                        </div>
                        <div className="col-2 col-sm-2 bizleal_product_list__like d-flex justify-content-end">
                            <FollowButton
                                adId={product.adId}
                                isFollowing={isFollowing}
                                onFollow={(participants) => onAdFollow(participants)}
                                numOfParticipants={updatedParticipants}
                            />
                        </div>
                        <div className="col-12 col-sm-6 mt-2 mt-sm-0">
                            <Countdown
                                date={ad_finish_date.toDate()}
                                renderer={renderer}
                            />
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-12 col-sm-6 bizleal_product_list__image">
                            {image}
                        </div>

                        <div className="col-12 col-sm-6 d-flex justify-content-center justify-content-sm-end">
                            <div className="row mt-3 mt-sm-0">
                                <div className="col-12 d-flex justify-content-between mb-3">
                                    {product.numOrders > 0 &&
                                        <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline">
                                            Satılan:&nbsp;
                                            <span className="text-success">
                                                {product.numOrders}
                                            </span>
                                        </div>}
                                    {product.numOrders > 0 &&
                                        <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline">
                                            Kalan:&nbsp;
                                            <span className="text-danger">
                                                {product.quantity - product.numOrders}
                                            </span>
                                        </div>}
                                    <div style={{ fontSize: '12px' }} className="d-flex align-items-baseline">
                                        Stok:&nbsp;&nbsp;&nbsp;
                                        <span className="text-info">
                                            {product.quantity}
                                        </span>
                                    </div>
                                </div>

                                <div className="col-12 d-flex align-items-center" data-tip data-for="refundInfo">
                                    <span>
                                        <Image
                                            src={"/icons/info-icon.svg"}
                                            height={17} width={17} />
                                    </span>&nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }} className="pl-2 d-flex align-items-baseline">
                                        Anlık Fiyat:&nbsp;&nbsp;<span className="text-success">
                                            {instantPrice}
                                        </span>
                                    </span>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }} className="pl-2 d-flex align-items-baseline">
                                        İndirim:&nbsp;&nbsp;<span className="text-success">
                                            {instantDiscount}
                                        </span>
                                    </span>
                                </div>
                                <ToolTip id={"refundInfo"}
                                    text={'Toplu satın alma adedine göre ürünün anlık fiyatı'} />
                                <div className="col-12 d-flex align-items-center" data-tip data-for="discountInfo">
                                    <span>
                                        <Image src={"/icons/info-icon.svg"} height={17} width={17} />
                                    </span>
                                    &nbsp;&nbsp;
                                    <span style={{ fontSize: '12px', display: 'inline-block' }} className="pl-2 d-flex align-items-baseline">
                                        Son fiyat:&nbsp;<span>
                                            {targetPrice}
                                        </span>
                                    </span>
                                </div>
                                <ToolTip id={"discountInfo"}
                                    text={'Maksimum satın alma adedine ulaşılması durumunda ürünün inebileceği en düşük fiyat'} />

                                <div className="col-12 d-flex align-items-center" data-tip data-for="decrementInfo">
                                    <span>
                                        <Image src={"/icons/info-icon.svg"} height={17} width={17} />

                                    </span>
                                    &nbsp;&nbsp;
                                    <span style={{ fontSize: '12px' }} className="pl-2 d-flex align-items-baseline text-info">
                                        Ürün fiyatı, toplu satın alma adedine göre düşer
                                    </span>
                                </div>
                                <ToolTip id={"decrementInfo"}
                                    text={'Ürünün son fiyatı, ancak ilan süresi sonunda netleşeceği için, başlangıçta kartınızdan satış fiyatı çekilir.'} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex justify-content-between align-items-end">
                            <span>
                                <WhatsappShareButton
                                    data-tip
                                    data-for="share"
                                    quote="title"
                                    url={`https://bizleal.com/ilanlar/${product.adId}/${friendlyUrl}`}
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
                                        url={`https://bizleal.com/ilanlar/${product.adId}/${friendlyUrl}`}
                                        onClick={() => { shareSheet(`https://bizleal.com/ilanlar/${product.adId}/${friendlyUrl}`) }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                                    </button>
                                </span>
                                :
                                <span>
                                    <FacebookShareButton
                                        data-tip data-for="share"
                                        quote="title"
                                        url={`https://bizleal.com/ilanlar/${product.adId}/${friendlyUrl}`}
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
                                    url={`https://bizleal.com/ilanlar/${product.adId}/${friendlyUrl}`}
                                >
                                    <TelegramIcon
                                        size={32}
                                        borderRadius={10}
                                    />
                                </TelegramShareButton>
                            </span>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="row mt-3 mt-md-0">
                                <div className="col-6">
                                    <span style={{ fontSize: '15px', fontFamily: 'Helvetica' }}>
                                        Satış Fiyatı:&nbsp;
                                    </span>
                                    <span style={{ fontSize: '21px' }}>
                                        {salePrice}
                                    </span>
                                </div>
                                <div className="col-6">

                                    <Link
                                        href={`/ilanlar/${product.adId}/${friendlyUrl}`}
                                    >
                                        <a
                                            className="btn btn-primary btn-lg bizleal_center_btn"
                                            style={{ borderRadius: '10px' }}
                                        >
                                            <span className="d-none d-sm-block">Detay</span>
                                            <span className="d-block d-sm-none" style={{ fontSize: '4vw' }}>Detay</span>
                                        </a>
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </div>

                    {/* <div className="row">
                        <div className="col-12 col-sm-6">
                            <div className="row">
                                <div className="col-10">
                                    <Link to={`/ilanlar/${product.adId}/${friendlyUrl}`}>
                                        <div className="bizleal_product_list__title--first">
                                            {product.brandName}
                                            {' '}
                                            {product.modelName}
                                        </div>
                                        <div className="bizleal_product_list__title--second">{product.description}</div>
                                    </Link>
                                </div>
                                <div className="col-2 bizleal_product_list__like">
                                    <FollowButton
                                        adId={product.adId}
                                        isFollowing={isFollowing}
                                        onFollow={(participants) => onAdFollow(participants)}
                                        numOfParticipants={updatedParticipants}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 bizleal_product_list__image">
                                {image}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end">
                                    <Countdown
                                        date={ad_finish_date.toDate()}
                                        renderer={renderer}
                                    />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

            </div>
        </>
    );
}

ProductCard.propTypes = {
    /**
       * product object
       */
    product: PropTypes.object.isRequired,
};
