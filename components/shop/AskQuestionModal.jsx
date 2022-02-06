// react
import React, {
    Fragment, useState, useEffect, useRef,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import { API_BASE } from '../../config';
import { history, authHeaderWithSecret } from '../../helpers';
// application
import CreatableSelect from 'react-select/creatable';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import SimpleReactValidator from 'simple-react-validator';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Countdown from 'react-countdown';


export default function AskQuestionModal(props) {
    const { show, onHide, adId, sellerId } = props;
    const [question, setQuestion] = useState('');
    const [isSent, setIsSent] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        sendQuestion();
    };

    const resetToInitialValues = () => {
        setQuestion('')
        onHide();
    };

    const handleChange = (e) => {
        e.preventDefault();
        setQuestion(e.target.value);
    };
    const sendQuestion = () => {
        setIsSent(true)
        axios.post(`${API_BASE}/item/askQuestion`,
            { question: question, adId: adId },
            { headers: authHeaderWithSecret() })
            .then((data) => {
                if (data) {
                    toast.info("Sorunuz satıcıya başarıyla iletildi")
                    setIsSent(false);
                    resetToInitialValues();
                }
            }).catch((err) => {
                toast.error("Sorunuz iletilirken hata oluştu")
                setIsSent(false)
            });
    }

    const enabled = (question && question.length > 2);
    const mystyle = {
        color: 'red',
        padding: '5px',
        fontFamily: 'Arial',
        fontSize: 12,
    };

    const clearState = () => {
        setQuestion('');
    }
    return (
        <Modal isOpen={show} centered unmountOnClose>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">Satıcıya Soru Sor</h5>
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
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="checkout-phone">Sorunuz*</label>
                                <textarea
                                    name="question"
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    placeholder="Satıcıya sormak istediğiniz soruyu buraya yazabilirsiniz."
                                    value={question}
                                    rows={6}
                                    maxLength={200}
                                />
                            </div>
                        </div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'red' }}>
                        Lütfen sorunuzun genel ahlak kurallarına aykırı, müstehcen, siyasi veya yasal olmayan içerik <b style={{ textDecoration: 'underline' }}>bulundurmadığına</b>
                        {' '}
                        dikkat ediniz!
                        {' '}
                    </span>
                </ModalBody>
                <ModalFooter>
                    <button
                        type="submit"
                        className={classNames('btn btn-primary btn-block', {
                            'btn-loading': isSent,
                        })}
                        style={{ borderRadius: '5px' }}
                        disabled={!enabled}
                    >
                        Soruyu Gönder
                    </button>
                </ModalFooter>
            </form>
        </Modal>

    );
}
