import { useState } from "react";
import "../styles/main.css";
import { notification } from 'antd';
import { db } from './firebase'; 
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function StudentForm({onAddStudent, setFormView}) {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    id: "",
    gpa: "",
    school: "",
    program: ""
  });

  const initialForm = {
    lastName: "",
    firstName: "",
    id: "",
    gpa: "",
    school: "",
    program: ""
  };

  const schools = ["МУИС", "ШУТИС", "ХУИС", "СЭЗИС", "ХҮИС", "МҮИС"];
  const programs = [
    "Програм хангамж",
    "Мэдээллийн технологи",
    "Мэдээллийн систем",
    "Кибер аюулгүй байдал",
    "Сүлжээний шинжээч",
    "Дата аналист",
    "Дата инженер",
    "Бизнесийн шинжээч"
  ];


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "students"), {
        firstName: form.firstName,
        lastName: form.lastName,
        id: form.id, 
        gpa: form.gpa,
        school: form.school,
        program: form.program,
        createdAt: new Date()
      });

      notification.success({
        title: 'Амжилттай',
        description: 'Оюутан бүртгэгдлээ!',
        placement: 'topRight'
      });



      onAddStudent(form);
      setForm(initialForm);
      setFormView(false)
    } catch (error) {
      console.error("Error adding document: ", error);
      notification.error({
        title: 'Алдаа',
        description: 'Бүртгэхэд алдаа гарлаа!',
        placement: 'topRight'
      });

    }
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <button class='plus' onClick={()=>setFormView(false)}>
        <img src='./icons/dropdown.svg'></img>
        </button>
      <h1>ОЮУТНЫ БҮРТГЭЛ</h1>
      
      <div className="row">
        <p className="attribute">Овог</p>
        <div className="textbox">
          <input
            name="lastName"
            value={form.lastName}
            placeholder="Овог"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <p className="attribute">Нэр</p>
        <div className="textbox">
          <input
            name="firstName"
            value={form.firstName}
            placeholder="Нэр"
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <p className="attribute">Оюутны ID</p>
        <div className="textbox">
          <input
            name="id"
            value={form.id}
            placeholder="22..."
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="row">
        <p className="attribute">GPA</p>
        <div className="textbox">
          <input
            name="gpa"
            value={form.gpa}
            placeholder="4.0"
            onChange={handleChange}
            type="number"
            step="0.1"
            min="0"
            max="4.0"
            required
          />
        </div>
      </div>

      <div className="row">
        <p className="attribute">Сургууль</p>
        <div className="textbox">
          <select 
            name="school" 
            className="form-dropdown" 
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
      </div>

      <div className="row">
        <p className="attribute">Хөтөлбөр</p>
        <div className="textbox">
          <select 
            name="program" 
            className="form-dropdown" 
            value={form.program} 
            onChange={handleChange}
            required
          >
            <option value="">Хөтөлбөр сонгох</option>
            {programs.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <button 
        type="submit" 
        className="submit" 
        disabled={!form.firstName || !form.id || !form.lastName}
           
      >
        БҮРТГЭХ
      </button>
    </form>
  );
}
