
import {useState} from 'react';
import StudentForm from './component/StudentForm.jsx';
import { Header } from "./component/header.jsx";
// import StudentTable from './component/StudentTable.jsx';

export default function App(){
      const [students, setStudents] = useState([]);

        const addStudent = (student) => {
          setStudents((prev) => [
            ...prev,
            { ...student, key: Date.now() } 
          ]);
        };

        return (
          <>
            <Header />
            <StudentForm onAddStudent={addStudent} />
            {/* <StudentTable students={students}/> */}
          </>
        );
}