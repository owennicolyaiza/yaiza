import React, { useState, useEffect } from 'react';
import '../styles/index.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import { ProjectProvider } from '../context/ProjectsContext';
import { getAllProjects } from '../lib/api'

function MyApp({ Component, pageProps, router }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [projects, setProjects] = useState([])
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
          <Header isMenuOpen={isMenuOpen} toggleMenu={handleToggleMenu} />
          <Nav
            toggleMenu={handleToggleMenu}
            menuIsOpen={isMenuOpen}
            projects={projects}
            pathname={router.pathname}
          />
          <Component {...pageProps} />
          {router.pathname !== '/' && <Footer />}
      </ProjectProvider>
    </>
  )
}

export default MyApp;
