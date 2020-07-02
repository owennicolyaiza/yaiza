import React from 'react'
import SVGLogo from './SVG/SVGLogo'
import NavIcon from './Header/NavIcon'
import NavLink from './NavLink'
import classNames from 'classnames'
import SVGYaizaLogo from './SVG/SVGYaizaLogo'

const Nav = (props) => {
  const navClassNames = classNames({
    'nav-container': true,
    'active': props.menuIsOpen
  });

  let linkClasses = 'nav-link';

  const navOutput = props.projects && props.projects
    .filter(item => item.uid !== 'about-me')
    .map((item, key) => {
      let linkClasses = 'nav-link';
      if (props.pathname === `/projects/${item.uid}`){
        linkClasses += ' active';
      }
      return (
        <li key={key}><a className={linkClasses} href={`/projects/${item.uid}`}>{item.fragments["casestudy.homepage-slide-heading"].value}</a></li>)
    });


  return (
    <div className={navClassNames}>
      <div className="container">
        <div className="nav-info">
          <div>
            <h3>Yaiza Gardner</h3>
          </div>
         <div>
            <small>Design, Illustration &amp; Art direction</small>
         </div>
          <div>
            <p><a href="mailto:info@yaiza.co.uk">info@yaiza.co.uk</a></p>
          </div>
        </div>
        <ul className="nav">
          <li><a className={`nav-link ${props.pathname === '/projects/about-me' && 'active'}`} href="/projects/about-me">About me</a></li>
          <li><a className={`nav-link ${props.pathname === '/projects' && 'active'}`} href="/projects">View all projects</a></li>
          {navOutput}
        </ul></div>
      <SVGYaizaLogo width={350} height={115} className="nav-logo" />
    </div>
  );
}

export default Nav;
