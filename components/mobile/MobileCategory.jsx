// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import AppLink from '../shared/AppLink';
import Collapse from '../shared/Collapse';
import { ArrowRoundedDown12x7Svg } from '../../svg';
import MobileSubcategory from './MobileSubcategory';
import MobileBrand from './MobileBrand';
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom';


function MobileCategory(props) {
    const { categories, level, onItemClick } = props;
    const handleItemClick = () => {
        if (onItemClick) {
            onItemClick();
        }
    };
    const linksList = categories && categories?.map((category, index) => {
        let item;
        item = (
            <Collapse
                toggleClass="mobile-links__item--open"
                render={({ toggle, setItemRef, setContentRef }) => {
                    let arrow;
                    let subMenu;
                    let linkOrButton;

                    if (category.subCategories && category.subCategories.length > 0) {
                        arrow = (
                            <button className="mobile-links__item-toggle" type="button" onClick={toggle}>
                                <ArrowRoundedDown12x7Svg className="mobile-links__item-arrow" />
                            </button>
                        );

                        subMenu = (
                            <div className="mobile-links__item-sub-links" ref={setContentRef}>
                                <MobileSubcategory
                                    subCategories={category.subCategories}
                                    level={level + 1}
                                    onItemClick={onItemClick}
                                />
                            </div>
                        );
                    } else if (category.brands && category.brands.length > 0) {
                        arrow = (
                            <button className="mobile-links__item-toggle" type="button" onClick={toggle}>
                                <ArrowRoundedDown12x7Svg className="mobile-links__item-arrow" />
                            </button>
                        );

                        subMenu = (
                            <div className="mobile-links__item-sub-links" ref={setContentRef}>
                                <MobileBrand
                                    brands={category.brands}
                                    level={level + 1}
                                    onItemClick={onItemClick}
                                    categoryId={category.id}
                                />
                            </div>
                        );
                    }
                    linkOrButton = (
                        <Ripples onClick={handleItemClick} className="w-100">
                            <Link to={`/kategori?parentId=${category.id}`}
                                className="mobile-links__item-link"
                            >
                                <img className="category_list_icon" src={category.imgUrl} />
                                {category.name}
                            </Link>
                        </Ripples>
                    );

                    return (
                        <div className="mobile-links__item" ref={setItemRef}>
                            <div className="mobile-links__item-title">
                                {linkOrButton}
                                {arrow}
                            </div>
                            {subMenu}
                        </div>
                    );
                }}
            />
        );

        //  else if (link.type === 'divider') {
        //     item = <div className="mobile-links__divider" />;
        // }

        return <li key={index}>{item}</li>;
    });

    return (
        <ul className={`mobile-links mobile-links--level--${level}`}>
            {linksList}
        </ul>
    );
}

MobileCategory.propTypes = {
    categories: PropTypes.array,
    items: PropTypes.array,
    level: PropTypes.number,
    onItemClick: PropTypes.func,
};

MobileCategory.defaultProps = {
    links: [],
    level: 0,
};

export default MobileCategory;
