// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import {
  Fi24Hours48Svg,
  FiFreeDelivery48Svg,
  FiPaymentSecurity48Svg,
  FiTag48Svg,
} from '../../svg';

export default function BlockFeatures(props) {
  const { layout } = props;

  return (
    <div className={`block block-features block-features--layout--${layout}`}>
      <div className="container">
        <div className="block-features__list">
          <div className="block-features__item">
            <div className="block-features__icon">
              <FiFreeDelivery48Svg />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Güvenilir</div>
              <div className="block-features__subtitle">Güçlü firmaların desteği</div>
            </div>
          </div>
          <div className="block-features__divider" />
          <div className="block-features__item">
            <div className="block-features__icon">
              <Fi24Hours48Svg />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Anında Destek</div>
              <div className="block-features__subtitle">7/24 açık çağrı merkezi</div>
            </div>
          </div>
          <div className="block-features__divider" />
          <div className="block-features__item">
            <div className="block-features__icon">
              <FiPaymentSecurity48Svg />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Ödeme Garanti</div>
              <div className="block-features__subtitle">Geri ödeme garantisi</div>
            </div>
          </div>
          <div className="block-features__divider" />
          <div className="block-features__item">
            <div className="block-features__icon">
              <FiTag48Svg />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Kesintisiz Erişim</div>
              <div className="block-features__subtitle">Güçlü altyapı, hızlı erişim</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BlockFeatures.propTypes = {
  layout: PropTypes.oneOf(['classic', 'boxed']),
};

BlockFeatures.defaultProps = {
  layout: 'classic',
};
