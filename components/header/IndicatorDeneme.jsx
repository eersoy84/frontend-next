// react
import React, { Component } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Link from 'next/link'

const timeoutLength = 1;
class IndicatorDeneme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      isDivOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleOutsideClick = (event) => {
    const { open } = this.state;

    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && open) {
      this.close();
    }
  };

  handleButtonClick = () => {
    console.log('button tıklandı!');
  }

  enterButton = (event) => {
    this.open();
  };

  leaveButton = (event) => {
    if (this.state.isDivOpen) {
      return;
    }
    setTimeout(() => {
      this.close();
    }, timeoutLength);
  };

  enterDiv = () => {
    this.openDiv();
  }

  leaveDiv = () => {
    setTimeout(() => {
      this.close();
      this.closeDiv();
    }, timeoutLength);
  }

  openDiv() {
    this.setState(() => ({
      isDivOpen: true,
    }));
  }

  closeDiv() {
    this.setState(() => ({
      isDivOpen: false,
    }));
  }

  open() {
    this.setState(() => ({
      open: true,
    }));
  }

  close() {
    this.setState(() => ({
      open: false,
    }));
  }

  render() {
    const { open, isDivOpen } = this.state;
    const { url, className, icon } = this.props;
    let { value, dropdown } = this.props;
    let button;

    if (value !== undefined) {
      value = <span className="indicator__value">{value}</span>;
    }

    const title = (
      <span className="indicator__area">
        {icon}
        {value}
        {/* <span className="menu_custom_icon_label">Sepetim</span> */}
      </span>
    );

    if (url) {
      button = (
        <Link href={url}>
          <a
            className="indicator__button"
            onMouseEnter={this.enterButton}
            onMouseLeave={this.leaveButton}
          >
            {title}
          </a>
        </Link>
      );
    } else {
      button = (
        <button
          type="button"
          className="indicator__button"
          onMouseEnter={this.enterButton}
          onMouseLeave={this.leaveButton}
          onClick={() => this.handleButtonClick}
        >
          {title}
        </button>
      );
    }

    if (dropdown) {
      dropdown = (
        <div className="indicator__dropdown">
          {dropdown}
        </div>
      );
    }

    const classes = classNames(`indicator indicator--trigger--click ${className}`, {
      'indicator--opened': open,
    });

    return (
      <div
        className={classes}
        ref={this.setWrapperRef}
        onMouseEnter={this.enterDiv}
        onMouseLeave={this.leaveDiv}
      >
        {button}
        {isDivOpen ? dropdown : null}
      </div>
    );
  }
}

IndicatorDeneme.propTypes = {
  /** indicator value */
  value: PropTypes.number,
  /** the component that will be shown in the dropdown */
  dropdown: PropTypes.node,
  /** indicator icon */
  icon: PropTypes.node,
  /** indicator url */
  url: PropTypes.string,
  /** callback function that is called when the dropdown is opened */
  onOpen: PropTypes.func,
  /** callback function that is called when the dropdown is closed */
  onClose: PropTypes.func,
};

export default IndicatorDeneme;
