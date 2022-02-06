import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Check9x7Svg } from '../../svg';

export class ProductFormOptions extends Component {
  constructor(props) {
    super(props);
  }

    handleChange = (e) => {
      this.props.onPropertyChange(
        e.target,
      );
    }

    render() {
      const {
        productOption, vites, yakıt, hafıza,
      } = this.props;
      const list = productOption.properties.map((property) => {
        const propertyList = property.values.map((item) => {
          if (property.type === 'radio' && property.name !== 'RENK') {
            return (
              <div className="form-group product__option" key={item.id}>
                <label>
                  <input
                    type="radio"
                    id={item.percentage}
                    name={property.name}
                    value={item.name}
                    onChange={this.handleChange}
                    checked={vites === item.name || yakıt === item.name || hafıza === item.name}
                  />
                  <span>{item.name}</span>

                </label>
                {vites === item.name
                  ? (
                    <label style={{ color: 'red' }}>
                      {item.percentage ? `fark: % ${item.percentage}` : null}
                    </label>
                  )
                  : null}
                {yakıt === item.name
                  ? <label style={{ color: 'red' }}>{item.percentage ? `fark: % ${item.percentage}` : null}</label>
                  : null}
                {hafıza === item.name ? <label style={{ color: 'red' }}>{item.percentage ? `fark: % ${item.percentage}` : null}</label> : null}
              </div>
            );
          }
        });

        return (

          <div key={property.id}>
            <div className="product__option-label">
              {(property.type === 'radio' && property.name !== 'RENK') ? property.name : null}
            </div>

            {/* <div className="input-radio-label"> */}
            <div className="input-radio-label__list">
              {propertyList}
            </div>
            {/* </div> */}
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

export default ProductFormOptions;
