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


export default function ReviewProductModal(props) {
    const { userCartItem, show, onHide, hideReviewProductButton, cartId } = props;
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        sendEvaluation();
    };
    const resetToInitialValues = () => {
        setComment('')
        onHide();
    };


    const handleQuestionChange = (value) => {
        setRating(value)
    }
    const handleChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    };
    const sendEvaluation = () => {
        setIsLoading(true)
        axios.post(`${API_BASE}/orders/rateItem`,
            { cartId, rating, comment, adId: userCartItem.adId },
            { headers: authHeaderWithSecret() })
            .then((data) => {
                if (data) {
                    toast.info("Ürün değerlendirme talebiniz başarıyla alındı")
                    setIsLoading(false);
                    resetToInitialValues();
                    hideReviewProductButton();
                }
            }).catch((err) => {
                toast.error("Ürün değerlendirme talebi oluştururken hata oluştu!")
                setIsLoading(false)
            });
    }


    const enabled = (rating && rating > 0)


    return (
        <Modal isOpen={show} centered unmountOnClose>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">Ürünü Değerlendir</h5>
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
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-4">
                                    <div className="cart-table__column--image">
                                        <img src={userCartItem.product.imageUrl} alt="" />
                                    </div>
                                </div>
                                <div className="col-8 d-flex flex-column justify-content-center align-items-start">
                                    <span style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                        {userCartItem.product.brandName}
                                    </span>
                                    <span style={{ fontSize: '12px' }}>
                                        {userCartItem.product.modelName}
                                    </span>
                                    <span style={{ fontSize: '12px' }}>
                                        <span style={{ fontWeight: 'bold' }}>Satın Alınan Adet:</span>&nbsp;{userCartItem.amount}
                                    </span>
                                    <div style={{ fontSize: '12px' }}>
                                        <span style={{ fontWeight: 'bold' }}>Toplam:</span>&nbsp;{userCartItem.totalPrice}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <label htmlFor="checkout-phone">Ürün kalitesinden memnun kaldınız mı?</label>
                                <ReactStars
                                    onChange={(value) => handleQuestionChange(value)}
                                    size={40}
                                    activeColor="#f1861d"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <textarea
                                    name="comment"
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    placeholder='Ürün hakkında yapmak istediğiniz herhangi bir yorum var mı?'
                                    value={comment}
                                    rows={6}
                                    maxLength={200}
                                />
                            </div>
                        </div>
                    </div>
                    <span style={{ fontSize: '12px', color: 'red' }}>
                        Lütfen notunuzun genel ahlak kurallarına aykırı, müstehcen, siyasi veya yasal olmayan içerik <b style={{ textDecoration: 'underline' }}>bulundurmadığına</b>
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
                            disabled={!enabled}
                        >
                            Ürünü Değerlendir
                        </button>
                    </div>

                </ModalFooter>
            </form>
        </Modal>

    );
}
