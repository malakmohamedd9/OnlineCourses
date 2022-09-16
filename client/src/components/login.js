import React,{useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { link } from '../helper/constants'
import { useHistory } from 'react-router-dom'

export default function Login(props) {
  
    let history = useHistory();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    
    const handleSubmit = async e=>{
        e.preventDefault();
        axios.post( `${link}login`,{
        username: username,
        password: password
        }).then(res =>{
            if(res.data.data === "Enter valid credentials!"){
                setMessage(res.data.data);
            }
            else{
                localStorage.setItem('auth-token', res.data.data);
                history.push("/profile");
            }
        }).catch(error =>{
            console.log(error)
        });
    }
  
    return (

        <div>
            <div style={{backgroundColor:"white", height:"100%"}}>
            <div className="w3-bar w3-black">
                <button className="w3-bar-item w3-button w3-padding-large" onClick={() => history.push("/")}>HOME</button>
                <button className="w3-bar-item w3-button w3-padding-large w3-hide-small" onClick={() => history.push("/register")}>SIGN UP</button>
            </div>
            <br/>
            <br/>
            <br/>
            <div className="w3-modal-content w3-animate-top w3-card-4" style={{borderRadius: "25px"}}>
                <header className="w3-container w3-black w3-center w3-padding-32" style={{borderRadius: "25px"}}> 
                <h2 className="w3-wide w3-center" >SIGN IN</h2>
                </header>
                <br/>
                <div className="w3-container">
                    <form onSubmit={handleSubmit}>
                        <p style={{fontSize:"12pt", textAlign:"left"}}><label><FontAwesomeIcon icon={faEnvelope}/> Username</label></p>
                        <input className="w3-input w3-border" type="email" placeholder="Enter username" required onChange={e =>setUsername(e.target.value)}/>
                        <br/>
                        <p style={{fontSize:"12pt", textAlign:"left"}}><label><FontAwesomeIcon icon={faLock}/> Password</label></p>
                        <input className="w3-input w3-border" type="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)}/>
                        <br/>
                        <button className="w3-button w3-block w3-black w3-padding-16 w3-section w3-right" style={{borderRadius: "25px"}} type="submit">Login <FontAwesomeIcon icon={faCheck}/></button>
                    </form>
                </div>
                <br/>
            </div>
            <br/>
            {message}
            <br/>
            </div>
        </div>
    )
}