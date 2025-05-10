import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import Shop from './pages/Shop';
import ShopContextProvider from './Context/ShopContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
    
  </React.StrictMode>,
);
