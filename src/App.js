import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Componentes/home/Home";
import Login from "./Componentes/Login/Login";
import Event from "./Componentes/home/Event/Event";
import CreateAccount from "./Componentes/CreateAccount/CreateAccount";
import Dashboard from "./Componentes/Dashboard/Dashboard";
import BoxTeste1 from "./Componentes/Dashboard/boxTeste1";
import BoxTeste2 from "./Componentes/Dashboard/BoxTeste2";


function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element ={<Home/>}/>
              <Route path="/login" element ={<Login/>}/>
              <Route path="/event" element ={<Event/>}/>
              <Route path="/createlogin" element ={<CreateAccount/>}/>
              <Route path="/login/dashboard" element ={<Dashboard/>}/>
              <Route path="/login/dashboard/box1" element ={<BoxTeste1/>}/>
              <Route path="/login/dashboard/box2" element ={<BoxTeste2/>}/>
          </Routes>
      </Router>
  );
}

export default App;
