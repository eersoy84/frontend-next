// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Models from './Models';

// application
import languages from '../../i18n';
import MegamenuLinks from './MegamenuLinks';

function Brands(props) {
  const {
    layout, withIcons, items, categoryId,
  } = props;

  const searchPath = `/kategori?categoryId=${categoryId}&`;

  const itemsList = items.map((item) => (
    <li key={item.id}>

      {/* <Link to={`/kategori?brandId=${item.id}`}> */}
      <Link to={`${searchPath}brandId=${item.id}`}>

        {item.name}
      </Link>
    </li>
  ));

  const classes = classNames(`menu menu--layout--${layout}`, {
    'menu--with-icons': withIcons,
  });

  return (
    <ul className={classes}>
      {itemsList}
    </ul>
  );
}
export default Brands;
