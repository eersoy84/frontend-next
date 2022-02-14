// react
import React, {
    Fragment, useState, useEffect, useRef,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import axios from 'axios';
import { API_BASE } from '../../config';
import { authHeaderWithSecret } from '../../helpers';
// application
import classNames from 'classnames';
import { toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";
import RatingPoint from '../shared/RatingPoint';


export default function ReviewSellerModal(props) {
    const { show, onHide, adId, sellerValues, hideSellerReviewButton, reviewQuestions, cartId } = props;
    const { sellerId, sellerName, sellerLogo } = sellerValues;
    const [isLoading, setIsLoading] = useState(false);
    const [ratingValues, setRatingValues] = useState({ data: [] });

    const handleSubmit = (event) => {
        event.preventDefault();
        sendEvaluation();
    };
    const resetToInitialValues = () => {
        onHide();
    };

    const sendEvaluation = () => {
        let sellerRatingsValues = {
            sellerId: parseInt(sellerId),
            cartId,
            ratings: ratingValues.data
        }

        setIsLoading(true)
        axios.post(`${API_BASE}/orders/rateSeller`,
            sellerRatingsValues,
            { headers: authHeaderWithSecret() })
            .then(() => {
                toast.info("Değerlendirmeniz başarıyla alındı")
                setIsLoading(false)
                resetToInitialValues();
                hideSellerReviewButton();
            }).catch((err) => {
                setIsLoading(false)
                toast.error(err?.response?.data?.message)
            });
    }

    const getReviewQuestionsStarLength = () => {
        return reviewQuestions && reviewQuestions.filter(item => item.type === "star").length
    }

    const enabled = () => {
        let values = [];
        if (ratingValues.data) {
            values = ratingValues.data.filter(q => typeof (q.value) === 'number')
        }
        return values.length == getReviewQuestionsStarLength() ? true : false;
    }

    const handleQuestionChange = (id, value) => {
        let oldVal = ratingValues.data.find(r => r.id === id)
        if (oldVal) {
            let old2 = ratingValues.data.filter(q => q.id !== id);
            setRatingValues({
                data: [...old2, { id, value }],
            })
        } else {
            setRatingValues({
                data: [...ratingValues.data, { id, value }],
            })
        }
    }
    const result = reviewQuestions && reviewQuestions.map((item, index) => {
        if (item.type === "star") {
            return (
                <div className="row" key={index}>
                    <div className="col-12">
                        <div className="form-group">
                            <label htmlFor="checkout-phone">{item.prompt}</label>
                            <ReactStars
                                onChange={(value) => handleQuestionChange(item.id, value)}
                                size={40}
                                activeColor="#f1861d"
                            />
                        </div>
                    </div>
                </div>

            )
        } else if (item.type === "text") {
            return (<div className="row" key={index}>
                <div className="col-12">
                    <div className="form-group">
                        <label htmlFor="checkout-phone">{item.prompt}</label>
                        <textarea
                            name="comment"
                            type="text"
                            className="form-control"
                            onChange={(e) => handleQuestionChange(item.id, e.target.value)}
                            placeholder='Yorumunuzu buraya yazabilirsiniz.'
                            rows={6}
                            maxLength={200}
                        />
                    </div>
                </div>
            </div>)
        }
        else return null;
    });
    return (
        <Modal isOpen={show} centered unmountOnClose>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">Satıcıyı Değerlendir</h5>
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
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-4">
                                    <div className="cart-table__column--image">
                                        <img src={sellerLogo} alt="" />
                                    </div>
                                </div>
                                <div className="col-8 d-flex flex-column justify-content-center align-items-start">
                                    <div style={{ fontSize: '14px', color: '#4d8ee1' }}>{sellerName}</div>
                                    <RatingPoint value={8.9} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {result}
                    <span style={{ fontSize: '12px', color: 'red' }}>
                        Lütfen yorumunuzun genel ahlak kurallarına aykırı, müstehcen, siyasi veya yasal olmayan içerik <b style={{ textDecoration: 'underline' }}>bulundurmadığına</b>
                        {' '}
                        dikkat ediniz!
                        {' '}
                    </span>
                </ModalBody>
                <ModalFooter>
                    <div className="d-grid">

                        <button
                            type="submit"
                            className={classNames('btn btn-primary', {
                                'btn-loading': isLoading,
                            })}
                            style={{ borderRadius: '5px' }}
                            disabled={!enabled()}
                        >
                            Satıcıyı Değerlendir
                        </button>
                    </div>
                </ModalFooter>
            </form>
        </Modal>

    );
}
