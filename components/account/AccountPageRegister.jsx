// react
import React, { Component } from 'react';

import Head from 'next/head'
import Link from 'next/link'
// application

// data stubs
import { connect } from 'react-redux';
// import { login, register } from '../../store/hesap/accountActions';
import _ from 'lodash';
import { toast } from 'react-toastify';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import classNames from 'classnames';
import SimpleReactValidator from 'simple-react-validator';
import {
    login, register, loginWithFacebook, loginWithGoogle,
} from '../../store/userAccount/userAccountActions';
import theme from '../../data/theme';
import PageHeader from '../shared/PageHeader';

const breadcrumb = [
    { title: 'Home', url: '' },
    { title: 'My Account', url: '' },
];

class AccountPageRegister extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'text-danger',
            messages: {
                required: ':attribute boş olamaz(!)',
                email: 'geçersiz :attribute adresi',
                min: ':attribute :min harften az olamaz(!)',
                max: ':attribute :max harften fazla olamaz(!)',
            },
        });
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }

    handleTextChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        value = value.replace(/[^A-Za-zğüşiöçı\s]/gi, '');
        this.setState({ [name]: value });
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formValid = this.validator.allValid();
        if (!formValid) {
            this.validator.showMessages();
            return;
        }
        this.props.register(this.state);
    }

    responseFacebook = (data) => {
        if (!data.accessToken) {
            console.error('Facebook\'a bağlanırken hata oluştu!', data);
            return;
        }
        this.props.loginWithFacebook(data);
    }
    responseGoogle = (data) => {
        if (!(data?.tokenId)) {
            console.error('Google\'a bağlanırken hata oluştu!', data);
            return;
        }
        this.props.loginWithGoogle(data.tokenId);
    };
    render() {
        const {
            firstName, lastName, email, password,
        } = this.state;
        const { isLoading } = this.props;
        const mystyle = {
            color: 'red',
            padding: '5px',
            fontFamily: 'Arial',
            fontSize: 13,
        };
        const headerStyle = {
            marginBottom: 10,
            marginTop: 20,
        };
        return (
            <>
                <Head>
                    <title>{`Üye ol — ${theme.name}`}</title>
                </Head>
                <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="firstName">İsim</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={firstName}
                                    onChange={this.handleTextChange}
                                    maxLength={50}
                                />
                                {this.validator.message('isim', firstName, 'required|min:2|max:50', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="lastName">Soyisim</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={this.handleTextChange}
                                    maxLength={50}
                                />
                                {this.validator.message('soy isim', lastName, 'required|min:2|max:50', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">E-posta</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={email}
                            maxLength={100}
                            onChange={this.handleChange}
                            noValidate
                        />
                        {this.validator.message('eposta', email, 'required|email', { className: 'payment_credit_card_validation' })}
                    </div>

                    <div className="form-group">
                        <label htmlFor="register-password">Şifre</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={this.handleChange}
                            value={password}
                            maxLength={50}
                        />
                        {this.validator.message('şifre', password, 'required|min:6|max:50', { className: 'payment_credit_card_validation' })}
                    </div>
                    {/* <div className="form-group">
                                                <label htmlFor="confirm_password">Şifre (Tekrar)</label>
                                                <input
                                                    name="confirm_password"
                                                    type="password"
                                                    placeholder="dsds"
                                                    className="form-control"
                                                    disabled={(password === null ? true : false) || (errors.password.length > 0 ? true : false)}

                                                    onChange={this.handleChange}
                                                />
                                                {errors.confirm_password.length > 0 &&
                                                    <span className='error' style={mystyle}>{errors.confirm_password}</span>}
                                            </div> */}
                    <button
                        type="submit"
                        className={classNames('btn btn-primary btn-lg btn-block'
                        // , {
                        //     'btn-loading': isLoading,
                        // }
                        )}
                    >
                        Üye ol
                    </button>
                    <div className="orDivider">veya</div>

                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <FacebookLogin
                                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                                callback={this.responseFacebook}
                                disableMobileRedirect
                                isMobile={false}
                                render={(renderProps) => (
                                    <button
                                        className="btnFacebook"
                                        onClick={renderProps.onClick}
                                    >
                                        <i className="fab fa-facebook-f" style={{ margin: '8px 10px 10px 0px' }} />
                                        Facebook ile üyelik
                                    </button>
                                )}
                            />

                        </div>
                        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy="single_host_origin"
                                render={(renderProps) => (
                                    <button
                                        className="btnGoogle"
                                        onClick={renderProps.onClick}
                                    >
                                        <i className="fab fa-google" style={{ margin: '8px 10px 10px 0px' }} />
                                        Google ile üyelik
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                </form>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.userAccount.isLoading,
});
const mapDispatchToProps = {
    login,
    register,
    loginWithFacebook,
    loginWithGoogle,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPageRegister);
