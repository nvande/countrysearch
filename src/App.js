import React from 'react';
import Header from './components/Header.js';
import Search from './components/Search.js';
import Footer from './components/Footer.js';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Header/>
      <Search/>
      <Footer/>
    </div>
  );
}

export default App;
