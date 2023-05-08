import { useAPIClient } from './api/axiosConfig';
import { useEffect, useState } from 'react';
import Search from './pages/Search';
import Navbar from './Navbar';
import Home from './pages/Home';
import About from './pages/About';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [hi,sethi] =  useState("fs");
console.log(hi)
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>

  );
}

export default App;
