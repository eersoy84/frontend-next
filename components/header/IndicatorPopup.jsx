// react
import { useState, useEffect, useRef } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Link from 'next/link'
import UseHasMounted from '../../hooks/useHasMounted';

const timeoutLength = 1;

const IndicatorPopup = ({ url, icon, value, className, dropdown }) => {
  const [open, setOpen] = useState(false);
  const hasMounted = UseHasMounted()
  const wrapperRef = useRef(null)

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const enterButton = () => {
    setOpen(true)
  };

  const leaveButton = () => {
    if (open) {
      return;
    }
    setTimeout(() => {
      setOpen(false)
    }, 50);
  };

  const handleOutsideClick = (event) => {
    if (!wrapperRef?.current?.contains(event.target) && open) {
      setOpen(false)
    }
  };

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
  let button;
  if (url) {
    button = (
      <Link href={url}>
        <a
          className="indicator__button"
          onMouseEnter={enterButton}
          onMouseLeave={leaveButton}
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
        onMouseEnter={enterButton}
        onMouseLeave={leaveButton}
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
      ref={wrapperRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {hasMounted && button}
      {hasMounted && (open ? dropdown : null)}
    </div>
  );
}

IndicatorPopup.propTypes = {
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

export default IndicatorPopup;
