import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Homepage from './components/homepage'
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'
import ResetPassword from './components/resetPassword'
import CreateList from './components/createList'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>

        <Route path ="/" exact component= {Homepage} />
        <Route path ="/login" exact component= {Login} />
        <Route path ="/register" exact component= {Register} />
        <Route path ="/profile" exact component= {Profile} />
        <Route path ="/resetPassword" exact component= {ResetPassword} />
        <Route path ="/createList" exact component= {CreateList} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;