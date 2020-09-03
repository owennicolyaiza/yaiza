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
  const handleToggleMenu = e => {
    e?.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    const getProjects = async () => {
      const allProjects = await getAllProjects();
      setProjects(allProjects?.results);
    }

    getProjects();
  }, [])
  return (
    <>
      <ProjectProvider>
          <Header isMenuOpen={isMenuOpen} toggleMenu={handleToggleMenu} headerHeight={headerHeight} />
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
