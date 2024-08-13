import React from 'react';
import { Helmet } from 'react-helmet-async';

const Header = ({ title, description }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="../src/assets/logo1.png" />
  </Helmet>
);

export default Header;
