import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //<React.StrictMode>
    <ConfigProvider wave={{ disabled: true }}>
      
      <App />
    </ConfigProvider>
 // </React.StrictMode>
);

reportWebVitals();
