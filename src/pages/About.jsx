import React from "react";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Student Dashboard App</h1>
      <p className="about-text">
        The <strong>Student Dashboard App</strong> is designed to help users easily view, manage, 
        and explore student information in a structured and interactive way. 
        It uses the <a href="https://jsonplaceholder.typicode.com/users" target="_blank" rel="noopener noreferrer">JSONPlaceholder API</a> 
        <span> to fetch student data dynamically, demonstrating real-time API integration.</span>
      </p>
      <p className="about-text">
        This app includes multiple pages for a seamless experience:
      </p>
      <ul className="about-list">
        <li><strong>Home:</strong> Displays the app title and a button to navigate to the student list.</li>
        <li><strong>Students:</strong> Fetches and displays the list of students from the API.</li>
        <li><strong>Student Details:</strong> Shows individual student details based on the URL ID and remembers the last visited student.</li>
        <li><strong>About:</strong> Explains the purpose and features of the app.</li>
      </ul>
      <p className="about-text">
        This project is a demonstration of React fundamentals, API integration, routing, and state management 
        while building a user-friendly dashboard interface.
      </p>
    </div>
  );
};

export default About;
