import { useEffect, useState, useRef } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Link from 'next/link'
import UseHasMounted from '../../hooks/useHasMounted';

const Indicator = ({ url, className, icon, value, dropdown, onClick, onClose, onOpen }) => {
    const [open, setOpen] = useState(false)

    const wrapperRef = useRef(null)

    const handleOutsideClick = (event) => {
        if (!wrapperRef?.current?.contains(event.target) && open) {
            close();
        }
    };

    const hasMounted = UseHasMounted()
    const toggle = () => {
        setOpen(open => !open)
    }
    const handleButtonClick = (event) => {
        if (dropdown) {
            event.preventDefault();
        }

        toggle();

        if (onClick) {
            onClick(event);
        }
    };


    useEffect(() => {
        if (open && onOpen) {
            onOpen();
        }
        if (!open && onClose) {
            onClose();
        }
        document.addEventListener('mousedown', handleOutsideClick)

        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [open])

    let button;

    if (value !== undefined) {
        value = <span className="indicator__value">{value}</span>;
    }

    const title = (
        <span className="indicator__area">
            {icon}
            {value}
        </span>
    );

    if (url) {
        button = (
            <Link href={url}>
                <a className="indicator__button" onClick={handleButtonClick}>
                    {title}
                </a>
            </Link>
        );
    }
    else {
        button = (
            <button type="button" className="indicator__button" onClick={handleButtonClick}>
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

    return (<div className={classes} ref={wrapperRef}>

        {hasMounted && button}
        {hasMounted && dropdown}
    </div>);
}
Indicator.propTypes = {
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

export default Indicator;