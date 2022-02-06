import Head from 'next/head';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../../store/userAccount/userAccountActions';
import theme from '../../data/theme';
import 'react-phone-input-2/lib/style.css';
import SimpleReactValidator from 'simple-react-validator';
import AccountLayout from '../../components/account/AccountLayout';

class AccountPageProfile extends Component {
    constructor(props) {
        super(props);
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'text-danger',
            messages: {
                required: ':attribute alanı boş olamaz(!)',
                min: ':attribute :min harften az olamaz(!)',
            },
        });
        this.state = {
            firstName: '',
            lastName: '',
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        let { name, value } = e.target;
        value = value.replace(/[^A-Za-zğüşiöçı\s]/gi, '');
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formValid = this.validator.allValid();
        if (!formValid) {
            this.validator.showMessages();
            return;
        }
        this.props.editProfile(this.state.firstName, this.state.lastName);
    }

    render() {
        const user = JSON.parse(localStorage?.getItem('user'));
        const { firstName, lastName, phone } = this.state;
        // const isEnabled = (firstName.length > 0 && lastName.length > 0);
        return (
            <AccountLayout>

                <div className="card">
                    <Head>
                        <title>{`Profili Düzenle — ${theme.name}`}</title>
                    </Head>

                    <div className="card-header">
                        <h5>Profili Düzenle</h5>
                    </div>
                    <div className="card-divider" />
                    <div className="card-body">
                        <div className="row no-gutters">
                            <div className="col-12 col-lg-7 col-xl-6">

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="first_name">İsim</label>
                                        <input
                                            name="firstName"
                                            type="text"
                                            className="form-control"
                                            value={this.state.firstName}
                                            // placeholder={user.firstName}
                                            onChange={this.handleChange}
                                            maxLength={50}
                                        />
                                        {this.validator.message('isim', firstName, 'required|min:2', { className: 'payment_credit_card_validation' })}


                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="last_name">Soyisim</label>
                                        <input
                                            name="lastName"
                                            type="text"
                                            className="form-control"
                                            value={this.state.lastName}
                                            // placeholder={user.lastName}
                                            onChange={this.handleChange}
                                            maxLength={50}
                                        />
                                        {this.validator.message('soyisim', lastName, 'required|min:2', { className: 'payment_credit_card_validation' })}
                                    </div>
                                    <div className="form-group mt-5 mb-0">
                                        <button type="submit"
                                            className="btn btn-primary btn-block"
                                        // disabled={!isEnabled}
                                        >Kaydet</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </AccountLayout>
        );
    }
}
const mapStateToProps = (state) => ({
    isLoggedIn: state.userAccount.loggedIn,
});
const mapDispatchToProps = {
    editProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPageProfile);
