// react
import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import NumberFormat from "react-number-format";
import axios from "axios";
import { API_BASE } from "../../config";
import { authHeaderWithSecret } from "../../helpers";
// application
import classNames from "classnames";
import PhoneInput from "react-phone-input-2";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import CountDownWrapper from "../shared/CountDownWrapper";

export default function SmsConfirmationModal(props) {
  const { show, onHide } = props;
  const [, forceUpdate] = useState();
  const [confirmationCode, setConfirmationCode] = useState();
  const [phone, setPhone] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isConfirmPending, setIsConfirmPending] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [smsRef, setSmsRef] = useState("");
  const [smsSecret, setSmsSecret] = useState("");
  const [codeLen, setCodeLen] = useState(6);
  const [phoneError, setPhoneError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [errorCounter, setErrorCounter] = useState(0);
  const [countdownDate, setCountdownDate] = useState(0);
  const validator = useRef(null);
  useEffect(() => {
    validator.current = new SimpleReactValidator({
      messages: {
        required: ":attribute boş olamaz(!)",
        max: ":attribute :max karakterden fazla olamaz(!)",
        min: "lütfen telefon numaranızı eksiksiz giriniz(!)",
      },
      validators: {
        phone_validation: {
          message: "Bu alan sadece harf içermelidir (!)",
          rule: (value) => {
            if (/[^A-Za-zğüşiöçıİ\s]/gi.test(value)) return false;
            return true;
          },
        },
      },
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formValid = validator.current.allValid();
    if (!formValid) {
      validator.current.showMessages();
      forceUpdate(1);
      return;
    }
    clearState();
    requestConfirmationCode();
  };

  const resetToInitialValues = () => {
    onHide();
  };

  const requestConfirmationCode = () => {
    setIsSent(true);
    let date = Date.now();
    setCountdownDate(date);
    axios
      .post(
        `${API_BASE}/user/addPhone`,
        { phone: phone.substr(2, 12) },
        { headers: authHeaderWithSecret() }
      )
      .then((data) => {
        setIsSent(false);
        if (data) {
          setSmsRef(data.ref);
          setSmsSecret(data.secret);
          setIsConfirmationVisible(true);
        }
      })
      .catch((err) => {
        setIsSent(false);
        setPhoneError(err.data.data.failed);
      });
  };

  const handleConfirmationCode = (e) => {
    setConfirmationCode(e.value);
  };
  const confirmCode = (event) => {
    event.preventDefault();
    const formValid = validator.current.allValid();
    if (!formValid) {
      validator.current.showMessages();
      forceUpdate(1);
      return;
    }
    setIsConfirmPending(true);
    axios
      .post(
        `${API_BASE}/user/otp`,
        {
          ref: smsRef,
          secret: smsSecret,
          otp: confirmationCode,
        },
        { headers: authHeaderWithSecret() }
      )
      .then((data) => {
        setIsConfirmPending(false);
        if (data) {
          toast.info("Onay İşleminiz Başarılı");
          onHide();
        }
      })
      .catch((err) => {
        setConfirmationError(err.data.data.failed);
        setErrorCounter(errorCounter + 1);
        setIsConfirmPending(false);
        if (errorCounter > 3) {
          clearState();
        }
      });
  };
  const isEnabled = confirmationCode && confirmationCode.length >= 6;
  const mystyle = {
    color: "red",
    padding: "5px",
    fontFamily: "Arial",
    fontSize: 12,
  };
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      setConfirmationError("");
      clearState();
      return sendAgain();
    } else {
      return (
        <div className="countdown_container">
          {minutes !== 0 ? (
            <div className="countdown-item">
              {minutes === 0 ? 0 : minutes}
              <span>dakika</span>
            </div>
          ) : null}

          {seconds !== 0 ? (
            <div className="countdown-item">
              {seconds === 0 ? 0 : seconds}
              <span>saniye</span>
            </div>
          ) : null}
        </div>
      );
    }
  };

  const sendAgain = () => {
    return (
      <span
        className="add_new_address"
        onClick={() => setIsConfirmationVisible(false)}
        style={{ fontWeight: 500 }}
      >
        <i className="fa fa-refresh mr-2" />
        Tekrar Gönder
      </span>
    );
  };
  const clearState = () => {
    setErrorCounter(0);
    setConfirmationError("");
    setConfirmationCode("");
  };

  return (
    <Modal isOpen={show} centered unmountOnClose>
      {isConfirmationVisible ? (
        <form onSubmit={confirmCode}>
          <div className="modal-header">
            <h5 className="modal-title">Onay</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={resetToInitialValues}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <div className="form-group">
                  <span style={{ color: "green", fontSize: "12px" }}>
                    Lütfen Cep Telefonunuza Gönderilen Onay Kodunu Giriniz!
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <div className="form-group">
                  <label htmlFor="confirmationCode">Doğrulama Kodu*</label>
                  <NumberFormat
                    name="confirmationCode"
                    className="form-control input_form"
                    inputMode="text"
                    onValueChange={handleConfirmationCode}
                    value={confirmationCode}
                    placeholder={"__    __    __    __    __    __"}
                    format="#      #      #      #      #      #"
                    mask="__"
                  />
                  <span className="error" style={mystyle}>
                    {confirmationError}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                {errorCounter > 3 ? (
                  sendAgain()
                ) : (
                  <Countdown
                    date={countdownDate + 180000}
                    renderer={renderer}
                  />
                )}
              </div>
            </div>
          </ModalBody>
          {errorCounter > 3 ? null : (
            <ModalFooter>
              <div className="d-grid">
                <button
                  type="submit"
                  className={classNames("btn btn-primary", {
                    "btn-loading": isConfirmPending,
                  })}
                  style={{ borderRadius: "5px" }}
                  disabled={!isEnabled}
                >
                  Onayla
                </button>
              </div>
            </ModalFooter>
          )}
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Sms Doğrulama</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={resetToInitialValues}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-12 d-flex justify-content-center mb-4">
                <span style={{ color: "green", fontSize: "12px" }}>
                  Devam edebilmeniz için tek sefere mahsus{" "}
                  <b>&quot;Sms Doğrulama&quot;</b>işlemi yapmalısınız!
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <div className="form-group">
                  <label htmlFor="checkout-phone">Telefon*</label>
                  <PhoneInput
                    country="tr"
                    onlyCountries={["tr"]}
                    value={phone}
                    onChange={(phone) => setPhone(phone)}
                    countryCodeEditable={false}
                    disableDropdown
                    className="form-control"
                    inputStyle={{
                      width: "100%",
                    }}
                    maxLength={20}
                  />
                  {validator.current?.message(
                    "numaranız",
                    phone,
                    "required|min:12|max:20",
                    { className: "payment_credit_card_validation" }
                  )}
                  <span className="error" style={mystyle}>
                    {phoneError}
                  </span>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="d-grid">
              <button
                type="submit"
                className={classNames("btn btn-primary", {
                  "btn-loading": isSent,
                })}
                style={{ borderRadius: "5px" }}
              >
                Gönder
              </button>
            </div>
          </ModalFooter>
        </form>
      )}
    </Modal>
  );
}
