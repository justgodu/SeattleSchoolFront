import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CSIP from "./pages/CSIP/CSIP";
import Login from "./pages/Login";
import CSIPEdit from "./pages/CSIP-edit/CSIP-edit";

function App() {
  return (
    <Router>
      <div className={""}>

        <Switch>
            <Route path={"/login"}>
                <Login/>
            </Route>


            <Route path={"/csip/:schoolId/:goalId"} component={CSIPEdit}>
            </Route>
            <Route path={"/csip"}>
                <CSIP/>
            </Route>
            <Route path={"/"}>
                <Dashboard/>
            </Route>
        </Switch>

      </div>

    </Router>
  );
}

export default App;
