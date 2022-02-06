// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ArrowRoundedRight6x9Svg } from '../../svg';
import Brands from './Brands';
import AppLink from '../shared/AppLink';

// application
import languages from '../../i18n';
import MegamenuLinks from './MegamenuLinks';

function SubCategory(props) {
  const {
    layout, withIcons, items, onClick,
  } = props;

  const itemsList = items.map((item, index) => {
    let arrow;
    let brands;

    if (item.brands && item.brands.length) {
      arrow = <ArrowRoundedRight6x9Svg className="menu__arrow" />;
      brands = (
        <div className="menu__submenu">
          <Brands items={item.brands} categoryId={item.id} />
        </div>
      );
    }
    return (
      <li key={item.id}>
        {/* <Link to={{ pathname: '/kategori', query: { categoryId: item.id } }}> */}
        {/* <Link to={`/kategori/${item.id}`}> */}
        <Link to={`/kategori?categoryId=${item.id}`}>

          {item.name}
          {arrow}
        </Link>
        {brands}
      </li>
    );
  });

  const classes = classNames(`menu menu--layout--${layout}`, {
    'menu--with-icons': withIcons,
  });

  return (
    <ul className={classes}>
      {itemsList}
    </ul>
  );
}

SubCategory.propTypes = {
  /** one of ['classic', 'topbar'] (default: 'classic') */
  layout: PropTypes.oneOf(['classic', 'topbar']),
  /** default: false */
  withIcons: PropTypes.bool,
  /** array of menu items */
  items: PropTypes.array,
  /** callback function that is called when the item is clicked */
  onClick: PropTypes.func,
};

SubCategory.defaultProps = {
  layout: 'classic',
  withIcons: false,
  items: [],
  onClick: () => { },
};

export default SubCategory;
