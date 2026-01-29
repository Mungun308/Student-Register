import React, { useState, useEffect } from "react";
import { db } from './firebase'; 
import { collection, getDocs } from "firebase/firestore";

export default function StudentTable({ students: localStudents, filters }) { 
  const [firebaseStudents, setFirebaseStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const fetchedStudents = querySnapshot.docs.map(doc => ({
          key: doc.id,
          ...doc.data()
        }));
        setFirebaseStudents(fetchedStudents);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const combined = [...firebaseStudents];
    
    localStudents.forEach(student=>{
      if (!combined.find(s=>s.id===student.id)) {
        combined.push({ ...student, key: student.id });
      }
    });
    
    let filtered = combined;
    
    //id iflter
    if (filters.year && filters.year.length > 0) {
      filtered = filtered.filter(student => {
        const studentYear = student.id ? student.id.substring(0, 2) : '';
        return filters.year.includes(studentYear);
      });
    }

    //gpa filter
    if (filters.gpa && filters.gpa.length > 0) {
      filtered = filtered.filter(student => {
        const gpa = parseFloat(student.gpa);
        return filters.gpa.some(range => {
          const min = parseFloat(range);
          const max = min + 1;
          return gpa >= min && gpa < max;
        });
      });
    }

    //school filter
    if (filters.school && filters.school.length > 0) {
      filtered = filtered.filter(student => 
        filters.school.includes(student.school)
      );
    }

    setFilteredStudents(filtered);
  }, [firebaseStudents, localStudents, filters]);

  return (
    <div className="table-container">
      <table className="student-table">
        <thead>
          <tr>
            <th>№</th>
            <th>Овог</th>
            <th>Нэр</th>
            <th>ID</th>
            <th>GPA</th>
            <th>Сургууль</th>
            <th>Хөтөлбөр</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student.key||student.id}>
              <td>{index+1}</td>
              <td>{student.lastName}</td>
              <td>{student.firstName}</td>
              <td>{student.id}</td>
              <td>{student.gpa}</td>
              <td>{student.school}</td>
              <td>{student.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}