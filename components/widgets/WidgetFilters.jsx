// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import { Link } from 'react-router-dom';
import Collapse from '../shared/Collapse';
import FilterCategoriesDeneme from '../filters/FilterCategoriesDeneme';
import FilterCheckbox from '../filters/FilterCheckbox';
import FilterColor from '../filters/FilterColor';
import FilterPrice from '../filters/FilterPrice';
import FilterRadio from '../filters/FilterRadio';
import { ArrowRoundedDown12x7Svg } from '../../svg';
import FilterSubcategories from '../filters/FilterCategoriesDeneme';
import FilterBrands from '../filters/FilterBrands';

function WidgetFilters(props) {
  const { title, categories, offcanvas } = props;
  const filters = categories || [];
  const filtersList = filters.map((filter) => {
    let filterView = null;

    if (filter.brands && filter.brands.length > 0) {
      filterView = <FilterCheckbox items={filter.brands} categoryId={filter.id} />;
    }
    // else if(fil)

    // else
    //  if (filter.type === 'checkbox') {
    //     filterView = <FilterCheckbox items={filter.brands} />;
    // }
    // else if (['checkbox', 'radio'].includes(filter.type)) {
    //     filterView = (
    //         <FilterRadio
    //             items={filter.options.items}
    //             name={filter.options.name}
    //         />
    //     );
    // }

    return (
      filter.parentId === null ? (
        <div key={filter.id} className="widget-filters__item">
          {/* <Link to={`/kategori?categoryId=${filter.id}`}> */}

          <Collapse
            open
            toggleClass="filter--opened"
            render={({ toggle, setItemRef, setContentRef }) => (
              <div className="filter filter--opened" ref={setItemRef}>
                <button type="button" className="filter__title" onClick={toggle}>
                  {filter.name}
                  {
                                        (
                                          (filter.subCategories && filter.subCategories.length > 0)
                                        || ((filter.brands && filter.brands.length > 0))
                                        )
                                          ? <ArrowRoundedDown12x7Svg className="filter__arrow" />
                                          : null
                                    }
                </button>
                <div className="filter__body" ref={setContentRef}>
                  <div className="filter__container">
                    {filterView}
                  </div>
                </div>
              </div>
            )}
          />
          {/* </Link> */}

        </div>
      ) : null
    );
  });

  const classes = classNames('widget-filters widget', {
    'widget-filters--offcanvas--always': offcanvas === 'always',
    'widget-filters--offcanvas--mobile': offcanvas === 'mobile',
  });

  return (
    <div className={classes}>
      <h4 className="widget-filters__title widget__title">Markalar</h4>

      <div className="widget-filters__list">
        {filtersList}
      </div>

      {/* <div className="widget-filters__actions d-flex">
                <button type="button" className="btn btn-primary btn-sm">Filter</button>
                <button type="button" className="btn btn-secondary btn-sm ml-2">Reset</button>
            </div> */}
    </div>
  );
}

WidgetFilters.propTypes = {
  /**
     * widget title
     */
  title: PropTypes.node,
  /**
     * array of filters
     */
  filters: PropTypes.array,
  /**
     * indicates when sidebar bar should be off canvas
     */
  offcanvas: PropTypes.oneOf(['always', 'mobile']),
};

WidgetFilters.defaultProps = {
  filters: [],
  offcanvas: 'mobile',
};

export default WidgetFilters;
