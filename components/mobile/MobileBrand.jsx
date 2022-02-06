// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';

// application
import AppLink from '../shared/AppLink';
import Collapse from '../shared/Collapse';
import { ArrowRoundedDown12x7Svg } from '../../svg';
import Ripples from 'react-ripples'
import { Link } from 'react-router-dom';

function MobileBrand(props) {
    const { brands, level, onItemClick, categoryId } = props;
    const searchPath = `/kategori?categoryId=${categoryId}&`;

    const handleItemClick = () => {
        if (onItemClick) {
            onItemClick();
        }
    };
    const items = brands || [];
    const linksList = items.map((brand, index) => {
        let item;
        item = (
            <Collapse
                toggleClass="mobile-links__item--open"
                render={({ toggle, setItemRef, setContentRef }) => {
                    let arrow;
                    let linkOrButton;
                    linkOrButton = (
                       <Ripples onClick={handleItemClick} className="w-100">
                            <Link to={`${searchPath}brandId=${brand.id}`}
                                className="mobile-links__item-link" >
                                {brand.name}
                            </Link>
                        </Ripples>
                    );

                    return (
                        <div className="mobile-links__item" ref={setItemRef}>
                            <div className="mobile-links__item-title">
                                {linkOrButton}
                                {arrow}
                            </div>
                            {/* {subLinks} */}
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

MobileBrand.propTypes = {
    items: PropTypes.array,
    brands: PropTypes.array,
    level: PropTypes.number,
    onItemClick: PropTypes.func,
};

MobileBrand.defaultProps = {
    links: [],
    level: 0,
};

export default MobileBrand;
