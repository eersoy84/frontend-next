// react
import React, { useState, useEffect } from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
// application
import { Card, CardBody } from 'reactstrap';
import AsyncAction from '../components/shared/AsyncAction';
import Currency from '../components/shared/Currency';
import PageHeader from '../components/shared/PageHeader';
import { cartUpdate } from '../store/cart';
import { getFavorites, unfollow } from '../store/userAccount';
import RatingPoint from '../components/shared/RatingPoint'
import { wrapper } from '../store/configureStore';
// data stubs
import theme from '../data/theme';
import { getSession } from 'next-auth/react'
import { getToken } from "next-auth/jwt"
import UseHasMounted from '../hooks/useHasMounted';

function ShopPageFavourites(props) {
    const { favorites, cartUpdate, unfollow, cart, } = props;
    const { info } = cart;
    const cartId = info && info.uuid;
    const hasMounted = UseHasMounted()
    if (!hasMounted) {
        return null
    }
    const breadcrumb = [
        { title: 'Ana Sayfa', url: '/' },
        { title: 'Favoriler', url: '/favoriler' },
    ];

    const checkCondition = (adId) => cartUpdate(cartId, adId, 1);

    let content;
    const itemsList = favorites?.map(item => {
        let instantDiscount;
        if (item.instantDiscountPercent) {
            instantDiscount = `%${' '}${(item.instantDiscountPercent).toLocaleString(undefined,
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;
        }
        const adName = item && (`${item.categoryName} ${item.brandName} ${item.modelName}`);
        const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
        let image;
        if (item.imageUrl) {
            image = (
                <Link href={`/ilanlar/${item.adId}?seoUrl=${friendlyUrl}`}>
                    <a>
                        <img src={item.imageUrl} alt={`${item.brandName}`} />
                    </a>
                </Link>
            );
        }

        const removeButton = (
            <AsyncAction
                action={() => unfollow(item.adId)}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <i className="fas fa-trash-alt" />
                        </button>
                    );
                }}
            />
        );

        const addToCartButton = (adId) => (
            <AsyncAction
                action={() => checkCondition(adId)}
                render={({ run, loading }) => {
                    const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });
                    return (
                        <button type="button" onClick={run} className={classes}>
                            <span className='add_to_cart'>
                                <Image src={'/icons/cart-20.svg'} width={20} height={20} />
                            </span>
                        </button>
                    );
                }}
            />
        );

        return (
            <Card style={{ borderRadius: '10px' }} className="mb-3" key={item.adId}>
                <CardBody>
                    <div className="row">
                        <div className="col-3 col-md-2 d-flex align-items-center justify-content-center">
                            <div className="cart-table__column--image">
                                {image}
                            </div>
                        </div>
                        <div className="col-7 col-md-9">
                            <div className="row">
                                <div className="col-12 col-lg-9">
                                    <Link
                                        href={`/ilanlar/${item.adId}?seoUrl=${friendlyUrl}`}>
                                        <a style={{ color: '#F1861D' }} >
                                            <span style={{ fontSize: 'calc(70% + 0.5vw)' }}>
                                                {`${item.brandName} ${item.modelName}`}
                                            </span>
                                        </a>
                                    </Link>
                                    <div className="mt-2 d-flex align-items-baseline">
                                        <span style={{ fontSize: '12px' }} className="d-flex align-items-baseline">
                                            Satıcı:&nbsp;
                                            <Link href={`/tedarikci/${item.sellerId || 1}`}>
                                                <a style={{ color: '#f1861d' }}>
                                                    {item.sellerName}
                                                </a>
                                            </Link>
                                        </span>&nbsp;
                                        <RatingPoint value={9.1} />
                                    </div>
                                    {item.participants > 0
                                        && (
                                            <div style={{ fontSize: '12px', display: 'inline-block' }}
                                                className="text-info d-flex align-items-baseline my-1">
                                                {item.participants}&nbsp;
                                                <span className="text-info">
                                                    takipçi
                                                </span>
                                            </div>
                                        )}
                                    <div className="d-flex  flex-sm-row flex-column flex-sm-row justify-content-start my-0 my-md-2">
                                        {item.numOrders > 0 &&
                                            <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline mb-1 mb-sm-0">
                                                Satılan:&nbsp;
                                                <span className="text-success">
                                                    {item.numOrders}
                                                </span>
                                            </div>}
                                        {item.numOrders > 0 &&
                                            <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline ml-0 ml-sm-1 mb-1 mb-sm-0">
                                                Kalan:&nbsp;
                                                <span className="text-danger">
                                                    {item.quantity - item.numOrders}
                                                </span>
                                            </div>}
                                        <div style={{ fontSize: '12px' }} className="d-flex align-items-baseline ml-0 ml-sm-1 mb-1 mb-sm-0">
                                            Stok:&nbsp;
                                            <span className="text-info">
                                                {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-lg-none">
                                        <span className="mr-2" style={{ fontSize: 'calc(50% + 1vw)' }}>
                                            Satış Fiyatı:
                                        </span>
                                        <span style={{ fontSize: 'calc(60% + 1vw)' }}>
                                            <Currency value={item.productPrice} />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-0 col-lg-3 d-none d-lg-flex flex-column align-items-start">
                                    <span style={{ fontSize: 'calc(25% + 1vw)' }}>
                                        Satış Fiyatı:
                                    </span>
                                    <span style={{ fontSize: 'calc(60% + 1vw)' }}>
                                        <Currency value={item.productPrice} />
                                    </span>
                                </div>

                            </div>

                        </div>
                        <div className="col-2 col-md-1 d-flex flex-column justify-content-between">
                            <div>
                                {addToCartButton(item.adId)}
                            </div>
                            <div>
                                {removeButton}
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

        );
    });

    content = (
        <div className="container">
            {itemsList}
        </div>
    );

    let empty = (
        <div className="block block-empty">
            <div className="container">
                <div className="block-empty__body">
                    <div className="block-empty__message">Herhangi Bir İlan Takip Etmiyorsunuz</div>
                    <div className="block-empty__actions">
                        <Link href="/ilanlar">
                            <a className="btn btn-primary btn-sm">
                                Geri Dön
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <>
            <Head>
                <title>{`Favori İlanlarım — ${theme.name}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            {favorites?.length > 0 ? content : empty}
        </>
    );
}

const mapStateToProps = (state) => ({
    favorites: state.userAccount.favorites,
    isLoading: state.userAccount.isLoading,
    adList: state.ad.adList,
    cart: state.cart,
});

const mapDispatchToProps = {
    cartUpdate,
    unfollow,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageFavourites);


// export const getServerSideProps = wrapper.getServerSideProps(store =>
//     async ({ req, res, context }) => {
//         await store.dispatch(getFavorites({ req }));
//     });