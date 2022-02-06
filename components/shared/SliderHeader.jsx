// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import { ArrowRoundedLeft7x11Svg, ArrowRoundedRight7x11Svg } from '../../svg';

function SliderHeader(props) {
  const { title } = props;
  return (
    <div className="block-header">
      <h3 className="block-header__title">{title}</h3>
      <div className="block-header__divider" />
    </div>
  );
}

SliderHeader.propTypes = {
  title: PropTypes.string,
};
SliderHeader.defaultProps = {
  groups: [],
  onGroupClick: () => { },
};

export default SliderHeader;
