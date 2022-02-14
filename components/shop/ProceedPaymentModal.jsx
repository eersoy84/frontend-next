// react
import React from 'react';

import {
    Modal, ModalBody, ModalFooter,
} from 'reactstrap';
import classNames from 'classnames';

export default function ProceedPaymentModal(props) {
    const {
        show, onHide, onYes
    } = props;
    const handleYes = () => {
        onYes();
        onHide();
    }
    const handleNo = () => {
        onHide();
    }
    return (
        <Modal isOpen={show} centered unmountOnClose>
            <div className="modal-header">
                <h5 className="modal-title">Siparişi Onayla</h5>
                <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={handleNo}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <ModalBody>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center mx-3">
                        <span style={{ fontSize: '15px', }}>Ödeme Sayfasına Yönlendirileceksiniz.</span>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center mx-3 my-3">
                        <span style={{ color: 'green', fontSize: '15px', }}>Devam etmek istiyor musunuz?</span>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <div className="d-grid">

                    <button
                        type="submit"
                        className={classNames('btn btn-primary')}
                        onClick={handleYes}
                        style={{ borderRadius: '3px' }}
                    >
                        Evet
                    </button>
                </div>
                <div className="d-grid">

                    <button
                        type="submit"
                        className={classNames('btn btn-secondary')}
                        onClick={handleNo}
                        style={{ borderRadius: '3px' }}
                    >
                        Hayır
                    </button>
                </div>


            </ModalFooter>

        </Modal>

    );
}
