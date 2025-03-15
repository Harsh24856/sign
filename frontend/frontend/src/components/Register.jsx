import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/register", registerData);
            console.log(response.data);
            if (response.data.success) {
                navigate("/login");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Registration failed");
        }
        setRegisterData({
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username" 
                    onChange={handleChange}
                    name="username"
                    value={registerData.username}
                />
                <input 
                    type="email"
                    placeholder="Email" 
                    onChange={handleChange}
                    name="email"
                    value={registerData.email}
                />
                <input 
                    type="password" 
                    placeholder="Password"  
                    onChange={handleChange}
                    name="password"
                    value={registerData.password}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"  
                    onChange={handleChange}
                    name="confirm_password"
                    value={registerData.confirm_password}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;