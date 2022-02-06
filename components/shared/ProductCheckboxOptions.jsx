import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Check9x7Svg } from '../../svg';

export class ProductCheckboxOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

    handleChange = (e) => {
      this.setState({ checked: e.target.checked });
      this.props.onPropertyChange(
        e.target,
      );
    }

    render() {
      const { productOption } = this.props;
      const list = productOption.properties.map((property) => {
        const propertyList = property.values.map((item) => {
          if (property.type === 'checkbox') {
            return (
              <div key={item.id}>
                <label
                  className={classNames('filter-list__item', {
                    'filter-list__item--disabled': item.disabled,
                  })}
                >
                  <span className="filter-list__input input-check">
                    <span className="input-check__body">
                      <input
                        className="input-check__input"
                        type="checkbox"
                        id={item.id}
                        name={property.name}
                        onChange={this.handleChange}
                      />
                      <span className="input-check__box" />
                      <Check9x7Svg className="input-check__icon" />
                    </span>
                  </span>
                  <span className="filter-list__title">{item.name}</span>
                </label>
                {this.state.checked ? <label style={{ color: 'red' }}>{item.percentage ? `fark: % ${item.percentage}` : null}</label> : null}
              </div>
            );
          }
        });

        return (

          <div key={property.id}>
            {propertyList}
          </div>
        );
      });

      return (
        <div>
          {list}
        </div>

      );
    }
}

export default ProductCheckboxOptions;
