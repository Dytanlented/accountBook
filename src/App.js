import React from 'react';
import "./bootstrap.css";
import './App.css';
import { BrowserRouter as Router , Route, Link} from "react-router-dom"

import Home from "./containers/Home";
import Create from "./containers/Create"

function App() {
  return (
    <Router>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/edit/998">Edit</Link>
      </ul>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/create" component={Create} />
        <Route path="/edit/:id" component={Create} />
      </div>
    </Router>
  );
}

export default App;
