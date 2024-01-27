import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login'
import ImageGallery from './Components/ImageGallery';
import './App.css'
import Head from './Components/head';
import SignPage from './Components/signup';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='sign' element={<SignPage />} />
        <Route path="/image-gallery" element={<ImageGallery />} />
        <Route path="/head" element={<Head />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
