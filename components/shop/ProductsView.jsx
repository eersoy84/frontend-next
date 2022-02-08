// react
import {
    useState, useEffect, useMemo,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Link from 'next/link'
import Image from 'next/image'
import ProductCard from '../shared/ProductCard';
import { sidebarOpen } from '../../store/sidebar';
import { mobileMenuOpen } from '../../store/mobile-menu';
import Pagination from '../shared/Pagination'
import Spinner from '../shared/Spinner';


export default function ProductsView({ adList }) {
    const [pagedList, setPagedList] = useState(adList);
    const dispatch = useDispatch();
    const handlePageChange = (items) => {
        setPagedList(items);
    };


    const count = adList?.length || 0;
    const list = pagedList?.map(product => {
        return (<div key={product.adId} className="products-list__item">
            <ProductCard
                product={product}
            />
        </div>)
    });

    const viewOptionsClasses = classNames('view-options', 'view-options--offcanvas--mobile');

    return (
        <div className="products-view">
            <div className="products-view__options">
                <div className={viewOptionsClasses}>
                    <div className="view-options__filters-button">
                        <button type="button" className="filters-button" onClick={() => dispatch(mobileMenuOpen())}>
                            <Image src="/icons/filters-16.svg" height={16} width={16} />&nbsp;&nbsp;
                            <span className="filters-button__title">Filtreler</span>&nbsp;&nbsp;
                            <span className="filters-button__counter">{count}</span>
                        </button>
                    </div>
                    <div className="view-options__divider" />
                </div>
            </div>

            <div className="products-view__list products-list" data-layout="list" data-with-features={false}>
                {list?.length > 0
                    ?
                    (
                        <div className="products-list__body">
                            {list}
                        </div>
                    )
                    :
                    (<Spinner />
                        // <div className="mt-4 text-center">
                        //     <h3>
                        //         Şu anda bu kategoride ilan bulunmamaktadır!
                        //     </h3>
                        //     <Link href="/ilanlar">
                        //         <a className="btn btn-primary">
                        //             Tüm İlanlar
                        //         </a>
                        //     </Link>
                        // </div>
                    )
                }
            </div>
            {(adList?.length > 10)
                && (
                    <div className="products-view__pagination">
                        <Pagination items={adList} limit={10} onPageChange={(items) => handlePageChange(items)} />
                    </div>
                )}
        </div >
    );
}
ProductsView.propTypes = {
    /**
       * array of product objects
       */
    products: PropTypes.array,
    /**
       * indicates when sidebar bar should be off canvas
       */
    offcanvas: PropTypes.oneOf(['always', 'mobile']),
};

ProductsView.defaultProps = {
    products: [],
    offcanvas: 'mobile',
};
