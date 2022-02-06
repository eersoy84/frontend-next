import { useState, useEffect } from 'react';
import { Card, CardBody, Collapse } from 'reactstrap';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// third-party
import classNames from 'classnames';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

// application
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import AsyncAction from '../components/shared/AsyncAction';
import Currency from '../components/shared/Currency';
import InputNumber from '../components/shared/InputNumber';
import PageHeader from '../components/shared/PageHeader';
import { cartUpdate, cartGet } from '../store/cart/cartActions';
import RatingPoint from '../components/shared/RatingPoint'
import useIsMounted from '../hooks/UseIsMounted';

// data stubs
import theme from '../data/theme';

export default function ShopPageCart() {
    const [cartInstance, setCartInstance] = useState({});
    const { info, taxes, items, isLoading } = cartInstance;
    const { cart } = useSelector(state => ({
        cart: state.cart,
    }), shallowEqual);
    let user;
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
    })
    const dispatch = useDispatch();

    const cartId = info && info.uuid;
    const status = info && info.status;
    const handleChangeQuantity = (adId, amount) => {
        dispatch(cartUpdate(cartId, adId, amount));
    };

    const toggle = () => setDetailOpened(!detailOpened);
    const [detailOpened, setDetailOpened] = useState(false);

    const arrowClasses = classNames('fas fa-chevron-up rotate_icon', {
        rotate_icon_active: detailOpened,
    });
    useEffect(() => {
        if (status) {
            dispatch(cartGet(cartId));
        }
    }, [status, dispatch]);

    useEffect(() => {
        setCartInstance(cart);
    }, [cart]);

    const renderItems = () => items && items.map((item) => {
        const adName = item.product && (`${item.product.categoryName} ${item.product.brandName} ${item.product.modelName}`);
        const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
        let image;
        let options;
        const orderCount = item.product.numOrders;
        if (item.product.imageUrl) {
            image = (
                <Link href={`/ilanlar/${item.product.adId}/${friendlyUrl}`}>
                    <a>
                        <img src={item.product.imageUrl} alt="" />
                    </a>
                </Link>
            );
        }

        if (item.product.options && item.product.options.length > 0) {
            options = (
                <ul className="cart-table__options">
                    {item.product.options.map((option, index) => (
                        <li key={index}>
                            <span>
                                {' '}
                                {`${option.name}`}
                            </span>
                            {' '}
                            <span>
                                {':'}
                                {' '}
                                {`${option.value}`}
                            </span>
                        </li>

                    ))}
                </ul>
            );
        }

        const removeButton = (
            <AsyncAction
                action={() => dispatch(cartUpdate(cartId, item.adId, 0))}
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

        return (
            <Card style={{ borderRadius: '10px' }} className="mb-3" key={item.adId}>
                <CardBody className="p-2 p-sm-3">
                    <div className="row">
                        <div className="col-3 d-flex align-items-center justify-content-center">
                            <div className="cart-table__column--image">
                                {image}
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="row">
                                <div className="col-10">
                                    <Link
                                        href={`/ilanlar/${item.adId}/${friendlyUrl}`}>
                                        <a style={{ color: '#F1861D' }}>
                                            <span style={{ fontSize: 'calc(70% + 0.5vw)' }}>
                                                {`${item.product.brandName} ${item.product.modelName}`}
                                            </span>
                                        </a>
                                    </Link>
                                    {options}
                                </div>
                                <div className="col-2 d-flex justify-content-end">
                                    {removeButton}
                                </div>
                            </div>
                            <div className="mt-2 d-flex align-items-baseline">
                                <span style={{ fontSize: '12px' }} className="d-flex align-items-baseline">
                                    Satıcı:&nbsp;
                                    <Link href={`/tedarikci/${item.product.sellerId}`}>
                                        <a style={{ color: '#f1861d' }}>
                                            {item.product.sellerName}
                                        </a>
                                    </Link>
                                </span>&nbsp;
                                <RatingPoint value={8.9} />
                            </div>
                            <div className="d-flex  flex-sm-row flex-column flex-sm-row justify-content-start my-3">
                                <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline mb-1 mb-sm-0">
                                    Satılan:&nbsp;
                                    <span className="text-success">
                                        {orderCount}
                                    </span>
                                </div>
                                <div style={{ fontSize: '12px', display: 'inline-block' }} className="d-flex align-items-baseline ml-0 ml-sm-1 mb-1 mb-sm-0">
                                    Kalan:&nbsp;
                                    <span className="text-danger">
                                        {item.product.quantity - orderCount}
                                    </span>
                                </div>
                                <div style={{ fontSize: '12px' }} className="d-flex align-items-baseline ml-0 ml-sm-1 mb-1 mb-sm-0">
                                    Stok:&nbsp;
                                    <span className="text-info">
                                        {item.product.quantity}
                                    </span>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-6">
                                    <InputNumber
                                        onChange={(amount) => handleChangeQuantity(item.adId, amount)}
                                        value={item.amount}
                                        min={10}
                                        size="sm"
                                        readOnly
                                    />
                                </div>
                                <div className="col-6 d-flex justify-content-end align-items-center">
                                    <span style={{ fontSize: 'calc(80% + 1vw)' }}>
                                        {item.totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

        );
    });

    const renderTotals = () => {
        const totals = (
            <div>
                <div className="row">
                    <div className="col-12">
                        <span style={{ fontSize: '13px' }}>ÖDENECEK TUTAR</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <span style={{ fontSize: '1.9rem' }}>
                            {info.subTotal}
                        </span>
                    </div>
                </div>

                <div
                    className="row mt-3"
                    data-tip="İlan süresi sonunda, kredi kartınıza iade edilecek fiyat farkı"
                    data-for="balance"
                >
                    <div className="col-6">
                        <span>
                            <Image src={'/icons/info-icon.svg'} height={16} width={16} />
                        </span>&nbsp;&nbsp;
                        <span className="text-success general_font">&nbsp;İade</span>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <span className="text-success">{info.totalProfit || 0}</span>
                    </div>
                </div>

            </div>

        );

        const balanceTooltip = (
            <ReactTooltip
                className="toolTip"
                id="balance"
                place="left"
                effect="solid"
                textColor="white"
                backgroundColor="#334f8d"
                arrowColor="red"
                data-html
                insecure
                multiline
            />

        );
        return (
            <>
                {balanceTooltip}
                {totals}
            </>
        );
    };

    const renderCart = () => {
        const spinnerCardClass = classNames('col-xl-9 cart-update', {
            loading: isLoading,
        });
        return (
            <div className="container">
                <div className="row">
                    <div className={spinnerCardClass}>
                        <div className="d-xl-none">
                            <Link
                                href="/kategori">
                                <a
                                    style={{ borderRadius: '10px' }}
                                    className="btn cart_continue_shoppingButton btn-lg w-100 mb-3">
                                    İlanlara Geri Dön
                                </a>
                            </Link>
                        </div>
                        {renderItems()}
                    </div>
                    <div className="col-xl-3">
                        <div className="sticky_top">
                            <div className="d-none d-xl-block">

                                <Link
                                    href="/kategori">
                                    <a style={{ borderRadius: '10px' }}
                                        className="btn cart_continue_shoppingButton btn-lg w-100 mt-3 mt-lg-0 mb-3"
                                    >
                                        İlanlara Geri Dön
                                    </a>
                                </Link>
                            </div>
                            <div className="d-none d-xl-block">

                                <div className="card" style={{ borderRadius: '10px' }}>
                                    <div className="card-body p-4">
                                        {renderTotals()}
                                    </div>
                                </div>
                                {user
                                    ? (
                                        <Link
                                            href="/checkout#delivery">
                                            <a
                                                className="btn btn-primary btn-lg w-100 mt-3"
                                                style={{ borderRadius: '10px' }}
                                            >
                                                <span>Sepeti Onayla</span>&nbsp;&nbsp;
                                                <Image src="/icons/arrow-rounded-right-8x13.svg" className="prev_arrow_custom" height={10} width={10} />
                                            </a>
                                        </Link>
                                    )
                                    : (

                                        <Link
                                            href="/hesap/cikis" >
                                            <a
                                                className="btn btn-primary btn-lg w-100 mt-3"
                                                style={{ borderRadius: '10px' }}
                                            >
                                                <span>Sepeti Onayla</span>&nbsp;&nbsp;
                                                <Image src="/icons/arrow-rounded-right-8x13.svg" className="prev_arrow_custom" height={10} width={10} />
                                            </a>
                                        </Link>
                                    )}
                            </div>
                        </div>

                    </div>
                    <div className="shop_fixed_all">
                        <Collapse
                            isOpen={detailOpened}
                        >
                            <div className="shop_fixed_content_opened d-xl-none">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-6 d-flex">
                                            <span className="text-success" style={{ fontSize: '13px' }}>İade:</span>
                                        </div>
                                        <div className="col-6 d-flex justify-content-end">
                                            <span className="text-success">
                                                {info.totalProfit}
                                                {' '}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <div className="shop_fixed_content d-xl-none">
                            <div className="container">
                                <div className="row">
                                    <div
                                        className="col-6 d-flex justify-content-start"
                                        onClick={() => toggle()}
                                    >
                                        <span className="d-flex align-items-center">
                                            <i style={{ color: '#f1861d' }} className={arrowClasses} />
                                        </span>
                                        <div className="ml-3 d-flex flex-column justify-content-start">
                                            <div className="row">
                                                <div className="col-12">
                                                    <span className="text-responsive">ÖDENECEK TUTAR</span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <span className="currency-responsive">
                                                        {info.subTotal}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 d-flex justify-content-end align-items-center">
                                        {user
                                            ? (
                                                <Link
                                                    href="/checkout#delivery" style={{ borderRadius: '10px' }}>
                                                    <a className="btn btn-primary px-2 w-100"  >
                                                        <span style={{ fontSize: '12px' }}> Sepeti Onayla</span>
                                                        <span className="ml-3">
                                                            <Image src="/icons/arrow-rounded-right-8x13.svg" className="prev_arrow_custom" height={10} width={10} />
                                                        </span>
                                                    </a>
                                                </Link>
                                            )
                                            : (
                                                <Link
                                                    href="/hesap/cikis" style={{ borderRadius: '10px' }}>
                                                    <a className="btn btn-primary px-2 w-100"  >
                                                        <span style={{ fontSize: '12px' }}> Sepeti Onayla</span>
                                                        <span className="ml-3">
                                                            <Image src="/icons/arrow-rounded-right-8x13.svg" className="prev_arrow_custom" height={10} width={10} />
                                                        </span>
                                                    </a>
                                                </Link>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    };
    const breadcrumb = [
        { title: 'Ana Sayfa', url: '/' },
        { title: 'Siparişler', url: '' },
    ];
    return (
        <>
            <Head>
                <title>{`Sepetim — ${theme.name}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />
            {(items && items.length > 0) && (info && info.status === 'created')
                ? renderCart()
                : (
                    <div className="block block-empty">
                        <div className="container">
                            <div className="block-empty__body">
                                <div className="block-empty__message">Herhangi bir siparişiniz bulunmamaktadır!</div>
                                <div className="block-empty__actions">
                                    <Link href="/ilanlar"><a className="btn btn-primary btn-sm">Geri Dön</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>

    );
}
