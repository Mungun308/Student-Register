
import * as React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('', {
    id: 'index',
    header: '№',
    cell: (info) => info.row.index + 1,
    size: 50,
  }),
  columnHelper.accessor('lastName', {
    header: 'Овог',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('firstName', {
    header: 'Нэр',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('gpa', {
    header: 'GPA',
    cell: (info) => info.getValue(),
    size: 80,
  }),
  columnHelper.accessor('school', {
    header: 'Сургууль',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('program', {
    header: 'Хөтөлбөр',
    cell: (info) => info.getValue(),
    size: 180,
  }),
];

export default function StudentTable({ students: localStudents, filters }) {
  const [firebaseStudents, setFirebaseStudents] = React.useState([]);
  const [combinedData, setCombinedData] = React.useState([]);

  //firebase s fretch hiih
  React.useEffect(()=> {
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


  React.useEffect(() => {
   
    const combinedMap = new Map();
    
    //firebase-s 
    firebaseStudents.forEach(student => {
      if (student.id) {
        combinedMap.set(student.id, student);
      }
    });
    
    //ijil id-tai bol local dr hadgalna
    localStudents.forEach(student => {
      if (student.id) {
        combinedMap.set(student.id, { ...student, key: student.id });
      }
    });
    
    const combined = Array.from(combinedMap.values());
    
    let filtered = combined;
    
    if (filters.year && filters.year.length > 0) {
      filtered = filtered.filter(student => {
        if (!student.id) return false;
        const studentYear = student.id.toString().substring(0, 2);
        return filters.year.includes(studentYear);
      });
    }

    if (filters.gpa && filters.gpa.length > 0) {
      filtered = filtered.filter(student => {
        const gpa = parseFloat(student.gpa);
        if (isNaN(gpa)) return false;
        
        return filters.gpa.some(range => {
          const min = parseFloat(range);
          return gpa >= min && gpa < min + 1;
        });
      });
    }

    // Filter school
    if (filters.school && filters.school.length > 0) {
      filtered = filtered.filter(student => 
        student.school && filters.school.includes(student.school)
      );
    }

    setCombinedData(filtered);
  }, [firebaseStudents, localStudents, filters]);

  const table = useReactTable({
    data: combinedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <h2>Оюутны жагсаалт</h2>
      
      {combinedData.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Оюутан олдсонгүй
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} style={{ width: header.getSize() }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            Нийт: {combinedData.length} оюутан
          </div>
        </div>
      )}
    </div>
  );
}