import React from 'react';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return( <div id="wrapper">
    <Component {...pageProps} />;
  </div>)
}

export default MyApp;
