import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { CartProvider } from 'react-use-cart';

import './lib/i18n';
import './styles/index.css'
import './styles/custom.css'

import * as serviceWorker from './serviceWorker';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CartProvider>
          <App />
      </CartProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();