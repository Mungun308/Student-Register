import React, { useState, useEffect } from "react";
import { db } from './firebase'; 
import { collection, getDocs } from "firebase/firestore";

export default function StudentTable({ students }) { 
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const firebaseStudents = querySnapshot.docs.map(doc => ({
          key: doc.id,
          ...doc.data()
        }));
        setDataSource(firebaseStudents);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, []);
//local
  useEffect(() => {
    if (students && students.length > 0) {
      const combined=[...dataSource];
      students.forEach(student => {
        if (!combined.find(s=>s.id===student.id)) {
          combined.push({ ...student,key: student.id });
        }
      });
      setDataSource(combined);
    }
  }, [students]);

  const columns=[
    {
      title: "Овог",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Нэр",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "GPA",
      dataIndex: "gpa",
      key: "gpa",
    },
    {
      title: "Сургууль",
      dataIndex: "school",
      key: "school",
    },
    {
      title: "Хөтөлбөр",
      dataIndex: "program",
      key: "program",
    },
  ];

  let count=1;

  return (
    <div style={{ width: "90%", margin: "20px auto" }}>
      <table>
        <thead>
          <tr>
              <th>"№"</th>
              <th>"Овог"</th>
              <th>"Нэр"</th>
              <th>"ID"</th>
              <th>"GPA"</th>
              <th>"Сургууль"</th>
              <th>"Хөтөлбөр"</th>
          </tr>
        </thead>
        <tbody>
            {students.map((student)=>(
              <tr key={student.id}>
                <td>{count++}</td>
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