// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import { ArrowRoundedLeft6x9Svg } from '../../svg';

function FilterBrands(props) {
  const { items, categoryId } = props;
  const searchPath = `/kategori?categoryId=${categoryId}&`;
  const itemList = items.map((item) => {
    const arrow = <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />;

    return (
      <li key={item.id} className={`filter-categories__item filter-categories__item--${'current'}`}>
        {arrow}
        <Link to={`${searchPath}brandId=${item.id}`}>

          {item.name}
        </Link>
        <div className="filter-categories__counter">{arrow}</div>
      </li>
    );
  });

  return (
    <div className="filter-categories">
      <ul className="filter-categories__list">
        {itemList}
      </ul>
    </div>
  );
}

FilterBrands.propTypes = {
  items: PropTypes.array,
};

export default FilterBrands;
