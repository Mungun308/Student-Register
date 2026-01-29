import {useState} from 'react';
import StudentForm from './component/StudentForm.jsx';
import { Header } from "./component/header.jsx";
import StudentTable from './component/StudentTable.jsx';
import Filter from './component/Filter.jsx';


export default function App(){
      const [students, setStudents] = useState([]);

        const addStudent = (student) => {
          setStudents((prev) => [
            ...prev,
            { ...student, key: Date.now() } 
          ]);
        };

        return (<BrowseRouter>
          <Routes>
              <Header />
              <StudentForm onAddStudent={addStudent} />
              <StudentTable students={students}/>
              <Route path='/' element={<Header/>}/>
              <Route path='/' elemnent={<StudentTable/>}/>
              <Route path='/' element={<StudentForm/>}/>
              <Route path='/' element={<Filter/>}/>
          </Routes>
          </BrowseRouter>
        );
}