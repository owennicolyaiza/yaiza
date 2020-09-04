import React, { useState, useEffect } from 'react';
import '../styles/index.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { ProjectProvider } from '../context/ProjectsContext';
import { getAllProjects } from '../lib/api'

function MyApp({ Component, pageProps, router }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [headerHeight] = useState(70);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const handleToggleMenu = e => {
    e?.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    return scrollTop > headerHeight
      ? setIsHeaderActive(true)
      : setIsHeaderActive(false);
  }

  useEffect(() => {
    const getProjects = async () => {
      const allProjects = await getAllProjects();
      setProjects(allProjects?.results);
    }
    window.addEventListener('scroll', handleScroll);
    getProjects();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  return (
    <>
      <ProjectProvider>
        <Header isMenuOpen={isMenuOpen} toggleMenu={handleToggleMenu} headerHeight={headerHeight} isHeaderActive={isHeaderActive} />
        <Nav
          toggleMenu={handleToggleMenu}
          menuIsOpen={isMenuOpen}
          projects={projects}
          pathname={router.pathname}
        />
        <Component {...pageProps} headerHeight={headerHeight} />
        {router.pathname !== '/' && <Footer />}
      </ProjectProvider>
    </>
  )
}

export default MyApp;
