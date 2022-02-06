// react
import React from 'react';
import theme from '../../data/theme';

export default function FooterContacts() {
  return (
    <div className="site-footer__widget footer-contacts">
      <h6 className="footer-contacts__title">Adres</h6>

      <ul className="footer-contacts__contacts">
        <li>
          <i className="footer-contacts__icon fas fa-globe-americas" />
          <a href={`https://goo.gl/maps/uHLPKdVYsE2e7puF9`} target="_blank" rel="noreferrer">{theme.contacts.address}</a>
        </li>
        <li>
          <i className="footer-contacts__icon far fa-envelope" />
          <a href={`mailto:${theme.contacts.email}`} target="_blank" rel="noreferrer">{theme.contacts.email}</a>
        </li>
        <li>
          <i className="footer-contacts__icon fas fa-mobile-alt" />
          <a href={`tel:${theme.contacts.phone}`}>{theme.contacts.phoneFormatted}</a>
        </li>
        <li>
          <i className="footer-contacts__icon far fa-clock" />
          Pazartesi-Cuma 09:00 - 18:00
        </li>
      </ul>
    </div>
  );
}
