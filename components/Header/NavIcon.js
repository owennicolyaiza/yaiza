// React
import React from 'react'
import classNames from 'classnames'

const NavIcon = (props) => {
  const menuClasses = classNames({
    cross: true,
    open: props.isMenuOpen
  })
  return (
    <div className="toggle" id="navMenuToggleButton">
      <a href="#" className={menuClasses}><span></span></a>
    </div>
  );
};

export default NavIcon;
