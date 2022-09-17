import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { link } from '../helper/constants'

export default function ProfileUser() {

  let history = useHistory();
  const [state,setState] = useState({});
  const [lists,setLists] = useState({});

  if(localStorage.getItem('auth-token') === null){
    history.push('/login');
  }

  useEffect(() => {
      axios.get(`${link}viewProfile`,{
        headers: {
          'Authorization': localStorage.getItem('auth-token')
          }
      }).then(res =>{
          setState(res.data.data);
          setLists(res.data.lists);
          document.getElementById("task").style.display = false;
      }).catch(error =>{
          console.log(error);
      });
  }, []);

  const handleSignout = async e=>{
    localStorage.removeItem('auth-token');
    history.push('/');
  }

  const handleTasks = async e=>{
    history.push('/listView');
  }

  function helperLists(list) {
    if(list!==undefined && list.length>0){
        return list.map(elem =>{
            return(
              <div className="w3-third w3-margin-bottom">
              <ul className="w3-ul w3-border w3-white w3-center w3-opacity w3-hover-opacity-off">
                <li className="w3-black w3-xlarge w3-padding-32" key={elem.name.toString()}>{elem.name}</li>
                <li className="w3-padding-16" key={elem.type.toString()}>List Type: {elem.type}</li>
                <li className="w3-padding-16" key={elem.createdAt.toString()}>Created At: {elem.createdAt}</li>
                <h className="w3-padding-16 w3-large">Tasks</h>
                <div id="task">{helperTasks(elem.tasks)}</div>
                <li className="w3-light-grey w3-padding-24">
                  <button onClick= { handleTasks } className="w3-button w3-black w3-padding-large w3-hover-grey">View List</button>
                  <br/>
                </li>
              </ul>
            </div>
            )
        });
    }
  }

  function helperTasks(list) {
    if(list!==undefined && list.length>0){
        return list.map(elem =>{
            return(
              <div >
              <ul className="w3-ul w3-border w3-white w3-center w3-opacity w3-hover-opacity-off">
                <li className="w3-black">{elem.title}</li>
                <li>Priority: {elem.priority}</li>
                <li>Description: {elem.description}</li>
                <li>Priority: {elem.priority}</li>
                <li>Status: {elem.status}</li>
                <li>Start Date: {elem.startDate}</li>
                <li>End Date: {elem.endDate}</li>
              </ul>
            </div>
            )
        });
    }
  }

  return (
        <div>
          <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
              <div style={{position:"relative", left:"300px"}}>
                <div style={{position:"center"}}>
                  <button className="w3-bar-item w3-button w3-padding-large w3-hide-small" onClick= { handleSignout }>SIGN OUT</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w3-sidebar w3-collapse w3-black w3-animate-left" style={{width:"300px"}}  ><br/>
            <div className="w3-container">
            <img src="/todo.png" style={{width:"80%"}} alt="text"/><br/><br/>
            <h4><b>Edit Profile</b></h4>
            <hr/>
            </div>
            <div className="w3-bar-block">
              <button onClick={ () => history.push("/resetPassword") } className="w3-bar-item w3-button w3-padding "><i className="fa fa-th-large fa-fw w3-margin-right"></i>RESET PASSWORD</button>
            </div>
            <div className="w3-container">
              <br/>
            <h4><b>Lists</b></h4>
            <hr/>
            </div>
            <div className="w3-bar-block">
              <button onClick={ () => history.push("/createList") } className="w3-bar-item w3-button w3-padding "><i className="fa fa-th-large fa-fw w3-margin-right"></i>CREATE LIST</button>
            </div>
          </div>

          <div className="w3-main" style={{marginLeft:"300px"}}>
            <div className="w3-container w3-padding-large">
              <div id="portfolio">
                <br/>
                <br/>
                <h4>Username</h4>
                <h4><b>
                  <li>{state.username}</li>
                </b></h4>
                <hr/>
              </div>

              <div id="lists">
                <h4>My Lists</h4>
                <br/>
                  <div className="w3-row-padding" style={{margin:"0 -16px"}}>
                    {helperLists(lists)}
                  </div>
              </div>
            </div>
          </div>

        </div>  
  )
}