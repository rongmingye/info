import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";

import Teacher from './pages/Teacher';
import Student from './pages/Student';
import Login from './pages/Login';
import Follow from './pages/Follow';
import Revise from './pages/Revise';
import ModifyPwd from './pages/ModifyPwd';

import Recruit from './pages/Recruit';
import PublicRecruit from './pages/PublicRecruit';

import './pages/css/page.css';

class App extends Component {

  render() {
    return (
        <div className="App">
            <BrowserRouter>    
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path='/teacher' component={Teacher} />
                    <Route path='/student' component={Student} />
                    <Route path='/follow' component={Follow} />
                    <Route path='/revise' component={Revise} />
                    <Route path='/modifyPwd' component={ModifyPwd} />

                    <Route path='/recruit' component={Recruit} />
                    <Route path='/publicRecruit' component={PublicRecruit} />        
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
