import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './Pages/SignUp';
import Success from './Pages/Success';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Gov. Service Application
        </p>
      </header>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
