// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import Departments from './Departments';
import IndicatorSearch from './IndicatorSearch';
import { LogoSmallSvg } from '../../svg';
import CategorySlider from '../blocks/CategorySlider';

function NavPanel(props) {
  const { layout } = props;

  let logo = null;
  let departments = null;
  let searchIndicator;

  if (layout === 'compact') {
    logo = (
      <div className="nav-panel__logo">
        <Link to="/"><LogoSmallSvg /></Link>
      </div>
    );

    searchIndicator = <IndicatorSearch />;
  }

  if (layout === 'default') {
    departments = (
      <div className="nav-panel__departments">
        <Departments />
      </div>
    );
  }
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="nav-panel">
      <div className="nav-panel__container container">
        <div className="nav-panel__row">
          <CategorySlider />
        </div>

      </div>
    </div>
  );
}

NavPanel.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(['default', 'compact']),
};

NavPanel.defaultProps = {
  layout: 'default',
};

const mapStateToProps = (state) => ({
  favourites: state.userAccount.favorites,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavPanel);
