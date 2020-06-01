// React
import React from 'react';

const SVG = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width} ${props.height}`}
    preserveAspectRatio="xMidYMid meet"
    className={props.className}
  >
    {props.children}
  </svg>
);

SVG.defaultProps = {
  width: 24,
  height: 24,
};

export default SVG;
