import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import "../styles/filter.css";

const [filters, setFilters]=useState({
            id:'',
            gpa:'',
            school:''

        });
    
const [filteredresult, setFilteredResult]=useState([]);

useEffect(()=>{
    const applyIdFilters=()=>{
        let filtered= student.filter(students=>{
            if(students.id===isChecked.id){

            }
        })
    }
})


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

            </div>

        </div>
    )
        
}