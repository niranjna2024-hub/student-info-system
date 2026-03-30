import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    roll: "",
    email: "",
    department: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetch("https://student-info-system-4d6t.onrender.com/api/students")
        .then((res) => res.json())
        .then((data) => setStudents(data));
    }
  }, [isLoggedIn]);

  const loginHandler = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      setIsLoggedIn(true);
    } else {
      alert("Enter email and password");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.roll || !form.email || !form.department) {
      alert("All fields required");
      return;
    }

    if (editId) {
      const res = await fetch(
        `http://localhost:5000/api/students/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      setStudents(students.map((s) => (s._id === editId ? data : s)));
      setEditId(null);
    } else {
      const res = await fetch("http://localhost:5000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStudents([...students, data]);
    }

    setForm({ name: "", roll: "", email: "", department: "" });
  };

  const deleteStudent = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE",
    });
    setStudents(students.filter((s) => s._id !== id));
  };

  const editStudent = (s) => {
    setForm(s);
    setEditId(s._id);
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1 className="main-title">Student System</h1>
        <div className="card">
          <h2>Login</h2>
          <form onSubmit={loginHandler}>
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="main-title">Student Information System</h1>

      <div className="card">
        <h2>{editId ? "Edit Student" : "Add Student"}</h2>
        <form onSubmit={submitHandler}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Roll"
            value={form.roll}
            onChange={(e) => setForm({ ...form, roll: e.target.value })}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({ ...form, department: e.target.value })
            }
          />
          <button type="submit">
            {editId ? "Update" : "Add Student"}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Student List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>{s.email}</td>
                <td>{s.department}</td>
                <td>
                  <button onClick={() => editStudent(s)}>Edit</button>
                  <button onClick={() => deleteStudent(s._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
