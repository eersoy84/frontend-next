// react
import React, { useState, useEffect } from 'react';

// third-party
import Link from 'next/link'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image'
// application
import Slider from 'react-slick';
import classNames from 'classnames';
import { useSelector, shallowEqual } from 'react-redux';
// data stubs
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ArrowRoundedLeft8x13Svg, ArrowRoundedRight8x13Svg } from '../../svg';


const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
};
const Responsive = ({ children }) => {
    const isResponsive = useMediaQuery({ maxWidth: 991 });
    return isResponsive ? children : null;
};
function CategorySlider(props) {
    const { categories } = props
    const [showPrevArrow, setShowPrevArrow] = useState(false);
    const [showNextArrow, setShowNextArrow] = useState(true);


    const slidesToShow = 11;

    function PrevArrow(props) {
        const { className, onClick } = props;
        if (!showPrevArrow) {
            return null;
        }
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <span className="prev_arrow_custom_border" onClick={onClick}>
                    <ArrowRoundedLeft8x13Svg className="prev_arrow_custom" />
                </span>

            </div>
        );
    }

    function NextArrow(props) {
        const { className, onClick } = props;
        if (!showNextArrow) {
            return null;
        }
        return (
            <div
                className={className}
                onClick={onClick}
            >
                <span className="next_arrow_custom_border" onClick={onClick}>
                    <ArrowRoundedRight8x13Svg className="next_arrow_custom"/>
                </span>

            </div>
        );
    }

    const setArrowDisplay = (currentSlide) => {
        setShowPrevArrow(currentSlide !== 0);
        setShowNextArrow((categories.length - slidesToShow) !== (currentSlide));
    };
    const settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 150,
        slidesToShow,
        slidesToScroll: slidesToShow,
        initialSlide: 0,
        prevArrow: <PrevArrow className="bizleal_category_slider" />,
        nextArrow: <NextArrow className="bizleal_category_slider" />,
        afterChange: (currentSlide) => setArrowDisplay(currentSlide),
        responsive: [
            {
                breakpoint: 1199,
                settings: {
                    arrows: true,
                    slidesToShow: 10,
                    slidesToScroll: 10,
                },
            },
        ],
    };

    const categoryList = categories?.map((category) => (
        <div key={category.id} className="circle-content">
            <div className="circle">
                <Link
                    href={`/kategori?parentId=${category.id}`}>
                    <a
                        className="circle-mask" style={{ '--cat-url': `url(${category.imgUrl})` }}>
                    </a>
                </Link>
            </div>
            <p>{category.name}</p>

        </div>
    ));

    return (
        <>
            <Desktop>
                <div className="home_categories mb-4">
                    <Slider {...settings}>
                        {categoryList}
                    </Slider>
                </div>
            </Desktop>
            <Responsive>
                <div className="home_categories_responsive mb-3">
                    {categoryList}
                </div>
            </Responsive>
        </>
    );
}

const mapStateToProps = state => {
    return ({
        categories: state.category.categories,
    })
};

export default connect(mapStateToProps, null)(CategorySlider);
