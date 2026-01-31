import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero-container">
      {/* Background image */}
      <div className="hero-bg"></div>

      {/* Hero content */}
      <div className="hero-content">
        <h1 className="hero-title">
          “Learn. Grow. Achieve. Every small step today builds the success of tomorrow.”
        </h1>
        <Link to="/student">
          <button className="hero-btn">View Students</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
