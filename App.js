
import { useState, useEffect } from "react";
export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const API_URL = "http://localhost:5001/api/students";
  useEffect(() => { fetchStudents(); }, []);
  const fetchStudents = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setStudents(data);
  };
  const addStudent = async (e) => {
    e.preventDefault();
    if (!name || !email || !course) return alert("Fill all fields");
    await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, course }) });
    setName(""); setEmail(""); setCourse("");
    fetchStudents();
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 Campus Connect</h1>
      <form onSubmit={addStudent} style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} />
        <button type="submit">Add Student</button>
      </form>
      <h2>Students List</h2>
      <ul>{students.map(s => <li key={s._id}>{s.name} | {s.email} | {s.course}</li>)}</ul>
    </div>
  );
}
