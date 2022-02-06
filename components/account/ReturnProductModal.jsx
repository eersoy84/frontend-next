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
import Select from 'react-select'


export default function ReturnProductModal(props) {
    const { userCartItem, show, onHide, hideReturnProductButton, reasons } = props;
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedReturnAmount, setSelectedReturnAmount] = useState(0);
    const [reasonId, setReasonId] = useState('');
    const dispatch = useDispatch();
    const { id } = userCartItem

    const handleSubmit = (event) => {
        event.preventDefault();
        sendEvaluation();
    };
    const resetToInitialValues = () => {
        setNotes('')
        onHide();
    };

    const handleChange = (e) => {
        e.preventDefault();
        setNotes(e.target.value);
    };
    const sendEvaluation = () => {
        setIsLoading(true)
        axios.post(`${API_BASE}/orders/cancelProduct`,
            { id, returnAmount: selectedReturnAmount > 0 ? selectedReturnAmount : 1, reasonId, notes },
            { headers: authHeaderWithSecret() })
            .then((data) => {
                if (data) {
                    toast.info("Ürün iade talebiniz başarıyla alındı")
                    setIsLoading(false);
                    resetToInitialValues();
                    hideReturnProductButton();
                }
            }).catch((err) => {
                toast.error("Ürün iade talebi oluştururken hata oluştu!")
                setIsLoading(false)
            });
    }


    const handleAmountChange = ({ value }) => {
        setSelectedReturnAmount(value)
    }
    const handleReasonChange = ({ value }) => {
        setReasonId(value)
    }

    const options = []
    reasons && reasons.filter(item => {
        if (item.formtype === "return" || item.formtype === "both") {
            let obj = { value: item.id, label: item.reasonText }
            options.push(obj)
        }
    });

    let amountArray = [];
    for (let i = 1; i <= userCartItem?.returnableAmount; i++) {
        let obj = { value: i, label: i }
        amountArray.push(obj)
    }

    const thousandSeperator = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const enabled = (reasonId > 0 && (selectedReturnAmount > 0 || userCartItem?.returnableAmount === 1) && notes.length > 0)

    return (
        <Modal isOpen={show} centered unmountOnClose>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">Kolay İade</h5>
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
                                <label hstyle={{ fontSize: '15px', fontWeight: 'bolder' }}>Neden iade etmek istiyorsunuz</label>
                                <Select options={options}
                                    placeholder="İade sebebinizi giriniz..."
                                    onChange={handleReasonChange}
                                />
                            </div>
                        </div>
                    </div>
                    {userCartItem.returnableAmount > 1 ?
                        (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label style={{ fontSize: '15px' }}>Kaç Adet Ürünü İptal Etmek İstiyorsunuz</label>
                                            <Select
                                                options={amountArray}
                                                onChange={handleAmountChange}
                                                placeholder="İptal edeceğiniz ürün adedini giriniz..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {selectedReturnAmount > 0 && <div className="col-12">
                                    <div className="form-group">
                                        <label style={{ fontSize: '15px' }}>Kartınıza İade Edilecek Tutar:&nbsp;&nbsp;
                                            <span style={{ fontSize: '15px', color: 'green', fontWeight: 'bold' }}>
                                                {thousandSeperator((selectedReturnAmount * parseFloat(userCartItem.product.normalPriceInt)) + '.00 ₺')}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                }
                            </div>
                        )
                        :
                        (<div className="col-12">
                            <div className="form-group">
                                <label style={{ fontSize: '15px' }}>Kartınıza İade Edilecek Tutar:&nbsp;&nbsp;
                                    <span style={{ fontSize: '15px', color: 'green', fontWeight: 'bold' }}>
                                        {thousandSeperator((parseFloat(userCartItem.product.normalPriceInt)) + '.00 ₺')}
                                    </span>
                                </label>
                            </div>
                        </div>)
                    }

                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <textarea
                                    name="notes"
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    placeholder='Satıcıya iletmek istediğiniz herhangi bir not var mı?'
                                    value={notes}
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
                    <button
                        type="submit"
                        className={classNames('btn btn-primary btn-block', {
                            'btn-loading': isLoading,
                        })}
                        style={{ borderRadius: '5px' }}
                        disabled={!enabled}
                    >
                        Ürünü İade Et
                    </button>
                </ModalFooter>
            </form>
        </Modal>

    );
}
