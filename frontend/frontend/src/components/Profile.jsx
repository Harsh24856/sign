import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Profile = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                if (!email) {
                    console.log("No email found in localStorage");
                    return;
                }
                
                const response = await axios.post("http://localhost:2000/profile", { email });
                
                if (response.data.success) {
                    setUserData(response.data);
                    console.log(response.data);
                } else {
                    alert("User not found");
                }
            } catch (error) {
                console.log("error", error);
            }
        };
        
        fetchUserData();
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <h2>Profile</h2>
                    <p>Username: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    <p>Password:{userData.password}</p>
                </div>
            ) : (
                <div>Loading profile data...</div>
            )}
        </div>
    )
}

export default Profile