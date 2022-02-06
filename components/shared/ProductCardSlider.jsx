// react
import { useState, useEffect } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link'

import Countdown from 'react-countdown';
import moment from 'moment';
import Currency from './Currency';
import Rating from './Rating';
import { cartUpdate } from '../../store/cart';
import { quickviewOpen } from '../../store/quickview';
import { wishlistAddItem } from '../../store/wishlist';
import { disableAdById } from '../../store/ad';

import CheckButtonCondition from './CheckButtonCondition';
// import Countdown from './Countdown'
import 'moment/locale/tr';
import FollowButton from './FollowButton';

function ProductCardSlider(props) {
    const {
        product,
        cartUpdate,
        favorites,
    } = props;

    const adName = product && (`${product.categoryName} ${product.brandName} ${product.modelName}`);
    const friendlyUrl = adName && adName.replace(/\s+/g, '-').toLowerCase();

    const [updatedParticipants, setUpdatedParticipants] = useState(product.participants);
    const onAdFollow = (participants) => {
        setUpdatedParticipants(participants);
    };

    let isFollowing = false;
    favorites && favorites.map((fav) => {
        if (fav.adId === product.adId) {
            isFollowing = true;
        }
    });

    const image = product && product.imageUrl;

    let price;
    if (product.instantPrice > 0 && product.instantPrice < product.productPrice) {
        price = (
            <div className="d-flex justify-content-center align-items-baseline mb-2 mb-lg-0">
                <span className="product-card__old-price">
                    <Currency value={product.productPrice} />
                </span>
                &nbsp;&nbsp;
                <span className="product-card__new-price">
                    <Currency value={product.instantPrice} />
                </span>

            </div>
        );
    } else {
        price = (
            <div className="d-flex justify-content-center align-items-baseline mb-2 mb-lg-0">
                <span className="product-card__new-price">
                    <Currency value={product.instantPrice} />
                </span>
            </div>
        );
    }
    const ad_finish_date = moment(product.endDate);
    moment().locale('tr');
    const renderer = ({
        days, hours, minutes, seconds, completed,
    }) => {
        if (completed) {
            return <h3 style={{ color: 'black' }}>İlan Süresi Dolmuştur</h3>;
        }
        return (
            <div>
                <div style={{ display: 'inline-flex' }}>
                    {days !== 0 ? (
                        <div className="countdown-item">
                            {days === 0 ? 0 : days}
                            <span>gün</span>
                        </div>
                    ) : null}
                    {hours !== 0 ? (
                        <div className="countdown-item">
                            {hours === 0 ? 0 : hours}
                            <span>saat</span>
                        </div>
                    ) : null}
                    {minutes !== 0
                        ? (
                            <div className="countdown-item">
                                {minutes === 0 ? 0 : minutes}
                                <span>dakika</span>
                            </div>
                        ) : null}
                    {
                        <div className="countdown-item">
                            {seconds === 0 ? 0 : seconds}
                            <span>saniye</span>
                        </div>
                    }
                </div>
            </div>
        );
    };
    return (
        <Link
            href={`/ilanlar/${product.adId}/${friendlyUrl}`}>
            <a
                className="product_home_grid_slider_link"
                style={{ border: '2px solid #f5f5f5', borderRadius: '10px' }}
            >

                <div className="d-flex flex-column justify-content-center">
                    <div className="mt-2 text-center">
                        <Countdown
                            date={ad_finish_date.toDate()}
                            renderer={renderer}
                        />
                    </div>
                    <div className="product_home_grid_slider_title">
                        {product.brandName}
                        {' '}
                        {product.modelName}
                    </div>
                </div>
                <div className="row d-flex justify-content-center my-5">
                    <div className="col-12 bizleal_product_slider__image">
                        <span style={{ backgroundImage: `url(${product.imageUrl})` }} />
                    </div>
                </div>
                {price}
            </a>
        </Link>
    );
}

ProductCardSlider.propTypes = {
    /**
       * product object
       */
    product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    favorites: state.userAccount.favorites,
    instantAdsInfo: state.ad.instantAdsInfo,
});

const mapDispatchToProps = {
    cartUpdate,
    wishlistAddItem,
    quickviewOpen,
    disableAdById,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductCardSlider);
