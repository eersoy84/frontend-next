// react
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image'
// third-party
import classNames from 'classnames';
import Link from 'next/link'

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// application
import { toast } from 'react-toastify';
import AsyncAction from '../shared/AsyncAction';
import IndicatorPopup from './IndicatorPopup';
// import { Cart20Svg, Cross10Svg } from '../../svg';
import { cartUpdate, cartGet } from '../../store/cart/cartActions';
import { useSession } from 'next-auth/react';
import { Cart20Svg } from '../../svg';
import Indicator from './Indicator';

export default function IndicatorCart(props) {
    const { cart } = useSelector((state) => ({
        cart: state.cart,
    }), shallowEqual);
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const { info, taxes, items, isLoading } = cart;
    const cartId = info && info.uuid;
    const status = info && info.status;

    let dropdown;
    const user = session?.user

    const prePayment = (
        <tr>
            <th><span className="text-success" style={{ fontSize: 'smaller' }}>İade</span></th>
            <td>
                <span className="text-success">{info && info.totalProfit}</span>
            </td>
        </tr>
    );
    const totals = (
        <>
            <tr>
                <th>Ürünler Toplamı</th>
                <td>
                    {info && info.subTotal}
                    {' '}
                </td>
            </tr>
            {prePayment}
        </>
    );

    const handleClick = () => {
        toast.info('Siparişi onaylamak için giriş yapınız!');
    };

    const itemList = items?.map(item => {
        const adName = item?.product && (`${item?.product?.categoryName} ${item?.product?.brandName} ${item?.product?.modelName}`);
        const friendlyUrl = adName?.replace(/\s+/g, '-').toLowerCase();
        let options;
        let image;

        if (item?.product?.options) {
            options = (
                <ul className="dropcart__product-options">
                    {item.product.options.map((option, index) => (
                        <li key={index}>{`${option.name}: ${option.value}`}</li>
                    ))}
                </ul>
            );
        }

        if (item?.product?.imageUrl) {
            image = (
                <div className="dropcart__product-image">
                    <Link href={`/ilanlar/${item?.product?.adId}?seoUrl=${friendlyUrl}`}>
                        <img src={item?.product?.imageUrl} alt="product image" />
                        {/* <a className="footer-links__link">{item.title}</a> */}
                    </Link>
                </div>
            );
        }

        const removeButton = (
            <AsyncAction
                action={() => dispatch(cartUpdate(cartId, item.adId, 0))}
                render={({ run, loading }) => {
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Image src="/icons/cross-10.svg" height={12} width={12} />
                        </button>
                    );
                }}
            />
        );

        return (
            <div key={item.adId} className="dropcart__product">
                {image}
                <div className="dropcart__product-info">
                    <Link href={`/ilanlar/${item.product.adId}?seoUrl=${friendlyUrl}`}>
                        <a className="dropcart__product-name">
                            {item.product.brandName}
                            {' '}
                            {item.product.modelName}
                            {options}
                        </a>
                    </Link>
                    <div className="dropcart__product-meta">
                        <span className="dropcart__product-quantity">{item.amount}</span>
                        {' × '}
                        <span className="dropcart__product-price">{item.product.normalPrice}</span>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    });

    if (items?.length > 0 && status === 'created') {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__products-list">
                    {/* {cart.item.product.brandName} */}
                    {itemList}
                </div>

                <div className="dropcart__totals">
                    <table>
                        <tbody>
                            {totals}
                        </tbody>
                    </table>
                </div>

                <div className="dropcart__buttons">
                    <Link href="/sepet">
                        <a className="btn btn-secondary">Sepet</a>
                    </Link>
                    {user ?
                        <Link href="/odeme">
                            <a className="btn btn-primary">Sipariş Onay</a>
                        </Link>
                        : (
                            <Link href="/hesap/cikis">
                                <a className="btn btn-primary"
                                    onClick={handleClick}>Sepeti Onayla
                                </a>
                            </Link>
                        )}
                </div>
            </div>
        );
    } else {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__empty">
                    Sipairşiniz bulunmamaktadır!
                </div>
            </div>
        );
    }
    return (
        <span>
            <IndicatorPopup
                url="/sepet"
                dropdown={dropdown}
                value={info?.status === 'created' ? (items?.length || undefined) : undefined}
                icon={<Cart20Svg />}
            />
        </span>
    );
}
