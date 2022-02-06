import React, { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import theme from '../../data/theme';
import 'moment/locale/tr';
export default function ShopPageOrderFail(props) {
    return (
        <div className="block order-success">
            <Helmet>
                <title>{`Hatalı İşlem — ${theme.name}`}</title>
            </Helmet>
            <div className="container">
                <div className="order-success__body">
                    <div className="order-success__header">
                        <i className="far fa-times-circle fa-5x" style={{ color: 'red' }}></i>
                        <h1 className="order-success__title">Hatalı İşlem</h1>
                        <div className="order-success__subtitle">Ödeme İşlemi Sırasında Bir Hata Oluştu!</div>
                        <div className="order-success__actions">
                            <Link to="/checkout" className="btn btn-xs btn-secondary">Ödeme Sayfasına Geri Dön</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
