// react
import { useState, useEffect, useRef } from 'react';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// third-party
import Link from 'next/link'
import Head from 'next/head'
import Pagination from '../../../components/shared/Pagination';
import OrderSearch from '../../../components/header/OrderSearch';

// data stubs
import theme from '../../../data/theme';
import 'moment/locale/tr';
import moment from 'moment';
import Spinner from '../../../components/shared/Spinner';
import AccountLayout from '../../../components/account/AccountLayout';
import UseHasMounted from '../../../hooks/useHasMounted';


const checkOrderStatus = order => {
    if (order.status === "paid") {
        return (
            <div className="d-flex flex-row align-items-center">
                <i className="far fa-thumbs-up mr-2"
                    style={{ color: 'green' }} />
                Sipariş Alındı
                {/* <p style={{ fontSize: '12px', }}>Ödeme Alındı</p> */}
            </div>
        )
    }
    else if (order.status === "submitToCargo") {
        return (
            <div className="d-flex flex-row align-items-center">
                <i className="far fa-thumbs-up mr-2"
                    style={{ color: 'green' }} />
                Kargoya Verildi
            </div>
        )
    }
    else if (order.status === "delivered") {
        return (
            <div className="d-flex flex-row align-items-center">
                <i className="far fa-thumbs-up mr-2"
                    style={{ color: 'green' }} />
                Teslim Edildi
            </div>
        )
    }
    else return "Ürün beklemede"
}

export default function AccountPageOrders() {
    const { orders } = useSelector((state) => ({
        orders: state.order.orders,
    }), shallowEqual);
    const hasMounted = UseHasMounted()
    const [orderList, setOrderList] = useState([]);

    const handlePageChange = (items) => {
        setOrderList(items)
    };

    const filterOrders = (items) => {
        setOrderList(items)
    }
    moment().locale('tr');

    const list = orderList?.map((order) => (
        <div key={order.uuid}>
            <div className="row m-2 general_font d-flex d-md-none">
                <div className="col-6 mb-2">Sipariş No</div>
                <div className="col-6 mb-2">
                    <Link href={`/hesap/siparis/${order.uuid}`} >
                        <a>
                            {`#${order.uuid.substring(0, 8)}`}
                        </a>
                    </Link>
                </div>
                <div className="col-6 mb-2">Tarih</div>
                <div className="col-6 mb-2">{order.dateCreated}</div>
                <div className="col-6 mb-2">Sipariş Durumu</div>
                <div className="col-6 mb-2">
                    {checkOrderStatus(order)}
                </div>
                <div className="col-6 mb-2">Toplam Ödeme</div>
                <div className="col-6 mb-2">{order.subTotal}</div>
                <div className="col-6 mb-2">İade</div>
                <div className="col-6 text-success">{order.totalProfit}</div>
            </div>
            <div className="row mx-1 my-3 general_font d-none d-md-flex align-items-center">
                <div className="col-2">
                    <Link href={`/hesap/siparis/${order.uuid}`} >
                        <a>
                            {`#${order.uuid.substring(0, 8)}`}
                        </a>
                    </Link>
                </div>
                <div className="col-3">
                    {order.dateCreated}
                </div>
                <div className="col-3">
                    {checkOrderStatus(order)}
                    {/* {order.status} */}
                </div>
                <div className="col-2">
                    {order.subTotal}
                </div>
                <div className="col-2 text-success">
                    {order.totalProfit}
                </div>
            </div>
            <div className="card-divider" />
        </div>
    ));

    const empty = (<div className="block block-empty">
        <div className="container">
            <div className="block-empty__body">
                <div className="block-empty__message">Herhangi bir siparişiniz bulunmamaktadır!</div>
            </div>
        </div>
    </div>)


    return (
        <AccountLayout>
            <Head>
                <title>{`Siparişler — ${theme.name}`}</title>
            </Head>

            <div className="card">
                <div className="card-header">
                    <div className="row d-flex justify-content-between align-items-center">
                        <div className="col-4 col-sm-6"
                            style={{ fontSize: 'calc(70% + 0.5vw)', fontWeight: 600 }}
                        >
                            Siparişlerim
                        </div>
                        <div className="col-8 col-sm-6">
                            <OrderSearch filterOrders={filterOrders} context="header" />
                        </div>
                    </div>
                </div>
                <div className="card-divider d-none d-md-flex" />
                <div className="row mx-1 my-3 general_font d-none d-md-flex" >
                    <div className="col-2">Sipariş No</div>
                    <div className="col-3">Tarih</div>
                    <div className="col-3">Sipariş Durumu</div>
                    <div className="col-2">Ödeme</div>
                    <div className="col-2">İade</div>
                </div>
                <div className="card-divider" />
                {hasMounted ? list : empty}
                <div className="card-footer">
                    <Pagination items={orders} onPageChange={handlePageChange} />
                </div>
            </div>
        </AccountLayout>
    )

}
