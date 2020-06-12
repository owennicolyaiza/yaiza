// React
import React from 'react'
import SVGLogo from '../SVG/SVGLogo'
import NavIcon from './NavIcon'
import NavLink from '../NavLink'
import classNames from 'classnames'

const Header = (props) => {
  const headerClasses = classNames({
    header: true,
    active: props.headerIsActive || props.menuIsOpen
  });
  return (
    <div className={headerClasses}>
      <div className="container">
        <NavLink url="/" className="logo-link" toggleMenu={props.toggleMenu} willToggle={props.menuIsOpen}>
          <SVGLogo width={33} height={34} className="logo" />
        </NavLink>
        {props.pathname === '/' &&
          <div className="hidden-xs strapline"><p>Design, Illustration &amp; Art Direction</p></div>}
        <div className="menu-button-container" onClick={props.toggleMenu}>
          <NavIcon {...props} />
        </div>
      </div>
    </div>
  );
};

export default Header;
