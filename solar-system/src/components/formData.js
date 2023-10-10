import React, { useState } from 'react'
import axios from 'axios';
import PlanetData from '../planetData.json';
const FormData = ({close, planetName, callBack}) => {
    const [formData, setFormData] = useState({
        name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        planet_name: planetName,
        reg_date: '',
        profile_pic: '',
      });
      const [planetData, setPlanetData] = useState(PlanetData);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
          ...formData,
          profile_pic: file,
        });
      };
      // const updatePopulation = async () => {
      //   // const planet = planetData.planets.find((planet)=>{return planet.name===planetName});
      //   // planet.population_count+=1;
      // } 
      const handleParentCall = ({data}) => {
        console.log("updated data at form: ",data);
        callBack(data);
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        if (formData.phone.toString().length !== 10) {
            alert("Please enter a valid mobile number of 10 digits");
            return;
        }
        try {
            const response = await axios.post("http://localhost:4000/register", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(response.data);
            alert("user added");
            const updatedPlanetData = { ...planetData };
            const planetIndex = updatedPlanetData.planets.findIndex((planet) => planet.name === planetName);
            updatedPlanetData.planets[planetIndex].population_count += 1;
            setPlanetData(updatedPlanetData);
            console.log(updatedPlanetData);
            const res = await axios.post("http://localhost:4000/update", updatedPlanetData, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log(res);
            // const res2 = await axios.get("http://localhost:4000/getData");
            // console.log("updated data at form: ",updatedPlanetData);
            // handleParentCall(updatedPlanetData);
            
        } catch (err) {
            if (err.response && err.response.status === 409) {
                alert("User already registered");
            }else if(err.response && err.response.status === 400){
                alert("only .webp or .png image File expected");
            } else {
                console.log(err);
            }
        }
      };
      const callParentFunction = () => {
        close();
      }
      return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} action="/upload" method="POST">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            type="date"
            id="age"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="form-input" 
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone">Phone :</label>
          <input
            type="number"
            id="planetName"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="form-input" 
          />
        </div>
        <div>
          <label htmlFor="reg_date">Registration Date:</label>
          <input
            type="date"
            id="registrationDate"
            name="reg_date"
            value={formData.reg_date}
            onChange={handleChange}
            required
            className="form-input" 
          />
        </div>
        <div>
          <label htmlFor="profile_pic">Profile Picture:</label>
          <input
            type="file"
            id="profile_pic"
            name="profile_pic"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input" 
          />
        </div>
        <div>
          <button type="submit" className="form-button">Submit</button> {/* Add class name to the button */}
        </div>
        <div>
          <button type="submit" className="form-button" onClick={callParentFunction}>Close Form</button> {/* Add class name to the button */}
        </div>
      </form>
    </div>
  );
}
export default FormData;