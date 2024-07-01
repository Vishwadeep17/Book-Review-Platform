import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Reviews from "./components/pages/Reviews";
import BookList from "./components/pages/BookList";
import './App.css'; 

const App = () => {
  const [isLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={isLoggedIn ? <Reviews /> : <Navigate to="/login" />} />
        <Route path="/books"  element={isLoggedIn ? <BookList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
