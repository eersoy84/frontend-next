// react
import React, { Fragment, useState, useEffect,useRef, } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import SimpleReactValidator from 'simple-react-validator';

// third-party
import { Helmet } from 'react-helmet-async';

// application
import PageHeader from '../shared/PageHeader';

// data stubs
import theme from '../../data/theme';

function ShopPageTrackOrder() {
    const breadcrumb = [
        { title: 'Anasayfa', url: '' },
        { title: 'Sipariş Takip', url: '' },
    ];

    const validator = useRef(null);
    useEffect(() => {
      validator.current = new SimpleReactValidator({
        messages: {
          required: ':attribute boş olamaz(!)',
          min: 'sipariş numaranız 8 haneli olmalıdır',
        },
      });
    }, []);
  const [, forceUpdate] = useState();
    const [cartId, setCartId] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formValid = validator.current.allValid();
        if (!formValid) {
          validator.current.showMessages();
          forceUpdate(1);
          return;
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setCartId(e.target.value)
    }
    return (
        <>
            <Helmet>
                <title>{`Sipariş Takip — ${theme.name}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8">
                            <div className="card flex-grow-1 mb-0 mt-lg-4 mt-md-3 mt-2">
                                <div className="card-body">
                                    <div className="card-title text-center"><h1 className="pt-lg-0 pt-2">Sipariş Takip</h1></div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="track-order-id">Sipariş No:</label>
                                            <input
                                                type="text"
                                                name="cartId"
                                                className="form-control"
                                                value={cartId}
                                                onChange={handleChange}
                                            />
                                            {validator.current?.message('sipariş numarası', cartId, 'required|min:8', { className: 'payment_credit_card_validation' })}
                                        </div>
                                        <div className="pt-3 d-grid">
                                            <button
                                                type="submit"
                                                className="btn btn-primary btn-lg">Sorgula
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShopPageTrackOrder;
