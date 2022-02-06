// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import AppLink from '../shared/AppLink';
import Collapse from '../shared/Collapse';
import { ArrowRoundedDown12x7Svg } from '../../svg';
import MobileBrand from './MobileBrand';
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom';

function MobileSubcategory(props) {
    const { subCategories, level, onItemClick } = props;

    const handleItemClick = () => {
        if (onItemClick) {
            onItemClick();
        }
    };
    const items = (subCategories && subCategories) || [];
    const linksList = items.map((subCategory, index) => {
        let item;
        item = (
            <Collapse
                toggleClass="mobile-links__item--open"
                render={({ toggle, setItemRef, setContentRef }) => {
                    let arrow;
                    let brands;
                    let linkOrButton;

                    if (subCategory.brands && subCategory.brands.length > 0) {
                        arrow = (
                            <button className="mobile-links__item-toggle" type="button" onClick={toggle}>
                                <ArrowRoundedDown12x7Svg className="mobile-links__item-arrow" />
                            </button>

                        );
                        brands = (
                            <div className="mobile-links__item-sub-links" ref={setContentRef}>
                                <MobileBrand
                                    brands={subCategory.brands}
                                    level={level + 1}
                                    onItemClick={onItemClick}
                                    categoryId={subCategory.id}
                                />
                            </div>
                        );
                    }
                    linkOrButton = (
                        <Ripples onClick={handleItemClick} className="w-100">
                            <Link to={`/kategori?categoryId=${subCategory.id}`}
                                className="mobile-links__item-link" >
                                {subCategory.name}
                            </Link>
                        </Ripples>
                    )
                    return (
                        <div className="mobile-links__item" ref={setItemRef}>
                            <div className="mobile-links__item-title">
                                {linkOrButton}
                                {arrow}
                            </div>
                            {brands}
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

MobileSubcategory.propTypes = {
    items: PropTypes.array,
    subCategories: PropTypes.array,
    level: PropTypes.number,
    onItemClick: PropTypes.func,
};

MobileSubcategory.defaultProps = {
    links: [],
    level: 0,
};

export default MobileSubcategory;
