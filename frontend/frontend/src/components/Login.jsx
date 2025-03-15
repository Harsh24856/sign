import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:2000/login", loginData);
            if (response.data.success) {
                setIsLoggedIn(true);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', loginData.email);
                localStorage.setItem('userData', loginData);
                navigate("/");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Login failed");
        }
        
        setLoginData({
            email: "",
            password: ""
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="email" 
                    onChange={handleChange}
                    name="email"
                    value={loginData.email}
                />
                <input 
                    type="password" 
                    placeholder="password"  
                    onChange={handleChange}
                    name="password"
                    value={loginData.password}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;