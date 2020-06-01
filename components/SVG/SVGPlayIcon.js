// React
import React from 'react'
import SVG from './SVG'

const SVGPlayIcon = (props) => (
  <SVG
    {...props}
    >
    <circle fill="none" stroke="#FFFFFF" strokeWidth="4" strokeMiterlimit="10" cx="52.826" cy="52.418" r="47.159" />
    <g>
      <path fill="#FFFFFF" d="M47.254,34.464c0-1.1,0.636-1.364,1.414-0.586l17.128,17.127c0.777,0.778,0.777,2.051,0,2.828
        L48.668,70.959c-0.778,0.777-1.414,0.514-1.414-0.586V34.464z"/>
    </g>
  </SVG>
);

SVGPlayIcon.propTypes = SVG.propTypes;

export default SVGPlayIcon;
