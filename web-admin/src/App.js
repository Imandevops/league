import './static/css/styles.css'

import './static/css/font-awesome.css';
import './static/css/dialog.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import './static/css/bootstrap.min.css';


import { BrowserRouter } from "react-router-dom";
import MainRouter from "./components/MainRouter";
import ToastContainer from './components/toast/ToastContainer'

function App() {

  return (
    <div>
      <BrowserRouter basename='/admin'>
        <ToastContainer />
        <MainRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;

  // "proxy": "http://localhost:8080"
  // "proxy": "http://172.20.127.163:3001" for Production Main Version
  // "proxy": "http://192.168.9.100:3001" for Stage


