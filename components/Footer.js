import React from 'react';

const year = (new Date()).getFullYear()

const Footer = () => (
  <div id="footer" className="container">
      <p>&copy;{year} Yaiza Gardner | All Rights Reserved</p>
  </div>
);

export default Footer;
