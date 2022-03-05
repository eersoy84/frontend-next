// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
// application
import Slider from 'react-slick';
import ProductCardSlider from '../shared/ProductCardSlider';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <FaChevronRight {...props} className={"slick-next slick-arrow"} />
);
const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <FaChevronLeft {...props} className={"slick-prev slick-arrow"} />
);

const hotAdsSlideSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />
};

const BizlealHotAdsSlider = ({ loading, adList, rows }) => {

    const productsColumns = () => {
        const columns = [];
        let slicedList = [];
        if (rows > 0) {
            slicedList = (adList && adList.length > 0) && adList.slice();

            while (slicedList && slicedList.length > 0) {
                columns.push(slicedList.splice(0, rows));
            }
        }

        return columns;
    }

    const blockClasses = classNames('home_hot_ads_list', {
        'block-products-carousel--loading': loading,
    });

    const columns = productsColumns().map((column, index) => {
        const products = column.map((product) => (
            <div
                key={product.adId}
                className="block-products-carousel__cell"
            >
                <ProductCardSlider product={product} />
            </div>
        ));

        return (
            <div key={index} className="block-products-carousel__column">
                {products}
            </div>
        );
    });
    return (
        <div className={blockClasses}>
            <Slider {...hotAdsSlideSettings}>
                {columns}
            </Slider>
        </div>
    );
}

BizlealHotAdsSlider.propTypes = {
    title: PropTypes.string.isRequired,
    layout: PropTypes.oneOf(['grid-1']),
    rows: PropTypes.number,
    products: PropTypes.array,
    groups: PropTypes.array,
    withSidebar: PropTypes.bool,
    loading: PropTypes.bool,
    onGroupClick: PropTypes.func,
};

BizlealHotAdsSlider.defaultProps = {
    layout: 'grid-1',
    rows: 1,
    products: [],
    groups: [],
    withSidebar: false,
    loading: false,
    onGroupClick: undefined,
};

export default BizlealHotAdsSlider;
