// React
import React from 'react'
import SVG from './SVG'

const SVGLeftArrow = (props) => (
  <SVG
    {...props}
    >
    <rect x="-1" y="-1" width="69" height="32" fill="none"/><title>  Layer 1</title><rect className="arrow-part" x="3.1" y="14.6" width="61.3" height="1"/><polygon className="arrow-part" points="51 0.8 51 1.2 51 0.8 "/><polygon className="arrow-part" points="16 0.8 1.7 15.1 16 29.5 16 28.8 16 28.8 16 28.3 16 28 3.1 15.1 16 2.2 "/><polygon className="arrow-part" points="16 29.5 16 29 16 29.4 "/>
  </SVG>
);

SVGLeftArrow.propTypes = SVG.propTypes;

export default SVGLeftArrow;
