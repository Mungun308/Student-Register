import {useEffect, useState} from 'react';
import "../styles/filter.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

const [filters, setFilters]=useState({
            id:'',
            gpa:'',
            school:''

        });
    
const [filteredresult, setFilteredResult]=useState([]);


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


export default  function Filter(){
    return(
        <div className='filter-box'>
            <h3>ШҮҮЛТҮҮР</h3>
            
            <div className='id-section'>
                <p className='title'>ID</p>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>22                             
                    </input>
                </label>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>23                             
                    </input>
                </label>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>24                             
                    </input>
                </label>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>25                             
                    </input>
                </label>
            </div>
            <div className='gpa-section'>
                <p className='title'>GPA</p>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>4</input>
                </label>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>3</input>
                </label>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>3</input>
                </label>
                <label>
                    <input type="checkbox"
                    className='checkbox'
                    checked={isChecked}
                    onChange={handleChange}>1</input>
                </label>
            </div>
            <div className='school-section'>
                 
                        <select 
                            name="school" 
                            className="filter-dropdown" 
                            value={form.school} 
                            onChange={handleChange}
                            required
                        >
                            <option value="">Сургууль сонгох</option>
                            {schools.map((s) => ( 
                            <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                     
            </div>
                            <button type='submit'>
                                <img src='./icons/search.svg'></img>
                            </button>
        </div>
    )
        
}