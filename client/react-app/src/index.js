import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { render } from "react-dom";
import Cookies from 'universal-cookie';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login/Login';
import Upload from './components/UploadFile/Upload';
import Files from './components/Files/Files';

const rootElement = ReactDOM.createRoot(document.getElementById('root'));
const cookies = new Cookies();
//cookies.set('userid', '', { path: '/' });
let isLoggedId = cookies.get('userid');
rootElement.render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" 
          element={ isLoggedId == "" ? <Login /> : <Upload />} />
          <Route path="fileupload" element={<Upload />} />
          <Route path="files" element={<Files />} />
        </Routes>
      </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
