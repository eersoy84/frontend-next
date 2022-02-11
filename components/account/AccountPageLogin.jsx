// react
import React, { Component, useState, useRef, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// application
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import classNames from 'classnames';
import TelegramLoginButton from 'react-telegram-login';
import SimpleReactValidator from 'simple-react-validator';
// data stubs
import theme from '../../data/theme';
import {
    login, loginWithFacebook, loginWithGoogle, loginWithTelegram,
} from '../../store/userAccount/userAccountActions';

import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify';
import Router from 'next/router';

function AccountPageLogin(props) {
    const { loginWithFacebook, loginWithGoogle, loginWithTelegram } = props
    const { isLoading } = useSelector((state) => ({
        isLoading: state.userAccount.isLoading,
    }), shallowEqual);
    const { status } = useSession();
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, forceUpdate] = useState();
    const validator = useRef(null);
    useEffect(() => {
        validator.current = new SimpleReactValidator({
            messages: {
                required: ':attribute boş olamaz(!)',
                email: 'geçersiz :attribute adresi',
                min: ':attribute :min harften az olamaz(!)',
            },
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formValid = validator.current.allValid();
        if (!formValid) {
            validator.current.showMessages();
            forceUpdate(1);
            return;
        }
        const res = await signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: "localhost:3000"
        });
        if (res.error) {
            toast.error("Kullanıcı adınız veya şifreniz hatalı!")
            return
        }
        if (res.ok) {
            toast.success("Bizleal'a başarıyla giriş yaptınız")
            Router.push(res?.url)
        }

        // dispatch(login({ email, password }))
    }

    const responseFacebook = (data) => {
        if (!data.accessToken) {
            console.error('Facebook\'a bağlanırken hata oluştu!', data);
            return;
        }
        dispatch(loginWithFacebook(data));
    }

    const responseGoogle = (data) => {
        if (!(data?.tokenId)) {
            console.error('Google\'a bağlanırken hata oluştu!', data);
            return;
        }
        dispatch(loginWithGoogle(data.tokenId));

    };

    const handleTelegramResponse = (data) => {
        const res = JSON.stringify(data);
        dispatch(loginWithTelegram(res));
    };
    return (
        <>
            <Head>
                <title>{`Giriş Yap — ${theme.name}`}</title>
            </Head>
            <div className="flex-grow-1 mb-0">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {validator?.current?.message('eposta', email, 'required|email', { className: 'payment_credit_card_validation' })}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">Şifre</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}

                            value={password}
                        />
                        {validator?.current?.message('şifre', password, 'required|min:6', { className: 'payment_credit_card_validation' })}
                        <Link href="/hesap/sifre-yenile">
                            <a>
                                <span style={{ color: 'blue' }}>Şifremi Unuttum</span>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={classNames('btn btn-primary btn-lg btn-block'
                                , {
                                    'btn-loading': status === "loading" ?? false,
                                }
                            )
                            }
                        >
                            Giriş Yap
                        </button>
                    </div>

                </form>
                <div className="orDivider">veya</div>

                <div className="row">
                    <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            callback={responseFacebook}
                            disableMobileRedirect
                            isMobile={false}
                            render={(renderProps) => (
                                <button
                                    className="btnFacebook"
                                    onClick={renderProps.onClick}
                                >
                                    <i className="fab fa-facebook-f" style={{ margin: '8px 10px 10px 0px' }} />
                                    Facebook ile giriş
                                </button>
                            )}
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                            render={(renderProps) => (
                                <button
                                    className="btnGoogle"
                                    onClick={renderProps.onClick}
                                >
                                    <i className="fab fa-google" style={{ margin: '8px 10px 10px 0px' }} />
                                    Google ile giriş
                                </button>
                            )}
                        />
                    </div>
                </div>



                <div className="row justify-content-center mt-3">
                    <div className="ml-a mr-a">
                        <TelegramLoginButton requestAccess
                            dataOnauth={handleTelegramResponse} botName="bizlealBot" />
                    </div>
                </div>
            </div>

        </>);
}


export default AccountPageLogin

