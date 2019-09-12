import React from 'react';
import './App.scss';

import { NavBar } from "./components/NavBar";
import Hero from './components/Hero';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;
