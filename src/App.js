import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Componentes/home/Home";
import Login from "./Componentes/Login/Login";

function App() {
  return (
      <Router>
          <Routes>
                <Route path="/" element ={<Home/>}/>
              <Route path="/login" element ={<Login/>}/>
          </Routes>
      </Router>
  );
}

export default App;
