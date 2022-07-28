import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Homepage from './components/homepage'
import Login from './components/login'
import Register from './components/register'
import ProfileAdmin from './components/profileAdmin'
import ProfileUser from './components/profileUser'
import ResetPassword from './components/resetPassword'
import ViewCategories from './components/viewCategories'
import ViewCourses from './components/viewCourses'

function App() {
  
  return (
    <Router>
      <div className="App">
        <Switch>

        <Route path ="/" exact component= {Homepage} />
        <Route path ="/login" exact component= {Login} />
        <Route path ="/register" exact component= {Register} />
        <Route path ="/profileAdmin" exact component= {ProfileAdmin} />
        <Route path ="/profileUser" exact component= {ProfileUser} />
        <Route path ="/resetPassword" exact component= {ResetPassword} />
        <Route path ="/viewCategories" exact component= {ViewCategories} />
        <Route path ="/viewCourses" exact component= {ViewCourses} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;