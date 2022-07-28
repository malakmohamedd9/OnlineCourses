import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { link } from '../helper/constants'

export default function ProfileUser() {

    let history = useHistory();
    const [state,setState] = useState({});

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
      }).catch(error =>{
          console.log(error);
      });
      
  }, []);

  const handleSignout = async e=>{

    localStorage.removeItem('auth-token');
    history.push('/');
  }

    return (
        <div >
          <div className="w3-top">
            <div className="w3-bar w3-grey w3-card">
              <div style={{position:"relative", left:"300px"}}>
              <h4 className="w3-bar-item">User</h4>
                <div style={{position:"relative", left:"980px"}}>
                  <button className="w3-bar-item w3-button w3-padding-large w3-hide-small" onClick= { handleSignout }>SIGN OUT</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w3-sidebar w3-collapse w3-grey w3-animate-left" style={{width:"300px"}}  ><br/>
            <div className="w3-container">
            <img src="/onlineCourseLogo.png" style={{width:"80%"}} alt="scratchassessmentsystem"/><br/><br/>
              <h4><b>Profile</b></h4>
              <hr/>
            </div>
            <div className="w3-bar-block">
              <a href="#portfolio" className="w3-bar-item w3-button w3-padding "><i className="fa fa-th-large fa-fw w3-margin-right"></i>PORTFOLIO</a>
            </div>
            <div className="w3-container">
              <br/>
            <h4><b>Edit Profile</b></h4>
            <hr/>
            </div>
            <div className="w3-bar-block">
              <button onClick={ () => history.push("/resetPassword") } className="w3-bar-item w3-button w3-padding "><i className="fa fa-th-large fa-fw w3-margin-right"></i>RESET PASSWORD</button>
            </div>
            <div className="w3-container">
              <br/>
            <h4><b>Course Registration</b></h4>
            <hr/>
            </div>
            <div className="w3-bar-block">
              <button onClick={ () => history.push("/") } className="w3-bar-item w3-button w3-padding"><i className="fa fa-envelope fa-fw w3-margin-right"></i>REGISTER COURSE</button>
              <button onClick={ () => history.push("/") } className="w3-bar-item w3-button w3-padding "><i className="fa fa-th-large fa-fw w3-margin-right"></i>REMOVE COURSE</button>
              <button onClick={ () => history.push("/") } className="w3-bar-item w3-button w3-padding "><i className="fa fa-th-large fa-fw w3-margin-right"></i>COMPLETE COURSE</button>
            </div>
          </div>

          <div className="w3-overlay w3-hide-large w3-animate-opacity w3-light-grey" style={{cursor:"pointer"}} title="close side menu" id="myOverlay"></div>

        </div>  
    )

}