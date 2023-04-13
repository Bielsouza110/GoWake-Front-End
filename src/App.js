import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Componentes/home/Home";
import Login from "./Componentes/Login/Login";
import Event from "./Componentes/home/Events/Event";
import CreateAccount from "./Componentes/Login/CreateAccount/CreateAccount";
import Dashboard from "./Componentes/Dashboard/Dashboard";
import Athletes from "./Componentes/Dashboard/Athletes";
import CreateEvent from "./Componentes/Dashboard/CreateEvent";
import LiveResults from "./Componentes/Dashboard/LiveResults";
import ModidyEvent from "./Componentes/Dashboard/ModifyEvent";
import UploadXML from "./Componentes/Dashboard/UploadXML";
import Rules from "./Componentes/Dashboard/Rules";
import {useEffect, useState} from "react";
import axios from "axios";
import RulesLogin from "./Componentes/Login/rules/RulesLogin";


function App() {

    return (
        <Router>
            <Routes>
                {/*<Route path="/" element ={<Home/>}/>*/}
                <Route path="/" element={<Login/>}/>
                {/*<Route path="/event" element={<Event/>}/>*/}
                <Route path="/rules" element={<RulesLogin/>}/>
                <Route path="/createlogin" element={<CreateAccount/>}/>

                <Route path="/login/dashboard" element={<Dashboard/>}/>
                <Route path="/login/rules" element={<Rules/>}/>
                <Route path="/login/liveresults" element={<LiveResults/>}/>
                <Route path="/login/athletes" element={<Athletes/>}/>
                <Route path="/login/uploadxml" element={<UploadXML/>}/>

                <Route path="/login/createevent" element={<CreateEvent/>}/>
                <Route path="/login/modidyevent" element={<ModidyEvent/>}/>

            </Routes>
        </Router>
    );
}

export default App;
