import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Event from "./components/home/Events/Event";
import CreateAccount from "./components/login/CreateAccount/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";
import Athletes from "./components/dashboard/Athletes";
import CreateEvent from "./components/dashboard/CreateEvent";
import LiveResults from "./components/dashboard/LiveResults";
import ModidyEvent from "./components/dashboard/ModifyEvent";
import UploadXML from "./components/dashboard/UploadXML";
import Rules from "./components/dashboard/Rules";
import {useEffect, useState} from "react";
import axios from "axios";
import RulesLogin from "./components/login/rules/RulesLogin";
import DetailCompetitions from "./components/dashboard/competitions/DetailCompetitions";


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

                <Route path="/login/dashboard/:id" element={<DetailCompetitions/>} />
            </Routes>
        </Router>
    );
}

export default App;
