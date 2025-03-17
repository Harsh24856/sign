import axios from 'axios';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Generate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        exam: '',
        date: '',
        hours: 2,
        class: '',
        language: ''
    });
    const [output,Setoutput]=useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Calculate remaining days
        const examDate = new Date(formData.date);
        const today = new Date();
        const remainingDays = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

        const prompt = `Act as an expert academic advisor. Create a structured study plan for a student in ${formData.class} preparing for ${formData.exam} exam in ${remainingDays} days with ${formData.hours} hours available per day.

Provide a detailed study plan with the following format:
[Introduction]
    - syllabus
1. [Main Focus Topics]
   - Subtopic 1
   - Subtopic 2
2.  [Advanced Topics]
   - Subtopic 1
   - Subtopic 2
3.  [Practice and Revision]
   - Mock Tests with  only clickable links
   - Weak Area Improvement
4. Final Week: [Exam Preparation Strategy]
   - Last-minute revision tips
   - Mental preparation techniques

6.divide it into section of days(like day1-17 and so on)
7.give a detailed plan for each day like monday to saturday
Ensure the plan is:
- Tailored to the specific exam
- Realistic given the study hours
- Includes a mix of learning, practice, and revision
- Provides clear, actionable daily/weekly goals in a detailed and log format also provide redirectable links (only add clickable links) always add links
do not provide table format
tranlste all the text into ${formData.language}
also give check list with checkboxes for the topics`;
try{
    const response=await axios.post("http://localhost:2000/generate",{prompt});
    console.log(response.data);
    setLoading(false);
    if(response.data.success){
        navigate('/output')
        console.log(response.data.data);
       
       localStorage.setItem('output',response.data.data);
        
    }else{
        alert("Study plan generation failed")
    }
}catch(error){
    console.log("error",error);
    setLoading(false);
}
   
    };

 

    return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input">Exam Name:</label>
          <input
            type="text"
            id="input"
            name="exam"
            value={formData.exam}
            onChange={handleInputChange}
            placeholder="JEE(main), NEET, etc."
          />
          {errors.input && <span className="error-message">{errors.input}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="date">Date Of Exam:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <span className="error-message">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hours">Study Hours/Day:</label>
          <div className='hours-display'>{formData.hours} hours</div>
          <input
            type="range"
            id="hours"
            name="hours"
            className='hours-range'
            value={formData.hours}
            onChange={(e)=>{
              setFormData({...formData, hours: e.target.value})
            }}
            min="2"
            max="18"
            step="1"
            style={{ width: '100%' }}
          />
          {errors.hours && <span className="error-message">{errors.hours}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="class">Class:</label>
          <select
            id="class"
            name="class"
            className='class-select'
            value={formData.class}
            onChange={handleInputChange}
          >
            <option value="">Select your class</option>
            <option value="11">11th Standard</option>
            <option value="12">12th Standard</option>
            <option value="Drop">Drop</option>
            <option value="University">University</option>
          </select>
          {errors.class && <span className="error-message">{errors.class}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            name="language"
            className='class-select'
            value={formData.language}
            onChange={handleInputChange}
          >
            <option value="">Select your language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujrati">Gujrati</option>
            <option value="Kannada">Kannada</option>
            <option value="Telugu">Telugu</option>
            <option value="Tamil">Tamil</option>
            <option value="Kannada">Kannada</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Urdu">Urdu</option>
            <option value="Bengali">Bengali</option>
            <option value="Odia">Odia</option>
            <option value="Assamese">Assamese</option>
            <option value="Nepali">Nepali</option>
            <option value="Other">Other</option>
            
            
          </select>
          {errors.class && <span className="error-message">{errors.class}</span>}
        </div>
        
       
        

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Generate;