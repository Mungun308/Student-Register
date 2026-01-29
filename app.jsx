import {useState} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
  const [formview, setFormView] = useState(false);

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
    <BrowserRouter>
    
    <div className="app-container">
      <Header />
      <div className="main-content">
        <div className="sidebar">
          <Filter filters={filters} onFilterChange={updateFilters} />
        </div>
        
        <div className="content-area">
         {
          formview?
          <div>
              <Routes>
              <Route  path="/StudentForm" element={<StudentForm setFormView={setFormView} onAddStudent={addStudent}/>}/>
          </Routes>

          </div>:
          <div> <StudentTable students={students} filters={filters} setFormView={setFormView} /></div>
         }
        
        
        </div>
        
      </div>
    </div>
    
    </BrowserRouter>
  );
}