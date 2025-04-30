// Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>MyApp</div>
      <ul style={styles.navLinks}>
        <li><a style={styles.link} href="#home">Home</a></li>
        <li><a style={styles.link} href="#about">About</a></li>
        <li><a style={styles.link} href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: '10px 20px',
  },
  logo: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  },
};

export default Navbar;
