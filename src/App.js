import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/login/Login";
import CreateAccount from "./components/login/CreateAccount";
import Dashboard from "./components/dashboard/Dashboard";
import Athletes from "./components/dashboard/Athletes";
import CreateEvent from "./components/dashboard/CreateEvent";
import LiveResults from "./components/dashboard/LiveResults";
import ModidyEvent from "./components/dashboard/ModifyEvent";
import UploadXML from "./components/dashboard/UploadXML";
import Rules from "./components/dashboard/Rules";
import RulesLogin from "./components/login/RulesLogin";
import DetailCompetitions from "./components/dashboard/competitions/DetailCompetitions";
import {PrivateRoute} from "./privateRoute/PrivateRoute";

 function App() {
    return (
        <Router>
            <Routes>
                 {/*<Route path="/" element ={<Home/>}/>*/}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<Login/>}/>
                {/*<Route path="/event" element={<Event/>}/>*/}
                <Route path="/rules" element={<RulesLogin/>}/>
                <Route path="/createlogin" element={<CreateAccount/>}/>
                <Route path="/login/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
                <Route path="/login/rules" element={<PrivateRoute><Rules/></PrivateRoute>}/>
                <Route path="/login/liveresults" element={<PrivateRoute><LiveResults/></PrivateRoute>}/>
                <Route path="/login/athletes" element={<PrivateRoute><Athletes/></PrivateRoute>}/>
                <Route path="/login/uploadxml" element={<PrivateRoute><UploadXML/></PrivateRoute>}/>
                <Route path="/login/createevent" element={<PrivateRoute><CreateEvent/></PrivateRoute>}/>
                <Route path="/login/modidyevent" element={<PrivateRoute><ModidyEvent/></PrivateRoute>}/>

                <Route path="/login/dashboard/:id" element={<DetailCompetitions/>} />
            </Routes>
        </Router>
    );
}

export default App;
