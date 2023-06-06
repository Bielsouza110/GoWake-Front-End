import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Login from "./components/public-pages/login/Login";
import CreateAccount from "./components/public-pages/create/CreateAccount";
import Dashboard from "./components/private-pages/dashboard/Dashboard";
import Athletes from "./components/private-pages/athetes/Athletes";
import Events from "./components/private-pages/events/Events";
import LiveResults from "./components/private-pages/results/LiveResults";
import Competitons from "./components/private-pages/competitions/Competitions";
import UploadXML from "./components/private-pages/xml/UploadXML";
import Rules from "./components/private-pages/rules/Rules";
import RulesLogin from "./components/public-pages/rules/RulesLogin";
import DetailCompetitions from "./components/private-pages/dashboard/competitions/DetailCompetitions";
import {PrivateRoute} from "./privateRoute/PrivateRoute";
import Officials from "./components/private-pages/officers/Officials";

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
                <Route path="/login/officers" element={<PrivateRoute><Officials/></PrivateRoute>}/>
                <Route path="/login/uploadxml" element={<PrivateRoute><UploadXML/></PrivateRoute>}/>
                <Route path="/login/events" element={<PrivateRoute><Events/></PrivateRoute>}/>
                <Route path="/login/competitions" element={<PrivateRoute><Competitons/></PrivateRoute>}/>

                <Route path="/login/dashboard/:id" element={<DetailCompetitions/>} />
            </Routes>
        </Router>
    );
}

export default App;
