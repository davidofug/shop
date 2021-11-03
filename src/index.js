import React from 'react';
import ReactDOM from 'react-dom';
import './components/css/style.css';
import App from './components/App';
import AuthProvider from './components/contexts/Auth'

import reportWebVitals from './reportWebVitals';
import CartProvider from './components/contexts/Cart';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
