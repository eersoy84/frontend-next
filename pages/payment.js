import { Fragment, useState, useEffect, useRef, } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import StepWizard from '../../dist/react-step-wizard.min';
import StepWizard from 'react-step-wizard';
import classNames from 'classnames';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import axios from 'axios';
import Head from 'next/head';
import AddressCollapse from '../components/shop/AddressCollapse';
import { API_BASE } from '../config';
import { authHeaderWithSecret } from '../helpers';
import ToolTip from '../components/shared/ToolTip';
import theme from '../data/theme';
import SmsConfirmationModal from '../components/shop/SmsConfirmationModal';
import ProceedPaymentModal from '../components/shop/ProceedPaymentModal';
import { useSession } from 'next-auth/react';
import { ArrowRoundedRight8x13Svg, InfoIcon, Check9x7Svg } from '../svg'
import Spinner from '../components/shared/Spinner'

export default function Payment(props) {
    const { address, cart } = useSelector((state) => ({
        address: state.profile.address,
        cart: state.cart,
    }), shallowEqual);

    const { data: session } = useSession()
    const user = session
    const { items, info, taxes } = cart;
    const router = useRouter();
    const checkRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProceedPayment, setIsProceedPayment] = useState(false);


    const [shippingAddressId, setShippingAddressId] = useState(() => {
        if (user) {
            return user ? JSON.parse(localStorage.getItem('selectedShippingAddressId')) : 0
        }
    })
    const [billingAddressId, setBillingAddressId] = useState(() => user ? JSON.parse(localStorage.getItem('selectedBillingAddressId')) : 0)

    const [isSameBillingAddress, setIsSameBillingAddress] = useState(() => user ? JSON.parse(localStorage.getItem('billingAddressCheck')) : 0)

    const [terms, setTerms] = useState(() => user ? JSON.parse(localStorage.getItem('terms')) : false)


    const toggle = () => setDetailOpened(!detailOpened);
    const [detailOpened, setDetailOpened] = useState(false);
    const [errors, setErrors] = useState({
        payment: '',
        terms: '',
    });
    const renderConditions = () => {
        if (!address || address.length === 0) {
            toast.info('Kargonuzun sorunsuz gelmesi için, lütfen adres bilgilerinizi ekleyiniz!');
            return;
        }
        if (isSameBillingAddress) {
            if (shippingAddressId === 0) {
                toast.info('Lütfen teslimat adresi seçiniz!');

                return;
            }
        } else {
            if (shippingAddressId === 0) {
                toast.info('Lütfen teslimat adresi seçiniz!');

                return;
            }
            if (billingAddressId === 0) {
                toast.info('Lütfen fatura adresi seçiniz!');

                return;
            }
        }

        if (!terms) {
            checkRef.current.scrollIntoView();
            setErrors(
                {
                    terms: 'Lütfen üyelik sözleşmesini onaylayınız!',
                },
            );
            return;
        }
        alertForPayment()
        // return renderPayment();
    };
    const alertForPayment = () => {
        setIsProceedPayment(true)
    }
    const renderPayment = () => {
        const userOrders = {
            id: info?.id,
            shippingAddressId,
            billingAddressId: isSameBillingAddress ? shippingAddressId : billingAddressId,
        };
        createPayment(userOrders);
    };

    const createPayment = (userOrders) => {
        axios.post(`${API_BASE}/orders/create`,
            userOrders,
            { headers: authHeaderWithSecret() })
            .then(response => {
                if (response.data) {
                    toast.info('İyzico Güvenli Ödeme Sayfasına Yönlendiriliyorsunuz!');
                    if (window) {
                        window.location.href = response.data.paymentPageUrl;
                    }
                }
                if (response.data.verifySms) {
                    setIsModalOpen(true);
                }
            }).catch(err => {
                toast.error(err?.response?.data?.message)
            });
    };

    const totalBalance = (
        <div className="d-none d-lg-block">
            <div className="row">
                <div className="col-12">
                    <span style={{ fontSize: '13px' }}>ÖDENECEK TUTAR</span>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <span style={{ fontSize: '1.9rem' }}>
                        {cart.info.subTotal}
                    </span>
                </div>
            </div>
        </div>
    );
    const shipping = (
        <div>
            <div className="row my-3">
                <div className="col-4">
                    Kargo
                </div>
                <div className='col-4'>
                    <ToolTip id={'shipping'} text={`Bizleal'da kargo ücretsizdir`} />
                </div>
                <div data-tip data-for="shipping" className="col-4 d-flex justify-content-end align-items-baseline">
                    <span>
                        <Image src={'/icons/info-icon.svg'} width={16} height={16} />
                    </span>
                    <span className="text-success general_font">&nbsp;Bedava</span>
                </div>
            </div>
        </div>
    );



    const renderCart = () => {
        const items = cart.items.map((item) => (
            <div className="row d-flex align-items-center mb-2"
                key={item.adId}
            >
                <div className="col-8">
                    <span style={{ fontSize: '12px' }}>

                        {`${item.product.brandName} ${item.product.modelName}`}
                        {' '}
                        ×
                        {`${item.amount}`}
                    </span>
                </div>
                <div className="col-4 d-flex justify-content-end">
                    <span style={{ fontSize: '12px' }}>
                        {item.totalPrice}
                    </span>
                </div>
            </div>

        ));

        return (
            <div>
                <ToolTip id={'balance'} text={'İlan süresi sonunda, kredi kartınıza iade edilecek fiyat farkı'} />
                <div data-tip data-for="balance"
                    className="row mt-3"
                >
                    <div className="col-6">
                        {/* <span><InfoIcon /></span> */}
                        <Image src={'/icons/info-icon.svg'} width={16} height={16} />
                        <span className="text-success general_font">&nbsp;İade</span>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <span className="text-success">
                            {info.totalProfit}
                            {' '}
                        </span>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-6">
                        Ürünler
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        Toplam
                    </div>
                </div>
                {items}
            </div>

        );
    };
    const handleTermsCheckbox = (event) => {
        if (event.target.checked) {
            setErrors(
                {
                    terms: '',
                },
            );
        }
        setTerms(event.target.checked);
        if (session?.user) {
            localStorage.setItem('terms', event.target.checked);
        }
    };

    const mystyle = {
        color: 'red',
        padding: '5px',
        fontFamily: 'Arial',
        fontSize: 13,
    };
    const handleBillingAddress = (value) => {
        setBillingAddressId(value);
    };

    const handleShippingAddress = (value) => {
        setShippingAddressId(value);
    };

    const handleIsBillingSame = (value) => {
        setIsSameBillingAddress(value);
    };
    const arrowClasses = classNames('fas fa-chevron-up rotate_icon', {
        rotate_icon_active: detailOpened,
    });
    return (
        <>
            <Head>
                <title>{`Ödeme Sayfası — ${theme.name}`}</title>
            </Head>
            {isProceedPayment ?
                <ProceedPaymentModal
                    show={true}
                    onHide={() => setIsProceedPayment(false)}
                    onYes={renderPayment}
                />
                : null}
            {
                isModalOpen ? (<SmsConfirmationModal show={true} onHide={() => setIsModalOpen(false)}>
                    <h1>ansdd</h1>

                </SmsConfirmationModal >) : null
            }
            {user
                ? (
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8">
                                <AddressCollapse
                                    {...props}
                                    hashKey="delivery"
                                    isBillingSame={(value) => handleIsBillingSame(value)}
                                    shippingAddress={(value) => handleShippingAddress(value)}
                                    billingAddress={(value) => handleBillingAddress(value)}
                                />

                            </div>
                            <div ref={checkRef} className="col-12 col-lg-4 mt-5 mt-lg-0">
                                <div className="sticky_top">
                                    <div className="card">
                                        <div className="card-body p-4">
                                            {totalBalance}
                                            {renderCart()}
                                            {shipping}
                                            <div className="form-check mt-5">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input
                                                            className="input-check__input"
                                                            type="checkbox"
                                                            id="checkout-terms"
                                                            checked={terms}
                                                            onChange={handleTermsCheckbox}
                                                        />
                                                        <span className="input-check__box" />
                                                        {/* <Check9x7Svg className="input-check__icon" /> */}
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" style={{ fontSize: '13px' }} htmlFor="checkout-terms">
                                                    <Link href="/site/kosullar"><a>Üyelik</a></Link>
                                                    {' '}
                                                    ve
                                                    {' '}
                                                    <Link href={`/site/sozlesmeler/${shippingAddressId || billingAddressId}`}><a>Mesafeli Satış Sözleşmesi</a></Link>
                                                    {' '}
                                                    şartlarını okudum ve kabul ediyorum*
                                                </label>
                                                {(errors.terms && errors.terms.length > 0)
                                                    && <span className="error" style={mystyle}>{errors.terms}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-none d-lg-grid">
                                        <button
                                            style={{ borderRadius: '10px' }}
                                            type="submit"
                                            className={classNames('btn btn-primary btn-lg mt-3', {
                                                'btn-loading': false,
                                            })}
                                            onClick={() => renderConditions()}
                                        >
                                            <span>
                                                Devam Et
                                            </span>&nbsp;&nbsp;
                                            <span className="ml-3"><ArrowRoundedRight8x13Svg /></span>
                                        </button>
                                    </div>

                                </div>

                                <div className="shop_fixed_all">
                                    <div className="shop_fixed_content d-lg-none">
                                        <div className="container">
                                            <div className="row">
                                                <div
                                                    className="col-6 d-flex justify-content-start"
                                                    onClick={() => toggle()}
                                                >

                                                    <div className="ml-3 d-flex flex-column justify-content-start">
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <span className="text-responsive">ÖDENECEK TUTAR</span>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <span className="currency-responsive">
                                                                    {cart.info.subTotal}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6 d-flex justify-content-end align-items-center d-grid">
                                                    <button
                                                        style={{ borderRadius: '10px' }}
                                                        type="submit"
                                                        className={classNames('btn btn-primary', {
                                                            'btn-loading': false,
                                                        })}

                                                        onClick={() => renderConditions()}
                                                    >
                                                        <span>
                                                            Devam Et
                                                        </span>
                                                        {/* <span className="ml-3"><ArrowRoundedRight8x13Svg /></span> */}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                )
                :
                <div className='d-flex align-items-center'>
                    <Spinner />
                </div>
            }
        </>
    );
};

