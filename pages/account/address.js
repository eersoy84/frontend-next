// react
import { useState, useEffect } from 'react';
import 'react-phone-input-2/lib/style.css';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { deleteAddress } from '../../store/profile/profileActions';
import AddressModal from '../../components/shop/AddressModal';
import addressInfo from '../../helpers/addressInfo';
import AccountLayout from '../../components/account/AccountLayout';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';

function Address() {
    const { address } = useSelector(state => ({
        address: state.profile.address
    }), shallowEqual);
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAddress, setModalAddress] = useState('');
    const [modalHeader, setModalHeader] = useState('');
    const [isBilling, setIsBilling] = useState(false);

    const openModal = (val) => {
        setModalHeader('Yeni Adres Ekle');
        setModalAddress('');
        setIsBilling(val);
        setIsModalOpen(true);
    };

    const editModal = (address) => {
        console.log("edit modal kaç kere")
        setModalHeader('Adres Düzenle');
        setModalAddress(address);
        setIsModalOpen(true);
    };
    const addressList = address?.map(addressItem => addressItem.hidden != 1 &&
        <div key={addressItem.id} className="col-12 col-sm-6 col-md-4 mb-3">
            <div
                className="address-card__body text-center text-sm-left"
                style={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}
            >
                {addressInfo(addressItem, null)}
                <div className="address-card__footer">
                    <button className="btn btn-primary btn-sm" onClick={() => editModal(addressItem, false)}>Düzenle</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => dispatch(deleteAddress(addressItem.id))}>Sil</button>
                </div>
            </div>
        </div>

    );
    console.log("address", address)

    return (
        <AccountLayout>
            {isModalOpen
                ? (
                    <AddressModal
                        show={isModalOpen}
                        onHide={() => setIsModalOpen(false)}
                        modalAddress={modalAddress}
                        header={modalHeader}
                        isBilling={isBilling}
                    />
                )
                : null}
            <div className="card">
                <div className="card-header">
                    <div className="address-info">
                        <h5>Adres Bilgilerim</h5>
                        <div className="new_address_wrapper" onClick={openModal}>
                            <div className="address-list__plus" />
                            <span style={{ fontWeight: 600 }}>Yeni Adres Ekle</span>
                        </div>

                    </div>
                </div>
                <div className="card-divider" />
                <div className="card-body">
                    <div className="row">
                        {addressList}

                    </div>
                </div>

            </div>
        </AccountLayout>
    );
}
export default Address