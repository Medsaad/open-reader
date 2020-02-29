import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReaderProvider } from './Context';

ReactDOM.render(
<ReaderProvider>
    <Router>
        <App />
    </Router>
</ReaderProvider>
, document.getElementById('root'));
