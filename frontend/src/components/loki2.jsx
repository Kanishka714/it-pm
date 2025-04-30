// WelcomeCard.jsx
import React from 'react';

const WelcomeCard = () => {
  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Welcome, Kanishka!</h1>
      <p style={styles.message}>We're glad to have you here. Start exploring your dashboard now.</p>
      <button style={styles.button} onClick={() => alert('Getting Started!')}>Get Started</button>
    </div>
  );
};

const styles = {
  card: {
    padding: '20px',
    margin: '20px auto',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '400px',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px',
  },
  message: {
    fontSize: '16px',
    margin: '0 0 20px',
    color: '#555',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default WelcomeCard;
