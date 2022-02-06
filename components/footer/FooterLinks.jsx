// react
import React from 'react';
import Link from 'next/link'

// third-party
import PropTypes from 'prop-types';

export default function FooterLinks(props) {
  const { title, items } = props;

  const linksList = items.map((item, index) => (
    <li key={index} className="footer-links__item">

      <Link href={item.url}>
        <a className="footer-links__link">{item.title}</a>
      </Link>
    </li>
  ));

  return (
    <div className="site-footer__widget footer-links">
      <h6 className="footer-links__title">{title}</h6>
      <ul className="footer-links__list">
        {linksList}
      </ul>
    </div>
  );
}

FooterLinks.propTypes = {
  /** widget title */
  title: PropTypes.node.isRequired,
  /** array of links */
  items: PropTypes.array,
};

FooterLinks.defaultProps = {
  items: [],
};
