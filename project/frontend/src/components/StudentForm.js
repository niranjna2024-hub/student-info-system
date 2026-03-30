import { useState } from "react";
//import api from "../services/api";

function StudentForm() {
  const [student, setStudent] = useState({
    name: "", email: "", course: "", institute: ""
  });

  const handleChange = e => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!student.email.includes("@")) {
      alert("Invalid Email");
      return;
    }
    //await api.post("/students/add", student);
    alert("Student Added Successfully");
  };

  return (
    <>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="course" placeholder="Course" onChange={handleChange} />
      <input name="institute" placeholder="Institute" onChange={handleChange} />
      <button onClick={submit}>Add Student</button>
    </>
  );
}

export default StudentForm;
