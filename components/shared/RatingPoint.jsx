// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default function RatingPoint(props) {
    const { value } = props;
    let color;
    if (value <= 5) {
        color = "red"
    }
    if (value > 5) {
        color = "green"
    }
    return (
        <>
            <div className="rating_value" style={{ '--color': color }}>
                {value}
            </div>
        </>
    )

}
RatingPoint.propTypes = {
    /**
       * rating value
       */
    value: PropTypes.number,
};
RatingPoint.defaultProps = {
    value: 0,
};
