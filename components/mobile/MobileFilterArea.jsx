// react
import React, {
  Fragment, useState, useEffect, useMemo,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

// application
import { Link } from 'react-router-dom';
import Pagination from '../shared/Pagination';
import ProductCard from '../shared/ProductCard';
import { Filters16Svg } from '../../svg';
import { sidebarOpen } from '../../store/sidebar';

export default function MobileFilterArea(props) {
  return (
    <>
      <div className="mobile_filter_area">
        <div className="container">
          <div className="mobile_filter_items d-flex justify-content-center">
            <div className="row">
              <div className="col-2">
                asdfasd
              </div>
              <div className="col-10">
                <h4>Title</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
