// react
import React, { Fragment, useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

export default function ToolTip(props) {
    const {
        id, text, color,place
    } = props;

    return (
        <div>
            <ReactTooltip
                className="toolTip"
                id={id}
                place={place || 'left'}
                effect="solid"
                textColor="white"
                backgroundColor={color || "#334f8d"}
                arrowColor="#f1861e"
                data-html
                insecure
            >
                {text}
            </ReactTooltip>
        </div>
    );
}
ToolTip.defaultProps = {
    backgroundColor: "#334f8d"
};
