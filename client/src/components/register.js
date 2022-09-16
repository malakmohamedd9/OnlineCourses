import React,{useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { link } from '../helper/constants'
import '../styling/register.css'
import '../styling/registerstyle.css'

export default function Register(props) {
  
    let history = useHistory();

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [passwordCheck,setPasswordCheck] = useState('');
    const [message,setMessage] = useState('');
    
    const handleSubmit = async e=>{
        e.preventDefault();
        axios.post( `${link}register`,{
        username: username,
        password: password,
        passwordCheck: passwordCheck
        }).then(res =>{
            setMessage(res.data);
        }).catch(error =>{
            console.log(error)
        });
    }
  
    return (

        <div>
            <div className="w3-bar w3-black">
                <button className="w3-bar-item w3-button w3-padding-large" onClick={ () => history.push("/") }>HOME</button>
                <button className="w3-bar-item w3-button w3-padding-large" onClick={ () => history.push("/login") } >SIGN IN</button>
            </div>
            <div style={{backgroundColor:"white", height:"100%"}}>
            <br/>
            <br/>
            <div className="w3-modal-content w3-animate-top w3-card-4" style={{borderRadius: "25px"}}>
                <header className="w3-container w3-black w3-center w3-padding-32" style={{borderRadius: "25px"}}> 
                <h2 className="w3-wide w3-center">SIGN UP</h2>
                </header>
                <br/>
                <div className="w3-container">
                    <form onSubmit={handleSubmit}>
                        <p style={{fontSize:"12pt", textAlign:"left"}}><label><FontAwesomeIcon icon={faEnvelope} /> Username</label></p>
                        <input className="w3-input w3-border" type="email" placeholder="Enter username" required onChange={e =>setUsername(e.target.value)}/>
                        <br/>
                        <p style={{fontSize:"12pt", textAlign:"left"}}><label><FontAwesomeIcon icon={faLock} /> Password</label></p>
                        <input className="w3-input w3-border" type="password" placeholder="Enter password" required onChange={e => setPassword(e.target.value)} />
                        <br/>
                        <p style={{fontSize:"12pt", textAlign:"left"}}><label><FontAwesomeIcon icon={faLock} /> Password</label></p>
                        <input className="w3-input w3-border" type="password" placeholder="Confirm password" required name="password" onChange={e => setPasswordCheck(e.target.value)} />
                        <br/>
                        <button className="w3-button w3-block w3-black w3-padding-16 w3-section w3-right" style={{borderRadius: "25px"}} type="submit">Register <FontAwesomeIcon icon={faCheck} /> </button>
                    </form>
                </div>
            </div>
            {message}
            <br/>
            </div>
        </div>
    )
}