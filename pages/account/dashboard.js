// react
import { useEffect, useState } from 'react';

// third-party
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
// data stubs
import moment from 'moment';
import { connect } from 'react-redux';
import theme from '../../data/theme';
// import 'react-phone-input-2/lib/style.css';
import addressInfo from '../../helpers/addressInfo';

import 'moment/locale/tr';
import AccountLayout from '../../components/account/AccountLayout';
import { useSession } from 'next-auth/react';

function Dashboard(props) {
    moment().locale('tr');
    const { data: session } = useSession();
    const user = session?.user
    const { orders, address } = props;
    const defaultAddress = address && address[0];

    const orderList = orders?.slice(0, 3).map(order => (
        <tr key={order.uuid}>
            <td>
                <Link
                    href={`/hesap/siparis/${order.uuid}`}
                >
                    <a>
                        {`#${order.uuid.substring(0, 8)}`}
                    </a>
                </Link>
            </td>
            <td>
                {/* {moment(order.createdDate).format('Do MMMM YYYY HH:mm')} */}
                {order.dateCreated}
            </td>
            <td>{order.status}</td>
            <td>{order.subTotal}</td>
            <td className="text-success">
                {order.totalRefund}
            </td>
        </tr>
    ));

    const addressArea = (address && address[0] && (
        <div className="dashboard__address card address-card address-card--featured">
            <div className="address-card__body">
                {addressInfo(defaultAddress, 'Varsayılan Adres')}
                <div className="address-card__footer">
                    <Link href="/hesap/adres">
                        <a className="btn btn-primary btn-sm">
                            Adres Düzenle
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    ));

    return (
        <AccountLayout>
            <div className="dashboard">
                <Head>
                    <title>{`Hesabım — ${theme.name}`}</title>
                </Head>

                {user &&
                    (<div className="dashboard__profile card profile-card">
                        <div className="card-body profile-card__body">
                            <div className="profile-card__avatar">
                                {user?.image && <Image src={user?.image} height={30} width={30} />}
                            </div>
                            <div className="profile-card__name">
                                {user?.firstName}
                                {' '}
                                {user?.lastName}
                            </div>
                            <div className="profile-card__email">{user?.email}</div>
                            {/* <div className="profile-card__edit">
                                <Link href="/hesap/profil">
                                    <a className="btn btn-secondary btn-sm">
                                        Profili Düzenle
                                    </a>
                                </Link>
                            </div> */}
                        </div>
                    </div>)
                }
                {user && addressArea}
                {user && orderList}
            </div>
        </AccountLayout>

    );
}

const mapStateToProps = (state) => ({
    orders: state.order.orders,
    address: state.profile.address,
    adList: state.ad.adList,
});
const mapDispatchToProps = (state) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
