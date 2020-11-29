import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './routes/App';

ReactDOM.render(
  <React.Fragment>
    <App />
    <footer>
      &copy; Máximo De Michieli
    </footer>
  </React.Fragment>,
  document.getElementById('root')
);