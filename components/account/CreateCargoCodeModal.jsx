// react
import React, { Fragment, useState, useEffect, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import axios from 'axios';
import { API_BASE } from '../../config';
import { authHeaderWithSecret } from '../../helpers';
// application
import classNames from 'classnames';
import { toast } from 'react-toastify';
import Select from 'react-select'


export default function CreateCargoCodeModal(props) {
    const { userCartItem, show, onHide, hideCreateCargoButton, cartId } = props;
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [returnAmount, setReturnAmount] = useState(0);
    const [cargoCompany, setCargoCompany] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        sendEvaluation();
    };

    const resetToInitialValues = () => {
        setComment('')
        onHide();
    };

    const handleChange = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    };
    const sendEvaluation = () => {
        setIsLoading(true)
        axios.post(`${API_BASE}/order/cancelProduct`,
            { cartId, cargoCompany, comment },
            { headers: authHeaderWithSecret() })
            .then((data) => {
                if (data) {
                    toast.info("Ürün iade kargo kodunuz başarıyla oluşturulud")
                    setIsLoading(false);
                    resetToInitialValues();
                    hideCreateCargoButton();
                }
            }).catch((err) => {
                toast.error("Ürün iade kodu oluştururken hata oluştu!")
                setIsLoading(false)
                hideCreateCargoButton()
            });
    }



    const handleCargoCompany = ({ label }) => {
        setCargoCompany(label)
    }
    const clearState = () => {
        setComment('');
    }

    const options = [
        { value: 1, label: 'Mng Kargo' },
        { value: 2, label: 'Aras Kargo' },
        { value: 3, label: 'Yurtiçi Kargo' },
    ]
    // reasons && reasons.filter(item => {
    //     if (item.formtype === "cancel" || item.formtype === "both") {
    //         let obj = { value: item.id, label: item.reasonText }
    //         options.push(obj)
    //     }
    // });


    const enabled = (cargoCompany.length > 0)

    return (
        <Modal isOpen={show} centered unmountOnClose>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">Ürün İade Kodu</h5>
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
                                <label hstyle={{ fontSize: '15px', fontWeight: 'bolder' }}>Ürünü Hangi Kargo Şirketi İle İade Etmek İstersiniz</label>
                                <Select options={options}
                                    placeholder="Kargo şirketi seçiniz..."
                                    onChange={handleCargoCompany}
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
                                    placeholder='Satıcıya iletmek istediğiniz herhangi bir not var mı?'
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
                            Ürünü İptal Et
                        </button>
                    </div>
                </ModalFooter>
            </form>
        </Modal>

    );
}
