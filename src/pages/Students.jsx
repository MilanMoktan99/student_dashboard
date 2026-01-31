import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        console.log(response.data);
        setStudents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="students-container">
      <h1 className="students-title">Students List</h1>
      <ul className="students-list">
        {students.map((student) => (
          <Link
            to={`/student/${student.id}`} 
            className="student-link"
          >
            <li className="student-item">
              <p className="student-name">{student.name}</p>
              <p className="student-info">
                <span className="student-username">{student.username}</span> |{" "}
                <span className="student-email">{student.email}</span>
              </p>
              <p className="student-city">{student.address.city}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Students;
