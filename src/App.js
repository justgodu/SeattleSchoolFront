import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CSIP from "./pages/CSIP/CSIP";
import Login from "./pages/Login";
import CSIPEdit from "./pages/CSIP-edit/CSIP-edit";
import ISSLC from "./pages/ISSLC/ISSLC";
import ISSLCSchool from "./pages/ISSLCSchool/ISSLCSchool";
import ISSLCEdit from "./pages/ISSLC-edit/ISSLC-edit";
import Users from "./pages/Users/Users";
import UsersEdit from "./pages/Users-edit/Users-edit";
import UserNew from "./pages/User-new/User-new";

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

            <Route path={"/isslc-edit/:schoolId/:columnId/:rowId"} component={ISSLCEdit}>
            </Route>
            <Route path={"/isslc/:schoolId"} component={ISSLCSchool}></Route>
            <Route path={"/isslc"}>
                <ISSLC/>
            </Route>


            <Route path={"/users/:userId"} component={UsersEdit}></Route>
            <Route path={"/users-new"} component={UserNew}></Route>

            <Route path={"/users"}>
                <Users/>
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
