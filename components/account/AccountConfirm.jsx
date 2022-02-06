import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { loginConfirm } from '../../store/userAccount/userAccountActions';

export class AccountConfirm extends Component {
    componentDidMount = () => {
      const queryString = require('query-string');

      const parsed = queryString.parse(this.props.location.search);
      const { token, change } = parsed;
      console.log(token);

      if (token && change) {
        this.props.loginConfirm(token, true);
      }
      if (token) {
        this.props.loginConfirm(token, false);
      }
    }

    render = () => {
      const myStyle = {
        color: 'black',
        padding: '10px 40px 10px 40px',
        fontSize: '25',
        backgroundColor: '#1DE1BC',
        display: 'inline-block',
        borderRadius: '5px',
      };
      return (
        <div className="block">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="alert alert-warning mb-3">
                  <div>
                    <h5>
                      E-posta hesabınıza gönderdiğimiz
                      <span style={myStyle}>Onay</span>
                      {' '}
                      butonuna tıklayarak sisteme giriş yapabilirsiniz! Keyifli alışverişler
                    </h5>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      );
    }
}

const mapDispatchToProps = {
  loginConfirm,
};
export default connect(null, mapDispatchToProps)(AccountConfirm);
