// react
import React, { Component, useEffect } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// application
// import departmentsAria from '../../services/departmentsArea';
import languages from '../../i18n';
import StroykaSlick from '../shared/StroykaSlick';

const slickSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,
};
function BlockSlideShow() {

  const blockClasses = classNames(
    'home_slideshow',
    'block-slideshow block',
    'block-slideshow--layout--full',
  );

  const slides = [
    {
      id: 1,
      title: "Türkiye'nin <span style=\"color: white;font-size:25px; background-color:#f1861E;display:inline-block;padding: 1px 5px; border-radius:5px\">Ortak Satın Alma</span><br />Platformu",
      text: '<p>Ortak ihtiyaçlarınız için, organize olun...</p>',
      image_desktop: 'png/banner-shop.png',
      image_mobile: 'png/banner-shop-mobile.png',
    },
    {
      id: 2,
      title: 'Doğrudan Üreticiden <span style="color: white;font-size:20px; background-color:#f1861E;display:inline-block;padding: 1px 5px; border-radius:5px">Ortak Satın Alma</span> Yapabilirsiniz',
      text: '<p>Aynı toptancı gibi, birleşerek en uygun fiyatlara satın alma yapabilirsiniz...</p>',
      image_desktop: 'png/group-buy.png',
      image_mobile: 'png/group-buy-mobile.png',
    },
    {
      id: 3,
      title: 'Büyük Firmaların <span style="color: white;font-size:20px; background-color:#f1861E;display:inline-block;padding: 1px 5px; border-radius:5px">Satın Alma Gücüne</span> Ulaşabilirsiniz',
      text: '<p>Son kullanıcılar olarak, güçlerinizi birleştirip, büyük firmalar karşısında daha güçlü olabilirsiiniz...</p>',
      image_desktop: 'png/little-fish.png',
      image_mobile: 'png/little-fish-mobile.png',
    },
  ];
  const slidesFunction = slides.map((slide) => {
    return (
      <div key={slide.id} className="block-slideshow__slide">
        <div
          className="block-slideshow__slide-image block-slideshow__slide-image--desktop"
          style={{
            backgroundImage: `url(${slide.image_desktop})`,
          }}
        />
        <div
          className="block-slideshow__slide-image block-slideshow__slide-image--mobile"
          style={{
            backgroundImage: `url(${slide.image_mobile})`,
          }}
        />
        <div className="block-slideshow__slide-content">
          <div
            className="block-slideshow__slide-title"
            dangerouslySetInnerHTML={{ __html: slide.title }}
          />
          <div
            className="block-slideshow__slide-text"
            dangerouslySetInnerHTML={{ __html: slide.text }}
          />
        </div>
      </div>
    );
  });

  let media;
  useEffect(() => {
    media = window && window.matchMedia('(min-width: 992px)');

  }, [])

  return (
    <div className={blockClasses} data-layout="grid-1">
      <div className="block-slideshow__body">
        <StroykaSlick {...slickSettings}>
          {slidesFunction}
        </StroykaSlick>
      </div>
    </div>
  );
}


BlockSlideShow.propTypes = {
  withDepartments: PropTypes.bool,
  /** current locale */
  locale: PropTypes.string,
};

BlockSlideShow.defaultProps = {
  withDepartments: false,
};

const mapStateToProps = (state) => ({
  locale: state.locale,
  projectPhotos: state.photo.projectPhotos,
});

export default connect(mapStateToProps)(BlockSlideShow);
