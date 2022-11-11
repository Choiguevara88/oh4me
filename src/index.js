import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { MemberProvider } from './Contexts/MemberContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(  
    // <MemberProvider>
        <App />
    // </MemberProvider>
);

reportWebVitals();
