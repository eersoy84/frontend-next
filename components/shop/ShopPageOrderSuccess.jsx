import React, { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import axios from 'axios';
import Currency from '../shared/Currency';
import { Check100Svg } from '../../svg';
// data stubs
import theme from '../../data/theme';
import 'moment/locale/tr';
import { API_BASE } from '../../config';
import { authHeaderWithSecret } from '../../helpers';
import Spinner from '../shared/Spinner';
import addressInfo from '../../helpers/addressInfo';
import { postCartGetFail } from '../../store/cart/cartActions';

export default function ShopPageOrderSuccess(props) {
    const { location } = props;
    const { address } = useSelector((state) => ({
        address: state.profile.address,
    }), shallowEqual);

    const [cart, setCart] = useState('');
    const [shippingAddress, setShippingAddress] = useState();
    const [invoiceAddress, setInvoiceAddress] = useState();

    const dispatch = useDispatch();
    const queryString = require('query-string');
    const parsed = queryString.parse(location.search);
    const { orderId } = parsed;
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const asyncAction = axios.post(`${API_BASE}/cart/get`,
            { cartId: orderId, isOrder: 1 },
            { headers: authHeaderWithSecret() });
        asyncAction.then((response) => {
            let cart = response.data;
            setCart(cart);
            setShippingAddress(address.find((q) => q.id === cart.info.shippingId));
            setInvoiceAddress(address.find((q) => q.id === cart.info.invoiceId));
        }).catch((err) => { });
    }, []);

    useEffect(() => {
        if (orderId) {
            dispatch(postCartGetFail(null));
        }
    }, [orderId]);

    const itemList = cart ? cart.items.map((item) => {
        let product = item && item.product;
        const adName = product && (`${product.categoryName} ${product.brandName} ${product.modelName}`);
        const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
        const options = (item.product.options || []).map((option, key) => (
            <li key={key} className="order-list__options-item">
                <span className="order-list__options-label">
                    {option.name}
                    {': '}
                </span>
                <span className="order-list__options-value">{option.value}</span>
            </li>
        ));
        if (item) {
            return (
                <tr key={item.adId}>
                    <td className="order-list__column-image">
                        <Link to={`/ilanlar/${product.adId}/${friendlyUrl}`}>
                            <img src={item.product.imageUrl} alt="" />
                        </Link>
                    </td>
                    <td className="order-list__column-product">
                        <Link to={`/ilanlar/${product.adId}/${friendlyUrl}`}>
                            {item.product.brandName}
                            {' '}
                            {item.product.modelName}
                        </Link>
                        {options.length > 0 && (
                            <div className="order-list__options">
                                <ul className="order-list__options-list">
                                    {options}
                                </ul>
                            </div>
                        )}
                    </td>
                    <td className="order-list__column-quantity" data-title="Adet:">{item.amount}</td>
                    <td className="order-list__column-total">{item.totalPrice}</td>
                </tr>
            );
        }
    }) : null;

    const additionalLines = order.additionalLines.map((line, index) => (
        <tr key={index}>
            <th className="order-list__column-label" colSpan="3">{line.label}</th>
            <td className="order-list__column-total"><Currency value={line.total} /></td>
        </tr>
    ));

    const renderAddress = (addressItem, addressStatus) => (
        <div className="col-sm-6 col-12 px-2 py-2 py-sm-0">
            <div className="card address-card">
                <div className="address-card__body">
                    {addressInfo(addressItem, addressStatus)}
                </div>
            </div>
        </div>
    );

    if (cart) {
        return (
            <div className="block order-success">
                <Helmet>
                    <title>{`Sipariş Başarılı — ${theme.name}`}</title>
                </Helmet>

                <div className="container">
                    <div className="order-success__body">
                        <div className="order-success__header">
                            <Check100Svg className="order-success__icon" />
                            <h1 className="order-success__title">Teşekkürler</h1>
                            <div className="order-success__subtitle">Siparişiniz Bize Ulaşmıştır</div>
                            <div className="order-success__actions">
                                <Link to="/kategori" className="btn btn-xs btn-secondary">İlanlara geri dön</Link>
                            </div>
                        </div>

                        {cart.info && (
                            <div className="order-success__meta">
                                <ul className="order-success__meta-list">
                                    <li className="order-success__meta-item">
                                        <span className="order-success__meta-title">Sipariş Numarası</span>
                                        <span className="order-success__meta-value">{`#${cart.info.uuid && cart.info.uuid.substring(0, 8)}`}</span>
                                    </li>
                                    <li className="order-success__meta-item">
                                        <span className="order-success__meta-title">Tarih</span>
                                        <span className="order-success__meta-value">{cart.info.dateCreated}</span>
                                    </li>
                                    <li className="order-success__meta-item">
                                        <span className="order-success__meta-title">Toplam</span>
                                        <span className="order-success__meta-value">{cart.info.subTotal}</span>
                                    </li>
                                    <li className="order-success__meta-item">
                                        <span className="order-success__meta-title">Ödeme yöntemi</span>
                                        <span className="order-success__meta-value">İyziPay</span>
                                    </li>
                                </ul>
                            </div>
                        )}

                        <div className="card">
                            <div className="order-list">
                                <table>
                                    <thead className="order-list__header">
                                        <tr>
                                            <th className="order-list__column-label" colSpan="2">Siparişler</th>
                                            <th className="order-list__column-quantity">Adet</th>
                                            <th className="order-list__column-total">Toplam</th>
                                        </tr>
                                    </thead>
                                    <tbody className="order-list__products">
                                        {itemList}
                                    </tbody>
                                    {/* {additionalLines.length > 0 && (
                                    <tbody className="order-list__subtotals">
                                        <tr>
                                            <th className="order-list__column-label" colSpan="3">Toplam</th>
                                            <td className="order-list__column-total">{info.subTotal}</td>
                                        </tr>
                                        {additionalLines}
                                    </tbody>
                                )} */}
                                    <tfoot className="order-list__footer">
                                        <tr>
                                            <th className="order-list__column-label" colSpan="3">Genel Toplam</th>
                                            <td className="order-list__column-total">{cart.info.subTotal}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div className="row mt-3 no-gutters mx-n2">
                            {renderAddress(shippingAddress, 'Teslimat Adresi')}
                            {renderAddress(invoiceAddress, 'Fatura Adresi')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <Spinner />;
}
