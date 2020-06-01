// React
import React from 'react'
import SVG from './SVG'

const SVGRightArrow = (props) => (
  <SVG
    {...props}
    >
    <rect x="-1" y="-1" width="69" height="32" fill="none"/><rect className="arrow-part" x="3.1" y="14.6" width="61.3" height="1" stroke="null"/><polygon className="arrow-part" points="51 29.5 65.4 15.1 51 0.8 51 1.4 51 1.4 51 1.9 51 2.2 64 15.1 51 28 "/><polygon className="arrow-part" points="51 0.8 51 1.2 51 0.8 "/><polygon className="arrow-part" points="16 29.5 16 29 16 29.4 "/>
  </SVG>
);

SVGRightArrow.propTypes = SVG.propTypes;

export default SVGRightArrow;
