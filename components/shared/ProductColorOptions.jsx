import React, { Component } from 'react';

export class ProductColorOptions extends Component {
  constructor(props) {
    super(props);
  }

    handleChange = (e) => {
      this.props.onPropertyChange(
        e.target,
      );
    }

    render() {
      const { productOption, renk } = this.props;

      const list = productOption.properties.map((property) => {
        const propertyList = property.values.map((item) => {
          if (property.type === 'radio' && property.name === 'RENK') {
            return (
              <div key={item.id}>
                <label
                  className="input-radio-color__item input-radio-color__item--white"
                  style={{ color: item.colorStyle }}
                  data-toggle="tooltip"
                  title={item.name}
                >
                  <input
                    type="radio"
                    id={item.id}
                    name={property.name}
                    value={item.name}
                    onChange={this.handleChange}
                    checked={renk === item.name}
                  />
                  <span />
                </label>
              </div>
            );
          }
        });

        return (

          <div key={property.id}>
            <div className="product__option-label">
              {(property.type === 'radio' && property.name === 'RENK') ? property.name : null}
            </div>

            {/* <div className="input-radio-label"> */}
            <div className="input-radio-color__list">
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

export default ProductColorOptions;
