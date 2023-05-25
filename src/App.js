import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/public-pages/login/Login";
import CreateAccount from "./components/public-pages/create/CreateAccount";
import Dashboard from "./components/private-pages/dashboard/Dashboard";
import Athletes from "./components/private-pages/athetes/Athletes";
import CreateEvent from "./components/private-pages/events/CreateEvent";
import LiveResults from "./components/private-pages/results/LiveResults";
import ModidyEvent from "./components/private-pages/events/ModifyEvent";
import UploadXML from "./components/private-pages/xml/UploadXML";
import Rules from "./components/private-pages/rules/Rules";
import RulesLogin from "./components/public-pages/rules/RulesLogin";
import DetailCompetitions from "./components/private-pages/dashboard/competitions/DetailCompetitions";
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
