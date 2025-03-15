import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    if (loginStatus === 'true' && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    navigate('/');
  };
  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome </h1>
          <button onClick={handleProfile}>profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>Welcome to Home Page</h1>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </div>
  );
}

export default Home;