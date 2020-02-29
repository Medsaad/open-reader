import React from 'react';
import { Header } from './components/Header';
import './App.css';
import Reads from './components/Reads';
import { Link, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Books from './components/Books';
import Notes from './components/Notes';

function App() {
  return (
    <div className="App">
      <Header />
      <ul className='nav'>
          <li>
              <Link to="/">Home</Link>
          </li>
          <li>
              <Link to="/books">Books</Link>
          </li>
          <li>
              <Link to="/reads">Reads</Link>
          </li>
      </ul>
      <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/books" component={Books} />
            <Route exact path="/reads" component={Reads} />
            <Route exact path="/notes/:readId" component={Notes} />
          </Switch>
      </div>
    </div>
  );
}

export default App;
