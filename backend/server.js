const express = require('express');
const app = express();
const Connectbd = require('./database/db');
const User = require('./database/user');
const cors = require('cors');


async function connectDb() {
    try {
        await Connectbd();
        console.log('Connected to database');
    }
    catch(e) {
        console.log('Connection error:', e.message);
        process.exit(1);  // Exit if database connection fails
    }
}

// Initialize database connection
connectDb();

app.use(cors({
    origin: 'http://localhost:5173',  // Your frontend URL
    credentials: true
}));
app.use(express.json());

app.post('/register',async(req,res)=>{
try{
    const {username,email,password,confirm_password}=req.body;
    if (password!==confirm_password) {
        return res.json({
            success: false,
             message: 'Passwords do not match' });
    }
    const user=new User({
        username,
        email,
        password
    });
    await user.save();
    console.log(req.body);
    res.json({
        success: true,
         message: 'User registered successfully' }
);
}catch(e){
    console.log(req.body);
    res.json({
        success: false,
         message: 'error' });
    
}});

app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if (user===null) {
        return res.json({
            success: false,
             message: 'User does not exist' });
    }
    if (user.password!==password) {
        return res.json({
            success: false,
             message: 'Invalid password' });
    }
    console.log(req.body);
    res.json({
        success:true,
        message:'User logged in successfully'
    });
});

// Separate profile endpoint
app.post('/profile',async(req,res)=>{
    const {email}=req.body;
    try {
        const user=await User.findOne({email});
        if (user){
            return res.json({
                success: true,
                username: user.username,
                email: user.email,
                password: user.password
            });
        } else {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }
    } catch(error) {
        console.log(error);
        return res.json({
            success: false,
            message: 'Server error'
        });
    }
});

app.listen(2000, () => {
    console.log('Server is running on port 2000');
});