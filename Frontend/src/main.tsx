import { AuthProvider } from './context/AuthContext';
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import React from 'react';

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
     <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
