import { BrowserRouter } from "react-router-dom";
import MainRouter from './MainRouter'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import './static/css/font-awesome.css';
import "./static/css/ReactToastify.css";
import "./static/css/styles.css";
import './static/css/dialog.css';
import './static/css/react-carousel.css'
import ToastContainer from "./components/toast/ToastContainer";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;

  // "proxy": "http://localhost:8080"
  // "proxy": "http://172.20.127.163:3001" for Production Main Version
  // "proxy": "http://192.168.9.100:3001" for Stage

  
