// react
import React, { Component, useState } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

function InputNumber(props) {
  const { value } = props;
  const handleChange = (event) => {
    const { min, onChange } = props;
    if (onChange) {
      const value = parseFloat(event.target.value);
      onChange(Number.isNaN(value) ? (min || 0) : value);
    }
  };
  const [valueState, setValueState] = useState(value);
  const handleAddMouseDown = () => {
    console.log("addMousedown")
    change(1);
  };

  const handleSubMouseDown = () => {
    console.log("subMousedown")
    change(-1);
  };

  /**
    * @param direction - one of [-1, 1]
    */
  const change = (direction) => {
    const {
      value,
      step,
      max,
      min,
      onChange,
    } = props;
    console.log("props", props)
    console.log("isNan", Number.isNaN(value))
    let newValue = (value === '' || Number.isNaN(value) ? 0 : value) + step * direction;
    console.log("newValue", newValue)

    if (max !== null) {
      newValue = Math.min(max, newValue);
    }
    if (min !== null) {
      newValue = Math.max(min, newValue);
    }
    if (newValue !== value) {
      if (onChange) {
        onChange(newValue, direction);
      }
    }
  };

  const { size, className, ...otherProps } = props;

  const classes = classNames('input-number', className);
  const formControlClasses = classNames('form-control input-number__input', {
    'form-control-sm': size === 'sm',
    'form-control-lg': size === 'lg',
  });

  return (
    <div className={classes}>
      <input
        className={formControlClasses}
        type="number"
        onChange={handleChange}
        value={value}
        disabled
      />

      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="input-number__add" onClick={handleAddMouseDown} />
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className="input-number__sub" onClick={handleSubMouseDown} />
    </div>
  );
}

InputNumber.propTypes = {
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
};

InputNumber.defaultProps = {
  value: '',
  step: 1,
  max: null,
  min: null,
};

export default InputNumber;
