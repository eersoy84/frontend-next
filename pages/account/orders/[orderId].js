import { Fragment, useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import moment from 'moment';
import axios from 'axios';
// data stubs
import theme from '../../../data/theme';
import 'moment/locale/tr';
import { API_BASE } from '../../../config';
import { authHeaderWithSecret, addressInfo } from '../../../helpers';
import Spinner from '../../../components/shared/Spinner';
import classNames from 'classnames';
import ReviewSellerModal from '../../../components/account/ReviewSellerModal';
import ReturnProductModal from '../../../components/account/ReturnProductModal';
import CancelProductModal from '../../../components/account/CancelProductModal';
import RatingPoint from '../../../components/shared/RatingPoint';
import CreateCargoCodeModal from '../../../components/account/CreateCargoCodeModal';
import { Collapse } from 'reactstrap';
import ReviewProductModal from '../../../components/account/ReviewProductModal';
import { toast } from 'react-toastify';
import AccountLayout from '../../../components/account/AccountLayout';
import { useSession } from 'next-auth/react';

const formatDate = (date) => {
    let newDate = moment(date)
    return newDate.format("Do MMMM yyyy dddd")
}

export default function AccountPageOrderDetails() {
    const { query } = useRouter()
    const { orderId } = query
    const { address } = useSelector((state) => ({
        address: state.profile.address,
    }), shallowEqual);
    const [cart, setCart] = useState();
    const [shippingAddress, setShippingAddress] = useState();
    const [invoiceAddress, setInvoiceAddress] = useState();


    const [reviewQuestions, setReviewQuestions] = useState(null);
    const [reasons, setReasons] = useState(null);

    //modal
    const [sellerValues, setSellerValues] = useState(null);

    const [isReviewButtonVisible, setIsReviewButtonVisible] = useState(null);
    const [isReturnProductButtonVisible, setIsReturnProductButtonVisible] = useState(null);
    const [isCancelProductButtonVisible, setIsCancelProductButtonVisible] = useState(null);
    const [isReviewProductButtonVisible, setIsReviewProductButtonVisible] = useState(null);
    const [isCreateCargoCodeButtonVisible, setIsCreateCargoCodeButtonVisible] = useState(null);

    const [returnModalUserCartItem, setReturnModalUserCartItem] = useState(null);
    const [cancelModalUserCartItem, setCancelModalUserCartItem] = useState(null);
    const [reviewProductModalItem, setReviewProductModalItem] = useState(null);



    const [returnCargoCodeCreated, setReturnCargoCodeCreated] = useState(null);
    const [isAdId, setIsAdId] = useState(null)

    useEffect(async () => {
        const asyncAction = axios.post(`${API_BASE}/cart/get`,
            { cartId: orderId, isOrder: 1 },
            { headers: await authHeaderWithSecret() });
        asyncAction.then(({ data }) => {
            let cart = data;
            setCart(cart);
        }).catch((err) => { });
    }, [orderId, isReviewButtonVisible, isReturnProductButtonVisible, isCancelProductButtonVisible, isCreateCargoCodeButtonVisible, isReviewProductButtonVisible]);

    useEffect(() => {
        setShippingAddress(address.find(q => q.id === cart?.info?.shippingId));
        setInvoiceAddress(address.find(q => q.id === cart?.info?.invoiceId));
    }, [cart, address]);

    useEffect(() => {
        axios.get(`${API_BASE}/cart/rating-form`)
            .then((response) => {
                setReviewQuestions(response.data)
            }).catch((err) => {
                if (err?.response)
                    toast.error(err?.response?.data?.message)
            });
    }, []);

    useEffect(() => {
        axios.get(`${API_BASE}/cart/return-reasons`)
            .then((response) => {
                setReasons(response.data)
            }).catch((err) => {
                if (err?.response)
                    toast.error(err?.response?.data?.message)
            });
    }, []);


    const statusOrderCreated = (userCartItem) => {
        let returnableAmount = userCartItem?.returnableAmount;
        if (returnableAmount && returnableAmount > 0) {
            return (
                <div>
                    <div className="mb-2">
                        <i className="far fa-thumbs-up mb-2"
                            style={{ color: 'green' }} />&nbsp;<span style={{ fontSize: '12px' }}>Siparişiniz Hazırlanıyor</span>
                        <div>
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Tahmini Kargo Süresi:</span>&nbsp;<span style={{ fontSize: '12px' }}>3 gün</span>
                    </div>
                    <div>
                        <span
                            className="evaluate_button mt-3"
                            onClick={() => cancelProduct(userCartItem)}
                        >
                            <span className="text-danger"><i className="fas fa-times" /></span>&nbsp;&nbsp;
                            <span className="text-danger" style={{ fontSize: '12px' }}>Ürünü İptal Et</span>
                        </span>
                    </div>
                </div>
            )
        }
        // else {
        //     return statusOrderCancelled(userCartItem)
        // }
    }
    const statusOrderShipped = (userCartItem) => {
        return (
            <div>
                <div className="mb-2">
                    <i className="fas fa-truck mb-2"
                        style={{ color: 'green' }} />&nbsp;
                    <span style={{ fontSize: '12px' }}>Kargoya Verildi</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{userCartItem.amount} adet ürün <strong>&quot;Çıkmaz Ayın Son Perşembesi&quot;</strong> günü kargoya verilmiştir!</div>
                <div>
                    <span style={{ fontSize: '12px' }}>Kargo Firması:</span>&nbsp;&nbsp;
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>MNG Kargo</span>
                </div>
                <div>
                    <span style={{ fontSize: '12px' }}>Kargo Takip No:</span>&nbsp;&nbsp;
                    <Link href={'/'}>
                        <a>
                            <span style={{ fontSize: '12px' }}>#2342636345645</span>
                        </a>

                    </Link>
                </div>
            </div>
        )
    }
    const statusOrderDelivered = (userCartItem) => {
        let returnableAmount = userCartItem.returnableAmount;
        return (
            <div>
                <div className="mb-2">

                    <i className="fas fa-check mb-2"
                        style={{ color: 'green' }} />&nbsp;
                    <span style={{ fontSize: '12px' }}>Teslim Edildi</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{userCartItem.amount} adet ürün <strong>{cart?.info.dateCreated}</strong> günü teslim edilmiştir.</div>
                <div>
                    <span style={{ fontSize: '12px' }}>Kargo Firması:</span>&nbsp;&nbsp;
                    <span style={{ fontSize: '12px', fontWeight: 'bold' }}>MNG Kargo</span>
                </div>
                <div>
                    <span style={{ fontSize: '12px' }}>Kargo Takip No:</span>&nbsp;&nbsp;
                    <Link href={'/'}>
                        <a>
                            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>#23426363</span>
                        </a>
                    </Link>
                </div>
                {returnableAmount && returnableAmount > 0 ?
                    <div>
                        <span
                            className="evaluate_button mt-1"
                            onClick={() => createEasyReturn(userCartItem)}
                        >
                            <i className="fas fa-undo-alt mr-2" style={{ color: '#f1861d' }} />
                            <span style={{ fontSize: '12px' }}>Kolay İade Talebi Oluştur</span>
                        </span>

                    </div> : null}
            </div>
        )
    }
    const statusOrderCancelled = (userCartItem) => {
        return (
            <div>
                <div className="mb-2">
                    <span className="text-danger"><i className="fas fa-times" /></span>&nbsp;&nbsp;
                    <span style={{ fontSize: '12px', color: 'red' }}>İptal Edildi</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{userCartItem.amount} adet ürün için <span style={{ color: 'green', fontSize: '14px' }}>{userCartItem.totalPrice}</span> tutarındaki iade talebiniz bankanıza iletilmiştir</span>
                <div style={{ fontSize: '12px' }}>Kartınıza yansıma süresi bankanıza bağlı olarak değişebilir.</div>
            </div>
        )
    }

    const getOrderStatus = (userCartItem) => {
        let deliveryStatus = userCartItem.deliveryStatus;
        if (deliveryStatus === "created") {
            return statusOrderCreated(userCartItem);
        }
        if (deliveryStatus === "shipped") {
            return statusOrderShipped(userCartItem);
        }
        if (deliveryStatus === "delivered") {
            return statusOrderDelivered(userCartItem);
        }
        if (deliveryStatus === "cancelled") {
            return statusOrderCancelled(userCartItem);
        }
        else return null
    }


    const toggleProductReturnStatus = (adId) => {
        if (isAdId === adId) {
            setIsAdId(null)
        }
        else
            setIsAdId(adId)
    }

    const getProductReturnStatus = (userCartItem) => {
        let returns = userCartItem.returns;
        let length = returns.length;
        const returnItems = returns && returns.length > 0 && returns.map((item, index) => {
            if (item.status === "created") {
                return (
                    <div className="col-12" key={index}>
                        <div className="p-3" style={{ fontSize: '12px' }}>{item.returnAmount} adet ürünün iade talebi onay aşamasındadır...</div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}
                    </div>
                )
            }
            else if (item.status === "approved") {
                return (
                    <div className="col-12" key={index}>
                        <div className="row p-3">
                            <div className="col-12 col-md-6">
                                <div style={{ fontSize: '12px' }}>{item.returnAmount} adet ürünün iade talebi onaylanmıştır. Lütfen ürün iade kodu oluşturarak en kısa zamanda kargoya veriniz.</div>
                            </div>
                            <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex flex-row justify-content-md-end align-items-center">
                                <div>
                                    <span
                                        className="evaluate_button mr-2"
                                        onClick={() => createReturnCargoCode(userCartItem)}
                                        style={{ fontWeight: 500 }}
                                    >
                                        <i className="fas fa-truck mr-2" style={{ color: '#f1861d' }} />
                                        <span style={{ fontSize: '11px' }}>İade Kargo Kodu Oluştur</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}

                    </div>
                )
            }
            else if (item.status === "denied") {
                return (
                    <div className="col-12" key={index}>
                        <div className="p-3" style={{ fontSize: '12px' }}>{item.returnAmount} adet ürünün iade talebi <Link href={'/'}><a><strong>&quot;Ürün İade Koşullarına&quot;</strong></a></Link> uyulmaması nedeniyle reddedilmiştir.</div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}
                    </div>
                )
            }
            else if (item.status === "waiting_for_shipment") {
                return (
                    <div className="col-12" key={index}>
                        <div className="row d-flex justify-content-between p-3">
                            <div className="col-12 col-md-6 mb-2 mb-md-0">
                                <div style={{ fontSize: '12px' }}>İadesi onaylanan {item.returnAmount} adet ürünü lütfen iade kargo kodunuz ile kargoya veriniz.</div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>İade Kargo Kodu</div>
                                <div style={{ fontSize: '12px', color: 'black', marginBottom: '5px' }}>{`#${cart.info.uuid.substring(0, 12)}`}</div>
                            </div>
                            <div className="col-6 col-md-3">
                                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Kargo Firması</div>
                                <div style={{ fontSize: '12px', color: 'black' }}>{`MNG Kargo`}</div>
                            </div>
                        </div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}

                    </div>
                )
            }
            else if (item.status === "shipping") {
                return (
                    <div className="col-12" key={index}>
                        <div className="p-3" style={{ fontSize: '12px', }}>{item.returnAmount} adet ürünün iadesi kargodadır. Satıcıya ulaşması bekleniyor</div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}

                    </div>
                )
            }
            else if (item.status === "seller_rejected") {
                return (
                    <div className="col-12" key={index}>
                        <div className="p-3" style={{ fontSize: '12px' }}>{item.returnAmount} adet ürünün iade talebi satıcı tarafından <Link href={'/'}><a><strong>&quot;Ürün İade Koşullarına&quot;</strong></a></Link> uyulmaması nedeniyle reddedilmiştir</div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}
                    </div>
                )
            }
            else if (item.status === "proccessing_refund") {
                return (

                    <div key={index}>
                        <div className="col-12 m-3" >
                            <div style={{ fontSize: '12px' }}>{item.returnAmount} adet ürün için iade talebiniz kabul edilmiştir.</div>
                            <div style={{ fontSize: '12px' }}>Para iadenizin kartınıza yansıma süresi bankanıza bağlı olarak değişebilir.</div>

                        </div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}
                    </div>
                )
            }
            else if (item.status === "success_no_product_return") {
                return (
                    <div key={index}>
                        <div className="col-12 m-3" >
                            <div style={{ fontSize: '12px' }}>{item.returnAmount} adet ürün için iade talebiniz kabul edilmiştir. Ürünü iade etmenize gerek yoktur.</div>
                            <div style={{ fontSize: '12px' }}>Para iadenizin kartınıza yansıma süresi bankanıza bağlı olarak değişebilir.</div>

                        </div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}
                    </div>
                )
            }
            else if (item.status === "success") {
                return (
                    <div className="col-12" key={index}>
                        <div className="p-3" style={{ fontSize: '12px' }}>{item.returnAmount} adet ürün için geri ödemeniz bankanıza <strong>{formatDate(item.date)}</strong> günü iletilmiştir.</div>
                        {(length - 1) === index ? null : <div className="card-divider my-2"></div>}
                    </div>
                )
            }
            return null;

        })
        if (returns && returns.length > 0) {
            return (<div className="card m-4">
                <div className="card-header address_card_style" onClick={() => toggleProductReturnStatus(userCartItem.adId)} style={{ cursor: 'pointer' }}>
                    <div className="address-info">
                        <h6>Ürün İptal ve İade Süreçleri</h6>
                        <i style={{ color: '#f1861d' }}
                            className={classNames('fas fa-chevron-up rotate_icon', {
                                rotate_icon_active: isAdId === userCartItem.adId ? false : true,
                            })}
                        />
                    </div>
                </div>
                {isAdId === userCartItem.adId ? <div className="card-divider"></div> : null}
                <Collapse isOpen={isAdId === userCartItem.adId ? true : false}>
                    <div className="row d-flex justify-content-between">
                        {returnItems}
                    </div>
                </Collapse>
            </div>
            )
        }
        return null
    }

    const products = cart && cart.items.map(item => {
        return item.product
    });


    const groupBy = (array, key) =>
        array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
            return result;
        }, {});

    const productsBySellerId = groupBy(products || [], 'sellerId');

    let sellerArray = [];
    for (var key in productsBySellerId) {
        let object = {
            sellerId: key,
            sellerName: productsBySellerId[key][0].sellerName,
            sellerLogo: productsBySellerId[key][0].sellerLogo,
            products: productsBySellerId[key]
        }
        sellerArray.push(object)
    }

    const evalutateSeller = (sellerId, sellerName, sellerLogo) => {
        setSellerValues({ sellerId, sellerName, sellerLogo })
    }
    const evaluateProduct = (userCartItem) => {
        setReviewProductModalItem(userCartItem)
    }
    const createReturnCargoCode = (userCartItem) => {
        setReturnCargoCodeCreated(userCartItem);
    }

    const createEasyReturn = (userCartItem) => {
        setReturnModalUserCartItem(userCartItem);
    }
    const cancelProduct = (userCartItem) => {
        setCancelModalUserCartItem(userCartItem);
    }

    const formatSellerName = (sellerName) => {
        return (sellerName.substring(0, 40) + '...');
    }


    const ordersBySeller = sellerArray && sellerArray.map(item => {
        let isRated = cart?.ratings && cart?.ratings?.length > 0 && cart?.ratings?.find(q => q === parseInt(item.sellerId))
        let products = item.products
        let lengthOfItems = products && products.length;
        const orders = products && products.map((product, index) => {
            let adId = product.adId;
            let userCartItem = cart?.items?.find(item => item.adId === adId)
            let isReviewable = userCartItem.reviewAvailable
            const adName = product && (`${product.categoryName} ${product.brandName} ${product.modelName}`);
            const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();
            if (userCartItem)
                return (
                    <div key={index}>
                        <div className="row p-4">
                            <div className="col-12 col-md-6">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-md-4">
                                                <div className="cart-table__column--image">
                                                    <Link href={`/ilanlar/${product.adId}?seoUrl=${friendlyUrl}`}>
                                                        <a>
                                                            <Image src={product.imageUrl} height={100} width={100} />
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-8 d-flex flex-column">
                                                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                                    {product.brandName}
                                                </span>
                                                <span style={{ fontSize: '12px' }}>
                                                    {product.modelName}
                                                </span>
                                                <span style={{ fontSize: '12px' }}>
                                                    <span style={{ fontWeight: 'bold' }}>Adet:</span>&nbsp;{userCartItem.amount}
                                                </span>
                                                <div style={{ fontSize: '12px' }}>
                                                    <span style={{ fontWeight: 'bold' }}>Toplam:</span>&nbsp;{userCartItem.totalPrice}
                                                </div>

                                                {isReviewable && <div className="mt-2">
                                                    <span
                                                        className="evaluate_button mr-2"
                                                        onClick={() => evaluateProduct(userCartItem)}
                                                        style={{ fontWeight: 500 }}
                                                    >
                                                        <i className="fas fa-star mr-2" style={{ color: '#f1861d' }} />
                                                        <span style={{ fontSize: '12px' }}>Ürünü Değerlendir</span>
                                                    </span>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mt-2 mt-md-0 ml-4 ml-md-0 d-flex justify-content-center flex-column align-content-center align-items-start">
                                {getOrderStatus(userCartItem)}
                            </div>
                        </div>
                        {getProductReturnStatus(userCartItem)}
                        {index == (lengthOfItems - 1) ? null : <div className="card-divider my-3"></div>}
                    </div>

                )
        })
        return (
            <div className="card mb-5" key={item.sellerId} >
                <div className="card-header" style={{ backgroundColor: '#fafafa' }} >
                    <div className="row" >
                        <div className="col-12 col-md-7">
                            <span style={{ fontSize: '12px' }}>
                                Satıcı: </span>&nbsp;
                            <span style={{ fontSize: '14px', color: '#4d8ee1' }}><Link href={`/tedarikci/${item.sellerId}`}><a>{formatSellerName(item.sellerName)}</a></Link>
                            </span>
                            <div style={{ fontSize: '12px' }}>
                                Teslimat No:&nbsp;<span style={{ fontSize: '13px' }}>{"#23423423423"}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 mt-3 mt-md-0 d-flex flex-row justify-content-start justify-content-md-end">
                            {!isRated &&
                                <div>
                                    <span
                                        className="evaluate_button mr-2"
                                        onClick={() => evalutateSeller(item.sellerId, item.sellerName, item.sellerLogo)}
                                        style={{ fontWeight: 500 }}
                                    >
                                        <i className="fas fa-star mr-2" style={{ color: '#f1861d' }} />
                                        <span style={{ fontSize: '12px' }}>Satıcıyı Değerlendir</span>
                                    </span>
                                </div>}
                            <div>
                                <span
                                    className="evaluate_button"
                                    // onClick={showBill}
                                    style={{ fontWeight: 500 }}
                                >
                                    <i className="fas fa-eye mr-2" style={{ color: '#f1861d' }} />
                                    <span style={{ fontSize: '12px' }}>Fatura Göster</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-divider"></div>
                {orders}
            </div>
        )
    })


    const renderAddress = (addressItem, addressStatus) => {
        return (
            <div className="col-sm-6 col-12 px-2 py-2 py-sm-0">
                <div className="card address-card">
                    <div className="address-card__body">
                        {addressInfo(addressItem, addressStatus)}
                    </div>
                </div>
            </div>
        );
    };

    if (cart) {
        return (
            <AccountLayout>

                <div>
                    <Head>
                        <title>{`Sipariş Detay — ${theme.name}`}</title>
                    </Head>

                    {sellerValues ?
                        (<ReviewSellerModal
                            sellerValues={sellerValues}
                            show={true}
                            onHide={() => setSellerValues(null)}
                            hideSellerReviewButton={() => { setIsReviewButtonVisible(Math.random()) }}
                            reviewQuestions={reviewQuestions}
                            cartId={orderId}
                            {...props}>
                        </ReviewSellerModal >) : null}

                    {reviewProductModalItem ? (<ReviewProductModal
                        userCartItem={reviewProductModalItem}
                        show={true}
                        onHide={() => setReviewProductModalItem(null)}
                        hideReviewProductButton={() => { setIsReviewProductButtonVisible(Math.random()) }}
                        reasons={reasons}
                        cartId={orderId}
                        {...props}>
                    </ReviewProductModal >) : null}

                    {returnModalUserCartItem ? (<ReturnProductModal
                        userCartItem={returnModalUserCartItem}
                        show={true}
                        onHide={() => setReturnModalUserCartItem(null)}
                        hideReturnProductButton={() => { setIsReturnProductButtonVisible(Math.random()) }}
                        reasons={reasons}
                        {...props}>
                    </ReturnProductModal >) : null}

                    {cancelModalUserCartItem ? (<CancelProductModal
                        userCartItem={cancelModalUserCartItem}
                        show={true}
                        onHide={() => setCancelModalUserCartItem(null)}
                        hideCancelProductButton={() => { setIsCancelProductButtonVisible(Math.random()) }}
                        reasons={reasons}
                        {...props}>
                    </CancelProductModal >) : null}



                    {returnCargoCodeCreated ? (<CreateCargoCodeModal
                        userCartItem={returnCargoCodeCreated}
                        show={true}
                        onHide={() => setReturnCargoCodeCreated(null)}
                        hideCreateCargoButton={() => { setIsCreateCargoCodeButtonVisible(Math.random()) }}
                        cartId={orderId}
                        {...props}>
                    </CreateCargoCodeModal >) : null}
                    <div>
                        <div className="row">
                            <div className="col-12">
                                <Link href={`/hesap/siparis`}>
                                    <a className="d-flex flex-row align-items-baseline justify-content-start">
                                        <i className="fas fa-chevron-left mr-2" style={{ color: '#f1861d' }} />
                                        <p style={{ fontSize: '12px', marginLeft: '8px', color: '#f1861d' }}>Siparişlerime Dön</p>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        {cart?.info && (
                            <div>
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <div className="row d-flex justify-content-between">
                                            <div className="col-12 col-md-2 mb-3 mb-md-0">
                                                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Sipariş No</div>
                                                <div style={{ fontSize: '12px' }}>{`#${cart?.info?.uuid?.substring(0, 8)}`}</div>
                                            </div>
                                            <div className="col-12 col-md-3   mb-3 mb-md-0">
                                                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Sipariş Tarihi</div>
                                                <div style={{ fontSize: '12px' }}>{cart?.info?.dateCreated}</div>
                                            </div>
                                            <div className="col-12 col-md-2   mb-2 mb-md-0">
                                                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>İade</div>
                                                <div style={{ fontSize: '12px' }} className="text-success">{cart?.info?.totalProfit}</div>
                                            </div>
                                            <div className="col-12 col-md-2  mb-2 mb-md-0">
                                                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Kazanç</div>
                                                <div style={{ fontSize: '12px' }} className="text-success">{cart?.info?.totalProfit}</div>
                                            </div>
                                            <div className="col-12 col-md-2  mb-2 mb-md-0">
                                                <div style={{ fontSize: '15px', fontWeight: 'bold' }}>Ödeme</div>
                                                <div style={{ fontSize: '12px' }}>{cart?.info?.subTotal}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {ordersBySeller}


                            </div>
                        )}
                        <div className="row mt-3 no-gutters mx-n2">
                            {renderAddress(shippingAddress, 'Teslimat Adresi')}
                            {renderAddress(invoiceAddress, 'Fatura Adresi')}
                        </div>
                    </div>

                </div>
            </AccountLayout>

        );
    }
    return (<AccountLayout>
        <Spinner />
    </AccountLayout>)
}
