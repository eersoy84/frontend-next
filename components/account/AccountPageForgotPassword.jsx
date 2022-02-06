// react
import React, { Component } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import PageHeader from '../shared/PageHeader';
import { Check9x7Svg } from '../../svg';

// data stubs
import theme from '../../data/theme';
import { forgotPassword } from '../../store/userAccount/userAccountActions';

const breadcrumb = [
  { title: 'Home', url: '' },
  { title: 'Şifre Yenileme', url: '' },
];
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false),
  );
  return valid;
};

class AccountPageForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      errors: {
        email: '',
      },
    };
  }

    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      const { errors } = this.state;

      switch (name) {
        case 'email':
          errors.email = validEmailRegex.test(value)
            ? ''
            : 'Geçersiz e-posta adresi!';
          break;
        default:
          break;
      }

      this.setState({ errors, [name]: value }, () => {
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      if (this.IsEmpty()) {
        return;
      }
      if (validateForm(this.state.errors)) {
        this.props.forgotPassword(this.state.email);
      } else {
        return toast.info('Formu Eksik yada Hatalı Doldurdunuz!');
      }
    }

    IsEmpty = () => {
      const { email, password } = this.state;
      if (!email && !password) {
        this.setState(
          {
            ...this.state,
            errors: {
              email: '(!) gerekli alan',
            },
          },
        );
        return true;
      }
      return false;
    }

    render() {
      const { errors } = this.state;
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
      const forgotPasswordStyle = {
        color: 'blue',
      };
      return (
        <>
          <Helmet>
            <title>{`Şifre Yenileme — ${theme.name}`}</title>
          </Helmet>
          <div className="page-header" style={headerStyle}>
            <div className="page-header__container container">
              <div className="page-header__title-center">
                <h1>Şifre Yenileme</h1>
              </div>
            </div>
          </div>

          <div className="block">
            <div className="container">
              <div className="row">
                <div className="col-md-3" />
                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      {/* <h3 className="card-title">Üye Girişi</h3> */}
                      <form onSubmit={this.handleSubmit} noValidate>
                          <div className="form-group">
                              <label htmlFor="email">E-posta</label>
                              <input
                                  type="email"
                                  name="email"
                                  className="form-control"

                                  onChange={this.handleChange}
                                  noValidate
                                />
                              {errors.email.length > 0
                                                    && <span className="error" style={mystyle}>{errors.email}</span>}
                            </div>
                          <div style={{
                              display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'stretch',
                            }}
                            >
                              <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                  Giriş
                                                </button>
                            </div>

                        </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userAccount.loggedIn,
});
const mapDispatchToProps = {
  forgotPassword,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPageForgotPassword);
