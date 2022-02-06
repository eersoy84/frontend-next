// react
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

// third-party
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link, Redirect } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Cards from 'react-credit-cards';
import NumberFormat from 'react-number-format';
import SimpleReactValidator from 'simple-react-validator';
import { Collapse, CardBody, Card } from 'reactstrap';
import theme from '../../data/theme';

import { API_BASE } from '../../config';

function ShopPagePayment(props) {
  const { renderPayment, buttonRef } = props;

  const [, forceUpdate] = useState();
  const [bin, setBin] = useState('');
  const [binResponse, setBinResponse] = useState(null);

  useEffect(() => {
    if (bin.length == 6) {
      console.log('BIN', bin);
      fetch(`https://cdn.mekatro.tech/bizlealstore/bins/${bin}.json`).then((data) => data.json()).then((data) => {
        setBinResponse(data);
      }).catch((err) => {
      });
    } else {
      setBinResponse(null);
    }
  }, [bin]);
  // const validator = useRef(new SimpleReactValidator())
  const validator = useRef(new SimpleReactValidator({
    className: 'text-danger',
    messages: {
      required: ':attribute girin(!)',
      alpha_space: 'isim soyisim alanı sadece harf içermelidir (!)',
      card_exp: ':attribute bugünün tarihinden önce olamaz(!)',
    },
    validators: {
      card_validation: { // name the rule
        message: 'girdiğiniz :attribute geçerli değil (!)', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: (value) => {
          // accept only digits, dashes or spaces
          if (/[^0-9-\s]+/.test(value)) return false;

          // The Luhn Algorithm. It's so pretty.
          let nCheck = 0; var nDigit = 0; let
            bEven = false;
          value = value.replace(/\D/g, '');

          for (let n = value.length - 1; n >= 0; n--) {
            const cDigit = value.charAt(n);
            var nDigit = parseInt(cDigit, 10);

            if (bEven) {
              if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
          }
          const result = (nCheck % 10) == 0;
          return result;
        },
      },
      name_validation: { // name the rule
        message: 'Bu alan sadece harf içermelidir (!)', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: (value) => {
          if (/[^A-Za-zğüşiöçı\s]/gi.test(value)) return false;
          return true;
        },
      },
    },
  }));

  const [values, setValues] = useState({
    number: '',
    expiry: '',
    cvc: '',
    focus: '',
    name: '',
  });

  useEffect(() => {
    const val = values.number.replace(/[^0-9]/g, '').substring(0, 6);
    setBin(val);
    console.log(bin);
  }, [values.number]);

  const handleInputFocus = (e) => {
    setValues({ ...values, focus: e.target.name });
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleTextChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^A-Za-zğüşiöç\s]/gi, '');
    setValues({ ...values, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValid = validator.current.allValid();
    if (!formValid) {
      validator.current.showMessages();
      forceUpdate(1);
      return;
    }
    if (!checkPayment(values)) {
      toast.error('Kredi kartınızda yeterli bakiye bulunmamaktadır(!),siz önce az yiyin de para biriktirin!');
      return;
    }
    const cardInfo = {
      number: values.number,
      name: values.name,
      expiry: values.expiry,
      cvc: values.cvc,
    };
    renderPayment(cardInfo);
  };
  const calculateCardExpiry = (val) => {
    let month = limit(val.substring(0, 2), '12');
    const thisYear = new Date().getFullYear().toString();
    const thisMonth = new Date().getMonth().toString();
    let year = val.substring(2, 4);
    if (year.length === 1) {
      year = thisYear.substring(2, 3);
    } else if (year.length === 2) {
      if (Number(year.substring(0, 1)) !== Number(year)) {
        year = `2${year.substring(1, 2)}`;
      } if (Number(year.substring(1)) < Number(thisYear.substring(3))) {
        year = `2${thisYear.substring(3)}`;
      }
      if (Number(year) === Number(thisYear.substring(2, 4))) {
        if (Number(month) < Number(thisMonth) + 1) {
          if (thisMonth.length < 2) month = `0${Number(thisMonth) + 1}`;
          else {
            month = `${Number(thisMonth) + 1}`;
          }
        }
      }
    }

    return month + (year.length ? `/${year}` : '');
  };
  function limit(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = `0${val}`;
    }

    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';
      } else if (val > max) {
        val = max;
      }
    }

    return val;
  }

  const checkPayment = (form) => {
    if (!form) {
      return false;
    }
    return true;
  };

  const {
    cvc, expiry, focus, name, number,
  } = values;

  return (
    <>
      <Helmet>
        <title>{`Sipariş Onay — ${theme.name}`}</title>
      </Helmet>
      <form onSubmit={handleSubmit}>
        <button
          ref={buttonRef}
          type="submit"
          style={{ display: 'none' }}
        />
        <Card style={{ borderRadius: '10px' }}>
          <CardBody>

            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <div className="row">
                  <div className="col">
                      <div className="form-group">
                          <label htmlFor="number" style={{ fontSize: '13px' }}>Kart numarası</label>
                          <NumberFormat
                              name="number"
                              className="form-control input_form"
                              inputMode="text"
                              onChange={handleOnChange}
                              onFocus={(e) => handleInputFocus(e)}
                              value={number}
                              format="#### #### #### ####"
                              allowEmptyFormatting
                              mask="•"
                              onBlur={() => validator.current.showMessageFor('bok_gibi')}
                            />
                          {validator.current.message('kart numaranızı', number, 'required|card_validation', { className: 'payment_credit_card_validation' })}
                        </div>
                    </div>
                </div>

                <div className="row">
                  <div className="col">
                      <div className="form-group">
                          <label htmlFor="name" style={{ fontSize: '13px' }}>Kart üzerindeki isim</label>
                          <input
                              type="text"
                              name="name"
                              className="form-control input_form"
                              id="comment-first-name"
                              value={name}
                              onFocus={(e) => handleInputFocus(e)}
                                                // onChange={handleOnChange}
                              onChange={handleTextChange}
                              placeholder="Kart sahibinin adı ve soyadı"
                              onBlur={() => validator.current.showMessageFor('name')}
                            />
                          {validator.current.message('Adınızı', name, 'required|name_validation', { className: 'payment_credit_card_validation' })}
                        </div>
                    </div>
                </div>

                <div className="row">
                  <div className="col-12 col-sm-6">
                      <div className="form-group">
                          <label htmlFor="name" style={{ fontSize: '13px' }}>Son kullanma tarihi</label>
                          <NumberFormat
                              name="expiry"
                              className="form-control input_form"
                              onChange={handleOnChange}
                              onFocus={(e) => handleInputFocus(e)}
                              value={expiry}
                                                // format="##/##"
                              placeholder="Ay/Yıl"
                              format={calculateCardExpiry}
                              allowEmptyFormatting
                              mask="•"
                              onBlur={() => validator.current.showMessageFor('expiry')}
                            />
                          {validator.current.message('son kullanma tarihini', expiry, 'required|card_exp', { className: 'payment_credit_card_validation' })}

                        </div>
                    </div>

                  <div className="col-12 col-sm-6">
                      <div className="form-group">
                          <label htmlFor="name" style={{ fontSize: '13px' }}>Güvenlik kodu</label>
                          <NumberFormat
                              name="cvc"
                              className="form-control input_form"
                              onFocus={(e) => handleInputFocus(e)}
                              value={cvc}
                              onChange={handleOnChange}
                              format="####"
                              placeholder="cvv/cvc"
                              onBlur={() => validator.current.showMessageFor('cvc')}
                            />
                          {validator.current.message('güvenlik kodunu', cvc, 'required', { className: 'payment_credit_card_validation' })}
                        </div>
                    </div>
                </div>

              </div>
              <div
                className="col-12 col-md-6 ml-n3 ml-sm-0"
                style={{
                  '--bank-image': (
                    binResponse ? `url(${binResponse.image})` : ''
                  ),
                }}
              >

                <Cards
                  cvc={cvc}
                  expiry={expiry}
                  focused={focus}
                  name={name}
                  number={number}
                  preview={false}
                  placeholders={{ name: 'Ad Soyad' }}
                />

              </div>
            </div>
          </CardBody>

        </Card>

      </form>

    </>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.order.isLoading,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopPagePayment);
