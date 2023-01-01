import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Componentes/home/Home";
import Login from "./Componentes/Login/Login";
import Event from "./Componentes/home/Event/Event";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element ={<Home/>}/>
              <Route path="/login" element ={<Login/>}/>
              <Route path="/event" element ={<Event/>}/>
          </Routes>
      </Router>
  );
}

export default App;
