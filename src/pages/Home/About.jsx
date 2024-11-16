import React from 'react';
import './About.css';  // Import the CSS file

const About = () => {
  return (
    <div className="about-container">
      <section className="hero">
        <h1>About Us</h1>
        <p>Welcome to GitHub Tracker! We simplify issue tracking for developers.</p>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>We aim to provide an efficient and user-friendly way to track GitHub issues and pull requests. Our goal is to make it easy for developers to stay organized and focused on their projects without getting bogged down by the details.</p>
      </section>
      <h2>What We Do</h2>
      <section className="features">
        <div className="feature-item">
          <div className="feature-icon">🔍</div>
          <h3>Simple Issue Tracking</h3>
          <p>Track your GitHub issues seamlessly with intuitive filters and search options.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">👥</div>
          <h3>Team Collaboration</h3>
          <p>Collaborate with your team in real-time, manage issues and pull requests effectively.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⚙️</div>
          <h3>Customizable Settings</h3>
          <p>Customize your issue tracking workflow to match your team's needs.</p>
        </div>
      </section>
    </div>
  );
};

export default About;
