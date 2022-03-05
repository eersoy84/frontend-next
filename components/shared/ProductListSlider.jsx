// react
import React, { useState, useEffect } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import {
  FacebookShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import Countdown from "react-countdown";
import moment from "moment";
import FlipNumbers from "react-flip-numbers";
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import Rating from "./Rating";
import { cartUpdate } from "../../store/cart";
import {
  Compare16Svg,
  Quickview16Svg,
  Cart16Svg,
  Wishlist16Svg,
  Heart20Svg,
  RedBliningHeart,
} from "../../svg";
import { quickviewOpen } from "../../store/quickview";
import { wishlistAddItem } from "../../store/wishlist";
import { disableAdById } from "../../store/ad";

import CheckButtonCondition from "./CheckButtonCondition";
// import Countdown from './Countdown'
import "moment/locale/tr";
import FollowButton from "./FollowButton";
import CountDownWrapper from "./CountDownWrapper";

function ProductListSlider(props) {
  const { product, favorites, cartUpdate, cart } = props;
  const { info } = cart;
  const cartId = info && info.uuid;
  const adName =
    product &&
    `${product.categoryName} ${product.brandName} ${product.modelName}`;
  const friendlyUrl = adName && adName.replace(/\s+/g, "-").toLowerCase();

  const [updatedParticipants, setUpdatedParticipants] = useState(
    product.participants
  );
  const onAdFollow = (participants) => {
    setUpdatedParticipants(participants);
  };

  let isFollowing = favorites.some((fav) => fav.adId === product.adId);

  const image = product && product.imageUrl;

  let price;
  if (product.instantPrice && product.instantPrice > 0) {
    price = (
      <div className="product-card__prices__home">
        <span className="product-card__old-price">
          <Currency value={product.productPrice} />
        </span>
        <span className="product-card__new-price">
          <Currency value={product.instantPrice} />
        </span>
        <AsyncAction
          action={() => cartUpdate(cartId, product.adId, 1)}
          render={({ run, loading }) => (
            <button
              style={{ whiteSpace: "nowrap" }}
              type="button"
              onClick={run}
              className={classNames(
                "btn btn-primary btn-sm product3d_add_to_cart",
                {
                  "btn-loading": loading,
                }
              )}
            >
              <Cart16Svg /> Sepete Ekle
            </button>
          )}
        />
      </div>
    );
  } else {
    price = (
      <div className="product-card__prices__home">
        <Currency value={parseInt(product.productPrice)} />
        <AsyncAction
          action={() => cartUpdate(cartId, product.adId, 1)}
          render={({ run, loading }) => (
            <button
              style={{ whiteSpace: "nowrap" }}
              type="button"
              onClick={run}
              className={classNames(
                "btn btn-primary btn-sm product3d_add_to_cart",
                {
                  "btn-loading": loading,
                }
              )}
            >
              <Cart16Svg /> Sepete Ekle
            </button>
          )}
        />
      </div>
    );
  }
  const ad_finish_date = moment(product.endDate);
  moment().locale("tr");

  return (
    <div className="product_new_ads_slider_link">
      <div className="product_new_ads_slider_card">
        <Link to={`/ilanlar/${product.adId}?seoUrl=${friendlyUrl}`}>
          <div className="product_new_ads_slider_title">
            {product.brandName} {product.modelName}
          </div>
        </Link>
        <Link to={`/ilanlar/${product.adId}?seoUrl=${friendlyUrl}`}>
          <CountDownWrapper date={ad_finish_date.toDate()} />
        </Link>
        <Link to={`/ilanlar/${product.adId}?seoUrl=${friendlyUrl}`}>
          <div
            className="product_home_card_image"
            style={{ backgroundImage: `url(${image}` }}
          />
        </Link>
        {/* </Link> */}

        {price}
      </div>
    </div>
  );
}

ProductListSlider.propTypes = {
  /**
   * product object
   */
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  favorites: state.userAccount.favorites,
  cart: state.cart,
});

const mapDispatchToProps = {
  cartUpdate,
  wishlistAddItem,
  quickviewOpen,
  disableAdById,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListSlider);
