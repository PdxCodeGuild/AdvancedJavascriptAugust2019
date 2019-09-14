import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
 
import './App.css';

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
)

const About = () => (
  <div>
    <h1>About</h1>
  </div>
)

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <AnimatedSwitch
        atEnter={{ opacity: 0, left: -50 }}
        atLeave={{ opacity: 0, left: 50, }}
        atActive={{ opacity: 1, left: 0, }}
        className="switch-wrapper"
      >
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
      </AnimatedSwitch>
    </Router>
  );
}

export default App;
