import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setStudent(response.data);
        localStorage.setItem("lastVisitedStudent", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student)
    return <h1 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h1>;

  return (
    <div className="student-details-container">
      {/* Back Arrow */}
      <Link to="/student" className="back-arrow">← Back</Link>

      <h1 className="student-details-title">{student.name}</h1>

      <div className="student-details-notes">
        <p>
          <span className="label">Username:</span> {student.username}
        </p>
        <p>
          <span className="label">Email:</span> {student.email}
        </p>
        <p>
          <span className="label">Phone:</span> {student.phone}
        </p>
        <p>
          <span className="label">Address:</span> {student.address.suite}, {student.address.street}, {student.address.city}, {student.address.zipcode}
        </p>
        <p>
          <span className="label">Website:</span> {student.website}
        </p>
        <p>
          <span className="label">Company:</span> {student.company.name} - "{student.company.catchPhrase}"
        </p>
      </div>
    </div>
  );
};

export default StudentDetails;
