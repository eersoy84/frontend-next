import Head from 'next/head'

// data stubs

import { toast } from 'react-toastify';

import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changePassword } from '../../store/userAccount/userAccountActions';
import theme from '../../data/theme';
import AccountLayout from '../../components/account/AccountLayout';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false),
  );
  return valid;
};
class AccountPagePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
      newPasswordConfirm: '',
      errors: {
        newPassword: '',
        newPasswordConfirm: '',
      },
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors, newPassword, newPasswordConfirm } = this.state;

    if (name === 'newPassword') {
      if (value.length < 6) {
        errors.newPassword = 'Yeni şifre en az 6 karakterli olmalı!';
      } else if (newPasswordConfirm != '' && value != newPasswordConfirm) {
        errors.newPassword = 'Şifre Uyumsuz';
      } else {
        errors.newPassword = '';
        errors.newPasswordConfirm = '';
      }
    } else if (value != newPassword) {
      errors.newPasswordConfirm = 'Şifre uyumsuz!';
    } else {
      errors.newPasswordConfirm = '';
      errors.newPassword = '';
    }

    this.setState(
      {
        errors,
        [name]: value,
      },
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { errors, newPassword } = this.state;
    if (this.IsEmpty()) {
      return;
    }
    if (validateForm(errors)) {
      this.props.changePassword(newPassword);
    } else {
      return toast.error('Formu Eksik yada Hatalı Doldurdunuz!');
    }
  }

  IsEmpty = () => {
    const { newPassword, newPasswordConfirm } = this.state;
    if (!newPassword && !newPasswordConfirm) {
      this.setState(
        {
          ...this.state,
          errors: {
            newPassword: '(!) gerekli alanlar',
            newPasswordConfirm: '(!) gerekli alan',
          },
        },
      );
      return true;
    }
    return false;
  }

  render() {
    const { isLoading } = this.props;
    const { errors, newPassword, newPasswordConfirm } = this.state;
    const isEnabled = (newPassword && newPassword.length > 0)
      && (newPasswordConfirm && newPasswordConfirm.length > 0)
      && (errors.newPassword.length === 0 && errors.newPasswordConfirm.length === 0);

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
      <AccountLayout>

        <div className="card">
          <Head>
            <title>{`Şifre Değiştir — ${theme.name}`}</title>
          </Head>

          <div className="card-header">
            <h5>Şifre Değiştir</h5>
          </div>
          <div className="card-divider" />
          <div className="card-body">
            <div className="row no-gutters">
              <div className="col-12 col-lg-7 col-xl-6">

                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="newPassword">Yeni Şifre</label>
                    <input
                      name="newPassword"
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={this.handleChange}
                    />
                    {errors.newPassword.length > 0
                      && <span className="error" style={mystyle}>{errors.newPassword}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPasswordConfirm">Yeni Şifre (Tekrar)</label>
                    <input
                      name="newPasswordConfirm"
                      type="password"
                      className="form-control"
                      value={newPasswordConfirm}
                      onChange={this.handleChange}
                    />
                    {errors.newPasswordConfirm.length > 0
                      && <span className="error" style={mystyle}>{errors.newPasswordConfirm}</span>}
                  </div>

                  <div className="form-group mt-5 mb-0">
                    <button
                      type="submit"
                      className={classNames('btn btn-primary btn-block', {
                        'btn-loading': isLoading,
                      })}
                      disabled={!isEnabled}
                      onClick={this.handleSubmit}
                    >
                      Kaydet
                    </button>
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
  isLoading: state.userAccount.isLoading,
});
const mapDispatchToProps = {
  changePassword,
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountPagePassword);
