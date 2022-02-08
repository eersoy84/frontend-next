// react
import {
    Fragment, useState, useEffect, useRef,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import NumberFormat from 'react-number-format';

// application
import CreatableSelect from 'react-select/creatable';
import classNames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import SimpleReactValidator from 'simple-react-validator';
import { editAddress } from '../../store/profile/profileActions';
import 'react-phone-input-2/lib/style.css';
import cities from '../../data/iller';
import districts from '../../data/ilceler';

export default function AddressModal(props) {
    const { show, onHide, modalAddress, header, isBilling } = props;
    const [, forceUpdate] = useState();
    const dispatch = useDispatch();

    const validator = useRef(null);
    useEffect(() => {
        validator.current = new SimpleReactValidator({
            messages: {
                required: ':attribute boş olamaz(!)',
                max: ':attribute :max karakterden fazla olamaz(!)',
                min: 'lütfen telefon numaranızı eksiksiz giriniz(!)',
            },
            validators: {
                name_validation: {
                    message: 'Bu alan sadece harf içermelidir (!)',
                    rule: (value) => {
                        if (/[^A-Za-zğüşiöçıİ\s]/gi.test(value)) return false;
                        return true;
                    },
                },
            },
        });
    }, []);

    const initialValues = {
        id: 0,
        firstName: '',
        lastName: '',
        companyName: '',
        taxOffice: '',
        taxNumber: '',
        town: '',
        addressText: '',
        addressTitle: '',
        phone: '',
        isCorporate: 0,
    };

    const [values, setValues] = useState(initialValues);
    const [selectedCity, setSelectedCity] = useState('İl seçiniz');
    const [selectedDistrict, setSelectedDistrict] = useState('İlçe seçiniz');
    const [filteredDistricts, setFilteredDisctricts] = useState([]);

    useEffect(() => {
        setValues({
            firstName: modalAddress && modalAddress.firstName,
            lastName: modalAddress && modalAddress.lastName,
            town: modalAddress && modalAddress.town,
            addressText: modalAddress && modalAddress.addressText,
            addressTitle: modalAddress && modalAddress.addressTitle,
            phone: modalAddress && modalAddress.phone,
            id: modalAddress && modalAddress.id,
            isCorporate: modalAddress && modalAddress.isCorporate,
            companyName: modalAddress && modalAddress.companyName,
            taxOffice: modalAddress && modalAddress.taxOffice,
            taxNumber: modalAddress && modalAddress.taxNumber,
        });
        setSelectedCity({ id: '0', name: modalAddress.city });
        setSelectedDistrict({ id: '0', name: modalAddress.district });
    }, []);

    const {
        id, firstName, lastName, town, phone, addressText, addressTitle, isCorporate, companyName, taxOffice, taxNumber,
    } = values;
    const handleChange = (e) => {
        e.preventDefault();
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleTextChange = (e) => {
        let { name, value } = e.target;
        value = value.replace(/[^A-Za-zİğüşiöçı\s]/gi, '');
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formValid = validator.current.allValid();
        if (!formValid) {
            validator.current.showMessages();
            forceUpdate(1);
            return;
        }
        const uploadAddress = {
            id: (id || 0),
            addressTitle,
            firstName,
            lastName,
            town,
            phone,
            addressText,
            city: selectedCity.name,
            district: selectedDistrict.name,
            isCorporate: isCorporate || 0,
            companyName: companyName || '',
            taxOffice: taxOffice || '',
            taxNumber: taxNumber || '',
            isDefault: 0,
            country: 'Türkiye',
        };
        dispatch(editAddress(uploadAddress));
        resetToInitialValues();
    };

    const resetToInitialValues = () => {
        setValues(initialValues);
        setSelectedCity('İl seçiniz...');
        setSelectedDistrict('İlçe seçiniz...');
        onHide();
    };
    const filterOption = (candidate, input) => {
        return candidate.data.__isNew__ || candidate.label.toLocaleUpperCase("tr").includes(input.toLocaleUpperCase("tr"));
    };
    const cityList = () => (
        <div className="form-group">
            <label htmlFor="cities">İl*</label>
            <CreatableSelect
                name="cities"
                value={selectedCity}
                filterOption={filterOption}
                getOptionValue={(v) => v.id}
                getOptionLabel={(v) => v.name}
                onChange={handleCityChange}
                options={cities}
                placeholder="İl seçiniz..."
            />
            {validator.current?.message('il', selectedCity.name, 'required', { className: 'payment_credit_card_validation' })}
        </div>
    );

    const handleCityChange = (newValue) => {
        setSelectedCity(newValue);
        filterDistricts(newValue.id);
    };
    const filterDistricts = (id) => {
        const districtsFiltered = districts.filter((q) => q.city_id === id);
        setFilteredDisctricts(districtsFiltered);
        setSelectedDistrict('');
    };
    const districtList = () => (
        <div className="form-group">
            <label htmlFor="districts">İlçe*</label>
            <CreatableSelect
                name="districts"
                value={selectedDistrict}
                filterOption={filterOption}
                getOptionValue={(v) => v.id}
                getOptionLabel={(v) => v.name}
                onChange={handleDistrictChange}
                options={filteredDistricts}
                placeholder="İlçe seçiniz..."
            />
            {validator.current?.message('ilçe', selectedDistrict.name, 'required', { className: 'payment_credit_card_validation' })}
        </div>
    );
    const handleDistrictChange = (newValue) => {
        setSelectedDistrict(newValue);
    };
    const handleRadioButton = (e) => {
        if (e.target.name === 'corporate') {
            setValues({ ...values, isCorporate: 1 });
        } else {
            setValues({ ...values, isCorporate: 0 });
        }
    };

    const adressFormat = 'Cadde/Sokak: Apartmant/Daire: Posta Kodu:';

    return (
        <Modal isOpen={show} centered unmountOnClose animation={"false"}>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h5 className="modal-title">{header}</h5>
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
                    {isBilling && (
                        <div className="row">
                            <div className="col-4">
                                <div className="form-group">
                                    <label htmlFor="billType">Fatura</label>
                                </div>
                            </div>
                            <div className="col-4 p-0 px-sm-3">
                                <div className="form-group">
                                    <span className="filter-list__input input-radio">
                                        <span className="input-radio__body">
                                            <input
                                                className="input-radio__input"
                                                type="radio"
                                                name="individual"
                                                value={isCorporate}
                                                checked={isCorporate !== 1}
                                                onChange={handleRadioButton}
                                            />
                                            <span className="input-radio__circle" />
                                        </span>
                                    </span>
                                    <span className="filter-list__title">Bireysel</span>
                                </div>
                            </div>
                            <div className="col-4 p-0 px-sm-3">
                                <div className="form-group">
                                    <span className="filter-list__input input-radio">
                                        <span className="input-radio__body">
                                            <input
                                                className="input-radio__input"
                                                type="radio"
                                                name="corporate"
                                                value={isCorporate}
                                                checked={isCorporate === 1}
                                                onChange={handleRadioButton}
                                            />
                                            <span className="input-radio__circle" />
                                        </span>
                                    </span>
                                    <span className="filter-list__title">Kurumsal</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isCorporate === 1
                        && (
                            <div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="companyName">Firma Adı*</label>
                                            <input
                                                name="companyName"
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={companyName}
                                                maxLength={100}
                                            />
                                            {isCorporate === 1 && validator.current?.message('firma adı', companyName, 'required|max:100', { className: 'payment_credit_card_validation' })}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="taxOffice">Vergi Dairesi*</label>
                                            <input
                                                name="taxOffice"
                                                type="text"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={taxOffice}
                                                maxLength={100}

                                            />
                                            {isCorporate === 1 && validator.current?.message('vergi dairesi', taxOffice, 'required|max:100', { className: 'payment_credit_card_validation' })}
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="form-group">
                                            <label htmlFor="taxNumber">Vergi Numarası*</label>
                                            <NumberFormat
                                                name="taxNumber"
                                                className="form-control"
                                                inputMode="text"
                                                onChange={handleChange}
                                                value={taxNumber}
                                                maxLength={50}

                                            />
                                            {isCorporate === 1 && validator.current?.message('vergi numarası', taxNumber, 'required|max:50', { className: 'payment_credit_card_validation' })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="firstName">Alıcı Ad*</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    className="form-control"
                                    onChange={handleTextChange}
                                    value={firstName}
                                    maxLength={50}
                                />
                                {validator.current?.message('isim', firstName, 'required|max:50|name_validation', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="lastName">Alıcı Soyad*</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    className="form-control"
                                    onChange={handleTextChange}
                                    value={lastName}
                                    maxLength={50}

                                />
                                {validator.current?.message('soy isim', lastName, 'required|max:50|name_validation', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            {cityList()}
                        </div>
                        <div className="col-6">
                            {districtList()}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">

                            <div className="form-group">
                                <label htmlFor="town">Mahalle*</label>
                                <input
                                    name="town"
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={town}
                                    maxLength={80}
                                />
                                {validator.current?.message('mahalle', town, 'required|max:80', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                        <div className="col-6">

                            <div className="form-group">
                                <label htmlFor="checkout-phone">Telefon*</label>
                                <PhoneInput
                                    country="tr"
                                    onlyCountries={['tr']}
                                    value={phone}
                                    onChange={(phone) => setValues({ ...values, phone })}
                                    countryCodeEditable={false}
                                    disableDropdown
                                    className="form-control"
                                    inputStyle={{
                                        width: '100%',
                                    }}
                                    maxLength={20}

                                />
                                {validator.current?.message('cep numaranızı', phone, 'required|min:12|max:20', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-12">

                            <div className="form-group">
                                <label htmlFor="addressText">Cadde/Sokak/Apt No:</label>
                                <input
                                    type="text"
                                    name="addressText"
                                    placeholder={adressFormat}
                                    value={addressText}
                                    className="form-control"
                                    onChange={handleChange}
                                    maxLength={100}

                                />
                                {validator.current?.message('adres alanı', addressText, 'required|max:100', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">

                            <div className="form-group">
                                <label htmlFor="addressTitle">Adres Başlığı*</label>
                                <input
                                    name="addressTitle"
                                    type="text"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={addressTitle}
                                    maxLength={20}
                                />
                                {validator.current?.message('adres başlığı', addressTitle, 'required|max:20', { className: 'payment_credit_card_validation' })}
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button
                        type="submit"
                        className={classNames('btn btn-primary btn-block', {
                            'btn-loading': false,
                        })}
                        style={{ borderRadius: '5px' }}
                        // disabled={!isEnabled}
                        onClick={handleSubmit}
                    >
                        Kaydet
                    </button>
                </ModalFooter>
            </form>

        </Modal>
    );
}
