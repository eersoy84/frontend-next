// react
import classNames from 'classnames';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FilterRadioDeneme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

    handleChange = (e) => {
      const { categoryId } = this.props;
      const brandId = e.target.id;
      this.setState({ selected: parseInt(brandId) });
      Router.push(`/kategori?categoryId=${categoryId}&brandId=${brandId}`);
    }

    render() {
      const {
        categoryId, items, name, offcanvas,
      } = this.props;
      const { selected } = this.state;
      const itemsList = items.map((item) => {
        let count;
        let modelCount;
        if (item.count > 0) {
          modelCount = item.count;
          count = <span className="filter-list__counter">{modelCount}</span>;
        }

        return (
          <label
            key={item.id}
            className={classNames('filter-list__item', {
              'filter-list__item--disabled': !(modelCount > 0),
            })}
          >
            <span className="filter-list__input input-radio">
              <span className="input-radio__body">
                <input
                  className="input-radio__input"
                  type="radio"
                  id={item.id}
                  disabled={!(modelCount > 0)}
                  onChange={this.handleChange}
                  checked={selected == item.id}
                />
                <span className="input-radio__circle" />
              </span>
            </span>
            <span className="filter-list__title">{item.name}</span>
            {count}
          </label>

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
            <div className="filter-list">
              {itemsList}
            </div>
          </div>
        </div>

      );
    }
}
FilterRadioDeneme.propTypes = {
  items: PropTypes.array,
  name: PropTypes.string,
};
