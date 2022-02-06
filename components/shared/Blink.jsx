import React from 'react';
import PropTypes from 'prop-types';

class Blink extends React.Component {
  render() {
    const {
      color, fontSize, text, fontWeight, blinkTime,
    } = this.props;
    const root = document.documentElement;
    root.style.setProperty('--blink-time', `${blinkTime}s`);

    return (
      <div>
        <span className="blink" style={{ color, fontSize, fontWeight }}>
          {text}
        </span>
      </div>
    );
  }
}

Blink.propTypes = {
  /** hex color */
  color: PropTypes.string,
};

Blink.defaultProps = {
  // color: '#355271',
  color: 'blue',
  fontSize: 17,
  fontWeight: 'lighter',
  blinkTime: 1,
};

export default Blink;
