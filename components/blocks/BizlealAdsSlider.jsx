// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import { connect } from 'react-redux';
import Slider from 'react-slick';
import SliderHeader from '../shared/SliderHeader';
import ProductCardSlider from '../shared/ProductCardSlider';
import ProductListSlider from '../shared/ProductListSlider';
import StroykaSlick from '../shared/StroykaSlick';
// import { ArrowRoundedLeft8x13Svg, ArrowRoundedRight8x13Svg } from '../../svg';

function BizlealAdsSlider(props) {
  const {
    layout,
    gridLayout,
    title,
    numOfSlidesToShow,
    loading,
  } = props;

  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  };

  const adsSlideSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoPlay: true,
    speed: 200,
    slidesToShow: numOfSlidesToShow,
    slidesToScroll: numOfSlidesToShow,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 479,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevArrow className={gridLayout} />,
    nextArrow: <NextArrow className={gridLayout} />,
  };

  const productsColumns = () => {
    const columns = [];
    const { rows, list } = props;
    let slicedList = [];
    if (rows > 0) {
      slicedList = (list && list.length > 0) && list.slice();
      while (slicedList && slicedList.length > 0) {
        columns.push(slicedList.splice(0, rows));
      }
    }
    return columns;
  };
  const columns = productsColumns().map((column, index) => {
    const products = column.map((product) => (
      <div key={product.adId}>
        <ProductListSlider product={product} />
      </div>
    ));

    return (
      <div key={index}>
        {products}
      </div>
    );
  });

  return (
    <>
      <div className={gridLayout}>
        <SliderHeader title={title} />
        <Slider {...adsSlideSettings}>
          {columns}
        </Slider>
      </div>
    </>
  );
}

BizlealAdsSlider.propTypes = {
  title: PropTypes.string.isRequired,
  layout: PropTypes.oneOf(['grid-1']),
  rows: PropTypes.number,
  products: PropTypes.array,
  groups: PropTypes.array,
  withSidebar: PropTypes.bool,
  loading: PropTypes.bool,
  onGroupClick: PropTypes.func,
};

BizlealAdsSlider.defaultProps = {
  layout: 'grid-1',
  rows: 1,
  products: [],
  groups: [],
  withSidebar: false,
  loading: false,
  onGroupClick: undefined,
};
const mapStateToProps = (state) => ({
  adList: state.ad.adList,
  numOfOrders: state.order.numOfOrders,
  favorites: state.userAccount.favorites,
  instantAdsInfo: state.ad.instantAdsInfo,

});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BizlealAdsSlider);
