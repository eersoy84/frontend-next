// react
import React, { useState, useEffect } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// third-party
import { Collapse, CardBody, Card } from 'reactstrap';

import classNames from 'classnames';
import { Check9x7Svg, Quickview16Svg } from '../../svg';
import 'react-phone-input-2/lib/style.css';
import AddressModal from './AddressModal';
import NumberFormat from 'react-number-format';

import addressInfo from '../../helpers/addressInfo';
import Ripples from 'react-ripples';

export default function AddressCollapse(props) {
    const { isBillingSame, shippingAddress, billingAddress } = props;

    const [selectedShippingAddressId, setSelectedShippingAddressId] = useState(() => JSON.parse(localStorage.getItem('selectedShippingAddressId')) || 0);
    const [selectedBillingAddressId, setSelectedBillingAddressId] = useState(() => JSON.parse(localStorage.getItem('selectedBillingAddressId')) || 0);
    const [billingAddressCheck, setBillingAddressCheck] = useState(() => JSON.parse(localStorage.getItem('billingAddressCheck')) || true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBilling, setIsBilling] = useState(false);
    const [modalAddress, setModalAddress] = useState('');
    const [modalHeader, setModalHeader] = useState('');
    const [shippingHeader, setShippingHeader] = useState('');
    const [billingHeader, setBillingHeader] = useState('');
    const dispatch = useDispatch();

    const { address } = useSelector((state) => ({
        address: state.profile.address,
    }), shallowEqual);

    useEffect(
        () => {
            localStorage.setItem('selectedShippingAddressId', selectedShippingAddressId);
            localStorage.setItem('selectedBillingAddressId', selectedBillingAddressId);
            localStorage.setItem('billingAddressCheck', billingAddressCheck);
        }, [billingAddressCheck, selectedShippingAddressId, selectedBillingAddressId],
    );

    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isBillingOpen, setIsBillingOpen] = useState(false);

    const toggleShipping = () => setIsShippingOpen(!isShippingOpen);
    const toggleBilling = () => setIsBillingOpen(!isBillingOpen);

    const getShippingAddressList = (address) => address && address.length > 0 && address.map((addressItem, index) => !addressItem.hidden && (
        <React.Fragment key={index}>
            <div className="col-12 col-sm-6 col-md-4 mt-4">
                <div className="shop_page_checkout_item_card_radio">
                    <div className="shop_page_checkout_item_card_radio_button">
                        <span className="filter-list__input input-radio">
                            <span className="input-radio__body">
                                <input
                                    type="radio"
                                    className="input-radio__input"
                                    name="shipping_address"
                                    value={addressItem.id}
                                    checked={selectedShippingAddressId === addressItem.id}
                                    onChange={handleShippingChange}
                                />
                                <span className="input-radio__circle" />
                            </span>
                        </span>
                        <span className="radio_button-title">{addressItem.addressTitle}</span>
                    </div>
                    <div className="shop_page_checkout_item_card_edit">
                        <button
                            type="button"
                            onClick={() => editModal(addressItem, false)}
                            className="btn btn_edit"
                        >
                            <i className="fas fa-pencil-alt" />
                        </button>
                    </div>
                </div>
                <div
                    style={{ borderRadius: '10px' }}
                    className={classNames('shop_page_checkout_item_card', {
                        'shop_page_checkout_item_card--active': selectedShippingAddressId === addressItem.id,
                    })}

                    onClick={() => handleShippingAreaClicked(addressItem)}
                >
                    <div
                        className="address-card__body"
                        style={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}
                    >
                        {addressInfo(addressItem, null)}
                    </div>
                </div>
            </div>

        </React.Fragment>
    ));

    const getBillingAddressList = (address) => address && address.length > 0 && address.map((addressItem, index) => !addressItem.hidden && (
        <React.Fragment key={index}>
            <div className="col-12 col-sm-6 col-md-4 mt-4">
                <div className="shop_page_checkout_item_card_radio">
                    <div className="shop_page_checkout_item_card_radio_button">
                        <span className="filter-list__input input-radio">
                            <span className="input-radio__body">
                                <input
                                    type="radio"
                                    className="input-radio__input"
                                    name="billing_address"
                                    value={addressItem.id}
                                    checked={selectedBillingAddressId == addressItem.id}
                                    onChange={handleBillingChange}
                                />
                                <span className="input-radio__circle" />
                            </span>
                        </span>
                        <span className="radio_button-title">{addressItem.addressTitle}</span>
                    </div>
                    <div className="shop_page_checkout_item_card_edit">
                        <button
                            type="button"
                            onClick={() => editModal(addressItem, false)}
                            className="btn btn_edit"
                        >
                            <i className="fas fa-pencil-alt" />
                        </button>
                    </div>
                </div>
                <div
                    style={{ borderRadius: '10px' }}
                    className={classNames('shop_page_checkout_item_card', {
                        'shop_page_checkout_item_card--active': selectedBillingAddressId === addressItem.id,
                    })}
                    onClick={() => handleBillingAreaClicked(addressItem)}
                >

                    <div
                        className="address-card__body"
                        style={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}
                    >
                        {addressInfo(addressItem, null)}
                    </div>
                </div>
            </div>

        </React.Fragment>
    ));

    const openModal = (val) => {
        setModalHeader('Yeni Adres Ekle');
        setModalAddress('');
        setIsBilling(val);
        setIsModalOpen(true);
    };

    const editModal = (address, val) => {
        setModalHeader('Adres Düzenle');
        setIsBilling(val);
        setModalAddress(address);
        setIsModalOpen(true);
    };

    const handleShippingChange = (e) => {
        const id = parseInt(e.target.value);
        shippingAddress(id);
        setSelectedShippingAddressId(id);
    };
    const handleShippingAreaClicked = (addressItem) => {
        const { id } = addressItem;
        setSelectedShippingAddressId(id);
        shippingAddress(id);
    };

    const handleBillingAreaClicked = (addressItem) => {
        const { id } = addressItem;
        billingAddress(id);
        setSelectedBillingAddressId(id);
    };
    const handleBillingChange = (e) => {
        const id = parseInt(e.target.value);
        billingAddress(id);
        setSelectedBillingAddressId(id);
    };
    const handleAddressCheckBox = (event) => {
        isBillingSame(event.target.checked);
        setBillingAddressCheck(event.target.checked);
    };
    useEffect(() => {
        let result;
        const addressItem = address.find(q => q.id === selectedShippingAddressId);
        setShippingHeader(() => {
            if (addressItem) {
                result = (
                    <div>
                        <div className="address-card__body p-0">
                            <h6>
                                {addressItem.addressTitle}
                                {' '}
                                <span style={{ fontSize: '12px', color: 'red' }}
                                    onClick={() => editModal(addressItem, false)}>
                                    {'\{düzenle\}'}
                                </span>
                            </h6>
                            <div className="address-card__row-title mt-2">Alıcı: Ad-Soyad</div>
                            <div className="address-card__row">
                                {addressItem.firstName}
                                {' '}
                                {addressItem.lastName}
                            </div>
                            {addressItem.isCorporate === 1
                                && (
                                    <div>
                                        <div className="address-card__row-title">Şirket Bilgisi</div>
                                        <div>
                                            {addressItem.companyName}
                                        </div>
                                    </div>
                                )}
                            <div className="address-card__row-title">Adres</div>
                            <div className="address-card__row">
                                {addressItem && (
                                    <div style={{ wordBreak: 'break-all' }}>
                                        {addressItem.city}
                                        {'/'}
                                        {addressItem.district}
                                        <br />
                                        {addressItem.town}
                                        <br />
                                        {addressItem.addressText}
                                    </div>
                                )}
                            </div>
                            <div className="address-card__row-title">Telefon</div>
                            <div className="address-card__row">
                                {addressItem && (
                                    <div>
                                        <NumberFormat
                                            format="+## (###) ### ## ##"
                                            value={addressItem.phone}
                                            displayType="text"
                                        />

                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            } else {
                result = (<h6> Teslimat Adresi Seçin</h6>);
            }
            return result;
        });
    }, [address, selectedShippingAddressId]);

    useEffect(() => {
        let result;
        const addressItem = address.find((q) => q.id === selectedBillingAddressId);
        setBillingHeader(() => {
            if (addressItem) {
                result = (
                    <div>
                        <div className="address-card__body p-0">
                            <h6>
                                {addressItem.addressTitle}
                                {' '}
                                <span style={{ fontSize: '12px', color: 'red' }}
                                    onClick={() => editModal(addressItem, false)}>
                                    {'\{düzenle\}'}
                                </span>
                            </h6>
                            <div>
                                <div className="address-card__row-title">Alıcı: Ad-Soyad</div>
                                <div>
                                    {addressItem.firstName}
                                    {' '}
                                    {addressItem.lastName}
                                </div>
                            </div>
                            {addressItem.isCorporate === 1
                                && (
                                    <div>
                                        <div className="address-card__row-title">Şirket Bilgisi</div>
                                        <div>
                                            {addressItem.companyName}
                                        </div>
                                    </div>
                                )}
                            <div className="address-card__row-title">Adres</div>
                            <div className="address-card__row">
                                {addressItem && (
                                    <div style={{ wordBreak: 'break-all' }}>
                                        {addressItem.city}
                                        {'/'}
                                        {addressItem.district}
                                        <br />
                                        {addressItem.town}
                                        <br />
                                        {addressItem.addressText}
                                    </div>
                                )}
                            </div>
                            <div className="address-card__row-title">Telefon</div>
                            <div className="address-card__row">
                                {addressItem && (
                                    <div>
                                        <NumberFormat
                                            format="+## (###) ### ## ##"
                                            value={addressItem.phone}
                                            displayType="text"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            } else {
                result = (<h6> Fatura Adresi Seçin</h6>);
            }
            return result;
        });
    }, [address, selectedBillingAddressId]);

    return (
        <div>
            {
                isModalOpen
                    ? <AddressModal show={isModalOpen} onHide={() => setIsModalOpen(false)} modalAddress={modalAddress} header={modalHeader} isBilling={isBilling} />
                    : null
            }

            <div className="row">
                <div className="col-6 mb-3">
                    <h5>Teslimat Adresi</h5>
                </div>
                <div className="col-6 mb-3 d-flex justify-content-end">
                    <div className="shop_page_checkout_address_checkbox">
                        <div className="form-check">
                            <span className="form-check-input input-check">
                                <span className="input-check__body">
                                    <input
                                        className="input-check__input"
                                        type="checkbox"
                                        id="checkout-address"
                                        value={billingAddressCheck}
                                        checked={billingAddressCheck}
                                        // defaultChecked={billingAddressCheck}
                                        onChange={handleAddressCheckBox}
                                    />
                                    <span className="input-check__box" />
                                    <Check9x7Svg className="input-check__icon" />
                                </span>
                            </span>
                            <label
                                className="form-check-label text-center"
                                style={{ fontSize: '13px' }}
                                htmlFor="checkout-address"
                            >
                                Fatura Adresim Aynı
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <Card>
                <div className="card-header card_title address_card_style  py-3" onClick={toggleShipping} style={{ cursor: 'pointer' }}>
                    <div className="address-info">
                        {shippingHeader}
                        <div>
                            <i style={{ color: '#f1861d' }}
                                className={classNames('fas fa-chevron-up rotate_icon', {
                                    rotate_icon_active: isShippingOpen ? false : true
                                })}
                            />
                        </div>
                    </div>
                </div>
                <Collapse isOpen={isShippingOpen} >
                    <CardBody className="pt-0">
                        <div className="row my-3">
                            <div className="col-12">
                                <span
                                    className="add_new_address"
                                    onClick={() => openModal(true)}
                                    style={{ fontWeight: 500 }}
                                >
                                    <i className="fas fa-plus mr-2" />
                                    Yeni Adres Ekle
                                </span>

                            </div>
                        </div>
                        <div className="row">
                            {getShippingAddressList(address)}
                        </div>
                    </CardBody>
                </Collapse>
            </Card >

            <div className="row mt-3">
                <div className="col-12 mb-3">
                    <h5 className="m-0">Fatura Adresi</h5>
                    <span style={{ fontSize: '12px' }}>
                        Faturanız seçilen fatura adresine kesilip ürün ile beraber <b>&apos;Teslimat Adresinize&apos;</b>
                        {' '}
                        gönderilir.
                        {' '}
                    </span>
                </div>
            </div>
            {
                !billingAddressCheck
                && (
                    <Card>
                        <div className="card-header card_title address_card_style py-3" onClick={toggleBilling} >
                            <div className="address-info">
                                {billingHeader}
                                <div>
                                    <i style={{ color: '#f1861d' }}
                                        className={classNames('fas fa-chevron-up rotate_icon', {
                                            rotate_icon_active: isBillingOpen ? false : true
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                        <Collapse isOpen={isBillingOpen}>
                            <CardBody className="pt-0">
                                <div className="row my-3">
                                    <div className="col-12">
                                        <span
                                            className="add_new_address"
                                            onClick={() => openModal(true)}
                                            style={{ fontWeight: 500 }}
                                        >
                                            <i className="fas fa-plus mr-2" />
                                            Yeni Adres Ekle
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    {getBillingAddressList(address)}
                                </div>
                            </CardBody>
                        </Collapse>
                    </Card>
                )
            }

        </div >

    );
}
