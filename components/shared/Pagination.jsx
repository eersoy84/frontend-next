// react
import { useState, useEffect } from 'react';
// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ArrowRoundedLeft8x13Svg, ArrowRoundedRight8x13Svg } from '../../svg';



const getSlicedArray = (page, items, limit) => {
    let start = ((page - 1) * limit);
    let end = (page * limit);
    return items.slice(start, end)
}
function Pagination(props) {
    const { items, limit, siblings, onPageChange } = props;
    const [currentPage, setCurrentPage] = useState();

    let total = Math.ceil(items && items.length / limit);

    const setPage = (value) => {
        if (value < 1 || value > total || value === currentPage) {
            return;
        }
        setCurrentPage(value);
        let array = getSlicedArray(value, items, limit);

        if (onPageChange) {
            onPageChange(array);
        }
    };

    useEffect(() => {
        setPage(1)
    }, [JSON.stringify(items)])

    const getPages = () => {
        const pages = [];
        const min = Math.max(1, currentPage - siblings - Math.max(0, siblings - total + currentPage));
        const max = Math.min(total, min + siblings * 2);

        for (let i = min; i <= max; i += 1) {
            pages.push(i);
        }

        return pages;
    }

    const firstLinkClasses = classNames('page-item', {
        disabled: currentPage <= 1,
    });
    const lastLinkClasses = classNames('page-item', {
        disabled: currentPage >= total,
    });

    const pages = getPages().map((page, index) => {
        const classes = classNames('page-item', {
            active: page === currentPage,
        });

        return (
            <li key={index} className={classes}>
                <button type="button" className="page-link" onClick={() => setPage(page)}>
                    {page}
                    {page === currentPage && <span className="sr-only">{currentPage}</span>}
                </button>
            </li>
        );
    });

    return (
        <>
            <ul className="pagination justify-content-center">
                <li className={firstLinkClasses}>
                    <button
                        type="button"
                        className="page-link page-link--with-arrow"
                        aria-label="Previous"
                        onClick={() => setPage(currentPage - 1)}
                    >
                        <ArrowRoundedLeft8x13Svg className="page-link__arrow page-link__arrow--left" aria-hidden="true" />

                    </button>
                </li>
                {pages}
                <li className={lastLinkClasses}>
                    <button
                        type="button"
                        className="page-link page-link--with-arrow"
                        aria-label="Next"
                        onClick={() => setPage(currentPage + 1)}
                    >
                        <ArrowRoundedRight8x13Svg className="page-link__arrow page-link__arrow--right" aria-hidden="true" />
                    </button>
                </li>
            </ul>
        </>
    )
}

Pagination.propTypes = {
    /**
     * the number of sibling links
     */
    siblings: PropTypes.number,
    /**
     * current page number
     */
    currentPage: PropTypes.number,
    /**
     * total pages
     */
    total: PropTypes.number,


    items: PropTypes.array,
    limit: PropTypes.number,
    /**
     * total pages
     */
    onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
    siblings: 1,
    current: 1,
    total: 1,
    limit: 10,
    items: []
};

export default Pagination;
