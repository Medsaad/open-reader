import React from 'react';
import { Header } from './components/Header';
import './App.css';
import Reads from './components/Reads';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <ul className='nav'>
          <li>
              <Link to="/books">Books</Link>
          </li>
          <li>
              <Link to="/reads">Reads</Link>
          </li>
          <li>
              <Link to="/notes">Notes</Link>
          </li>
      </ul>
      <div className="container">
       
          <Switch>
            
            <Route path="/books">
              <Books />
            </Route>
            <Route path="/reads">
              <Reads />
            </Route>
            <Route path="/notes">
              {/* <Notes /> */}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        
      </div>
    </div>
    </Router>
  );
}

export default App;
