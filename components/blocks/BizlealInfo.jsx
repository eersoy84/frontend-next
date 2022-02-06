// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import {
  WorldIcon,
  PackageIcon,
  ClockIcon,
  CreditCardIcon,
} from '../../svg';

export default function BizlealInfo(props) {
  const { layout } = props;

  return (
    <div className={`block block-features block-features--layout--${layout}`}>
      <div className="container">
        <div className="block-features__list" style={{ border: 'none' }}>
          <div className="block-features__item">
            <div className="block-features__icon">
              <WorldIcon />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Bizleal nasıl çalışır?</div>
              <div className="block-features__subtitle">
                <p>
                  Bizleal, bir ortak satın alma platformudur.
                  Üyeler, ortak ihtiyaçları doğrultusunda, çok uygun
                  fiyatlardan satın alma yapabilirler.
                </p>
              </div>
            </div>
          </div>
          {/* <div className="block-features__divider" style={{backgroundColor:"#ffffff"}}  /> */}

          <div className="block-features__item">
            <div className="block-features__icon">
              <PackageIcon />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Bizleal&apos;ın diğer e-ticaret sitelerinden ne farkı var?</div>
              <div className="block-features__subtitle">
                <p>
                  Sıradan e-ticaret sitelerinde ürünler teker teker satılır. Bizleal ise bir e-ticaret sitesi değildir. Bizleal, bir ortak satın alma platformudur. Üyeler, hep birlikte toplu şekilde
                  satın alma yaparak en uygun fiyatları yakalarlar.
                </p>
              </div>
            </div>
          </div>

        </div>
        <br />
        <div className="block-features__list" style={{ border: 'none' }}>

          <div className="block-features__item">
            <div className="block-features__icon">
              <ClockIcon />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Ürünlerdeki sayaç nedir?</div>
              <div className="block-features__subtitle">
                <p>
                  Bizleal&apos;da ürünler ilanlar şeklinde yayınlanır. İlan, bitiş tarihine kadar yayında kalır. Sayaç, son ilan bitimine kalan süreyi gösterir.
                </p>
              </div>
            </div>
          </div>
          <br />
          {/* <div className="block-features__divider" style={{backgroundColor:"#ffffff"}} /> */}
          <div className="block-features__item">
            <div className="block-features__icon">
              <CreditCardIcon />
            </div>
            <div className="block-features__content">
              <div className="block-features__title">Fiyatlar neder düşük?</div>
              <div className="block-features__subtitle">
                <p>
                  Bizleal&apos;da toptancılar, ürünlerini, onlarca, yüzlerce müşteriye toptan fiyatına doğrudan satar. Dolayısla, herhangi bir aracı olmadığı çok daha indirimli fiyatlara satın alma gerçekleştirmek mümkündür.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BizlealInfo.propTypes = {
  layout: PropTypes.oneOf(['classic', 'boxed']),
};

BizlealInfo.defaultProps = {
  layout: 'classic',
};
