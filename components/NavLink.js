// modules/NavLink.js
import React from 'react'
import { useRouter } from 'next/router'

const NavLink = (props) => {
  const router = useRouter()
  const navigate = (url, willToggle, evt) => {
    router.push(url);
    if (willToggle) {
      props.toggleMenu(evt);
    }
  };
  let linkClasses = 'nav-link ' + (props.className || '');
  linkClasses += props.pathname === props.url ? 'active' : '';
  
  return (<div className={linkClasses} onClick={() => {navigate(props.url, props.willToggle)}}>{props.children}</div>);
}

NavLink.defaultProps = {
  willToggle: true
}

export default NavLink;
