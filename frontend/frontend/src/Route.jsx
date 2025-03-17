import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/profile';
import Generate from './components/Generate';
import Output from './components/output';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;