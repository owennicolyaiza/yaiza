import React, {useState} from 'react';
import '../styles/index.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

function MyApp({ Component, pageProps, router}) {
  console.log('====> pageProps:', pageProps)
  const [isMenuOpen, setIsMenuOpen] = useState();
  // const [isMenuOpen, setIsMenuOpen] = useState();
  const handleToggleMenu = e => {
    e.preventDefault();
    setIsMenuOpen(state => !state.isMenuOpen);
  }
  return (
    <>
      <Header />
      <Nav
        toggleMenu={handleToggleMenu}
        menuIsOpen={isMenuOpen}
        // projects={this.state.projects}
        pathname={router.pathname}
        />
      <Component {...pageProps} />
      {router.pathname !== '/' && <Footer />}
    </>
  )
}

export default MyApp;
