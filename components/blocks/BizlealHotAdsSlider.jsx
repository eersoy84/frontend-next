// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import { connect } from 'react-redux';
import Slider from 'react-slick';
import ProductCardSlider from '../shared/ProductCardSlider';

function PrevArrow(props) {
    const { className, onClick } = props;

    return (
        <div
            className={className}
            onClick={onClick}
        />
    );
}

function NextArrow(props) {
    const { className, style, onClick } = props;

    return (
        <div
            className={className}
            onClick={onClick}
        />
    );
}

const hotAdsSlideSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 200,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow className="home_hot_ads_list" />,
    nextArrow: <NextArrow className="home_hot_ads_list" />,
};

class BizlealHotAdsSlider extends Component {
    handleNextClick = () => {
        if (this.slickRef) {
            this.slickRef.slickNext();
        }
    };

    handlePrevClick = () => {
        if (this.slickRef) {
            this.slickRef.slickPrev();
        }
    };

    setSlickRef = (ref) => {
        this.slickRef = ref;
    };

    productsColumns() {
        const columns = [];
        const { rows, mergedList } = this.props;
        let slicedList = [];
        if (rows > 0) {
            slicedList = (mergedList && mergedList.length > 0) && mergedList.slice();

            while (slicedList && slicedList.length > 0) {
                columns.push(slicedList.splice(0, rows));
            }
        }

        return columns;
    }

    render() {
        const { loading } = this.props;

        const blockClasses = classNames('home_hot_ads_list', {
            'block-products-carousel--loading': loading,
        });

        const columns = this.productsColumns().map((column, index) => {
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
