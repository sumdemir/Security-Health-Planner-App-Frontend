import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 için doğru import
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd'; // Ant Design ConfigProvider importu

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ConfigProvider wave={{ disabled: true }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);

reportWebVitals();
