import './App.css';
import NavBar from './components/NavBar';

import React, { Component } from 'react'
import News from './components/News';
import {BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <NavBar />
          <Routes>
          <Route path="/" element={<News key="general" country='in' category="general" />} /> 
          <Route path="/business" element={<News key="business" country='in' category="business" />} /> 
          <Route path="/entertainment" element={<News key="entertainment" country='in' category="entertainment" />} /> 
          <Route path="/health" element={<News key="health" country='in' category="health" />} />
          <Route path="/science" element={<News key="science" country='in' category="science" />} />
          <Route path="/sports" element={<News key="sports" country='in' category="sports" />} /> 
          <Route path="/technology" element={<News key="technology" country='in' category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
