import React from 'react';
import backlogo from '../assets/img/ima-doc.jpg';
import logo from '../assets/img/ima-ams-logorr.png'; // Replace with your actual logo image path

const Hero = () => {
  return (
    <section
      id="hero"
      className="d-flex align-items-center"
      style={{
        height: '70vh', // Adjusted height for more space
        backgroundImage: `url(${backlogo})`, // Set the background image
        backgroundSize: 'cover', // Cover the entire section
        backgroundPosition: 'center', // Center the background image
        color: '#fff', // Text color
        padding: '0', // Remove padding to align content with the left edge
      }}
    >
      
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          display: 'flex',
          flexDirection: 'column',

          padding: '20px', // Add internal padding for spacing
        }}
      >
        {/* Logo */}
        <div style={{ marginRight: '20px' }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '300px', // Adjusted for better responsiveness
              height: '300px', // Adjusted for better responsiveness
              maxWidth: '100%', // Ensure responsiveness on smaller screens
              maxHeight: '100%', // Ensure responsiveness on smaller screens
            }}
          />
        </div>
<br />
        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Center text vertically relative to the logo
          }}
        >
          <h1
            style={{
              fontSize: '2.2rem',
              fontWeight: 'bold',
              margin: '0', // Remove margins for precise alignment
              background: 'linear-gradient(to right, green, red)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              color: 'black',
            }}
          >
            WELCOME TO INDIAN MEDICAL ASSOCIATION
          </h1>
          <h1
            style={{
              fontSize: '2.5rem',
              marginTop: '10px',
              textAlign:'center',
              fontWeight: 'bold',
              color: 'black',
              background: 'linear-gradient(to right, green, red)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}
          >
            ACADEMY OF MEDICAL SPECIALITIES
          </h1>
        </div>
      </div>
    </section>
  );
};

export default Hero;
