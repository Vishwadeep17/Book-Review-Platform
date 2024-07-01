import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Reviews from "./components/pages/Reviews";
import BookList from "./components/pages/BookList";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
        <Route path="/reviews" element={<Reviews />} />
        </Route>
        <Route path="/books" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default App;
