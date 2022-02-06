// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ArrowRoundedRight6x9Svg } from '../../svg';

// application
import languages from '../../i18n';
import MegamenuLinks from './MegamenuLinks';

function Models(props) {
  const {
    layout, withIcons, items, onClick,
  } = props;
  const itemsList = items.map((item) => (
    <li key={item.id}>
      <Link to="/">
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
export default Models;
