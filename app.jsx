

import {useState} from 'react';
import StudentForm from './component/StudentForm.jsx';
import { Header } from "./component/header.jsx";
import StudentTable from './component/StudentTable.jsx';
import Filter from './component/Filter.jsx';
import './styles/main.css';

export default function App(){
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    year: [],
    gpa: [],
    school: []
  });

  const addStudent = (student) => {
    setStudents((prev) => [
      ...prev,
      { ...student, key: Date.now() } 
    ]);
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Filter filters={filters} onFilterChange={updateFilters} />
        </div>
        <div className="content-area">
          <StudentForm onAddStudent={addStudent} />
          <StudentTable students={students} filters={filters} />
        </div>
      </div>
    </div>
  );
}