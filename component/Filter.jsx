import {useState} from 'react';
import "../styles/filter.css";

export default function Filter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    year: [],
    gpa: [],
    school: []
  });

  const years = ['22', '23', '24', '25'];
  const gpaRanges = ['4', '3', '2', '1'];
  const schools = ["МУИС", "ШУТИС", "ХУИС", "СЭЗИС", "ХҮИС", "МҮИС"];

  const handleYearChange = (year) => {
    const newYears = filters.year.includes(year)
      ? filters.year.filter(y => y !== year)
      : [...filters.year, year];
    
    const newFilters = { ...filters, year: newYears };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleGpaChange = (gpa) => {
    const newGpas = filters.gpa.includes(gpa)
      ? filters.gpa.filter(g => g !== gpa)
      : [...filters.gpa, gpa];
    
    const newFilters = { ...filters, gpa: newGpas };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSchoolChange = (school) => {
    const newSchools = filters.school.includes(school)
      ? filters.school.filter(s => s !== school)
      : [...filters.school, school];
    
    const newFilters = { ...filters, school: newSchools };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className='filter-box'>
      <h3>ШҮҮЛТҮҮР</h3>
      
      <div className='id-section'>
        <p className='title'>ID</p>
        {years.map(year => (
          <label key={year} className="checkbox-label">
            <input 
              type="checkbox"
              className='checkbox'
              checked={filters.year.includes(year)}
              onChange={() => handleYearChange(year)}
            />
            <span>{year}</span>
          </label>
        ))}
      </div>
      

      <div className='gpa-section'>
        <p className='title'>GPA</p>
        {gpaRanges.map(gpa => (
          <label key={gpa} className="checkbox-label">
            <input 
              type="checkbox"
              className='checkbox'
              checked={filters.gpa.includes(gpa)}
              onChange={() => handleGpaChange(gpa)}
            />
            <span>{gpa}</span>
          </label>
        ))}
      </div>
      
      <div className='school-section'>
        <p className='title'>Сургууль</p>
        {schools.map(school => (
          <label key={school} className="checkbox-label">
            <input 
              type="checkbox"
              className='checkbox'
              checked={filters.school.includes(school)}
              onChange={() => handleSchoolChange(school)}
            />
            <span>{school}</span>
          </label>
        ))}
      </div>
      <button type='submit' className='filter-submit'>
        <img src='./icons/search.svg'></img>
      </button>
    </div>
  );
}