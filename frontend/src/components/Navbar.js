import { Link, useNavigate } from "react-router-dom";
import React from 'react';

export default function NavBar() {
  const navigate = useNavigate();

  const handleNavigate = (to) => {
    navigate(to);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"><img className="passportIcon" src="./logopm1.png" alt="Logo" /></Link>
      </div>
      <ul className="links">
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <button onClick={() => handleNavigate('/register')}>Register</button>
        </li>
      </ul>
    </nav>
  );
}
