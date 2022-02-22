import AccountLayout from '../../components/account/AccountLayout';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, } from 'react-redux';
import Head from 'next/head';
import { editProfile } from '../../store/userAccount/userAccountActions';
import theme from '../../data/theme';
import SimpleReactValidator from 'simple-react-validator';

const Profile = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const dispatch = useDispatch();
    const [, forceUpdate] = useState();

    const validator = useRef(null);
    useEffect(() => {
        validator.current = new SimpleReactValidator({
            messages: {
                required: ':attribute boş olamaz(!)',
                min: ':attribute :min harften az olamaz(!)',
            },
        });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formValid = validator.current.allValid();
        if (!formValid) {
            validator.current.showMessages();
            forceUpdate(1);
            return;
        }
        dispatch(editProfile(firstName, lastName))
    }

    return (
        <AccountLayout>
            <div className="card">
                <Head>
                    <title>{`Profili Düzenle — ${theme.name}`}</title>
                </Head>

                <div className="card-header">
                    <h5>Profili Düzenle</h5>
                </div>
                <div className="card-divider" />
                <div className="card-body">
                    <div className="row no-gutters">
                        <div className="col-12 col-lg-7 col-xl-6">

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="first_name">İsim</label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}

                                        maxLength={50}
                                    />
                                    {validator?.current?.message('isim', firstName, 'required|min:2', { className: 'payment_credit_card_validation' })}


                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Soyisim</label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        maxLength={50}
                                    />
                                    {validator?.current?.message('soy isim', lastName, 'required|min:2', { className: 'payment_credit_card_validation' })}

                                </div>
                                <div className="form-group mt-5 mb-0 d-grid">
                                    <button type="submit"
                                        className="btn btn-primary"
                                    >Kaydet</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </AccountLayout>);
}

export default Profile;