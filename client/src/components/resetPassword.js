import React,{useState}  from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons'
import { link } from '../helper/constants'

export default function ResetPassword() {

    let history = useHistory();

    const [password,setpassword] = useState('');
    const [newPassword,setnewPassword] = useState('');
    const [passwordCheck,setpasswordCheck] = useState('');
    const [message,setMessage] = useState('');

    if(localStorage.getItem('auth-token') === null){
        history.push('/login');
    }
    else{

        const handleSubmit = async e=>{
            e.preventDefault();
            axios.post(`${link}resetPassword`,{
                password: password,
                newPassword: newPassword,
                passwordCheck: passwordCheck
            },
            {
                headers:{
                    'Authorization': localStorage.getItem('auth-token'),
                }
            }).then(res=>{
                setMessage(res.data);
            }).catch(error =>{
                console.log(error);
            })
        }

        const handleSignout = async e=>{
            localStorage.removeItem('auth-token');
            history.push('/');
        }
        
        return (

            <div>
                <div>
                    <div className="w3-bar w3-black">
                    <button className="w3-bar-item w3-button w3-padding-large" onClick={history.goBack}>PROFILE</button>
                    <button className="w3-bar-item w3-button w3-padding-large" onClick={handleSignout}>SIGN OUT</button>
                        </div>
                        <div style={{backgroundColor:"white", height:"100%"}}>
                        <br/>
                        <br/>
                        <br/>
                        <div className="w3-modal-content w3-animate-top w3-card-4" style={{borderRadius: "25px"}}>
                            <header className="w3-container w3-black w3-center w3-padding-32" style={{borderRadius: "25px"}}>
                            <h2 className="w3-wide w3-center" >Reset Password</h2>
                            </header>
                            <br/>
                            <div className="w3-container w3-left-align">
                            <div>
                                <form onSubmit={handleSubmit}>
                                <br/>
                                    <p style={{fontSize:"12pt", textAlign:"left"}}><label><FontAwesomeIcon icon={faLock} /> Password</label></p>
                                <div>
                                    <input type="password"  placeholder="Enter old password" onChange={e =>setpassword(e.target.value)} />
                                </div>
                                <br/>
                                <div>
                                    <input type="password"  placeholder="Enter new password" onChange={e => setnewPassword(e.target.value)} />
                                </div>    
                                <br/>
                                <div>
                                    <input type="password"  placeholder="Confirm new password" onChange={e => setpasswordCheck(e.target.value)} /> 
                                </div>
                                <br/>
                                <div style = {{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <button onClick={handleSubmit} className="w3-button w3-block w3-black w3-padding-16 w3-section w3-right" style={{borderRadius: "25px"}} type="submit">Submit <FontAwesomeIcon icon={faCheck} /> </button>
                                </div>
                                </form>
                            </div>
                            </div>
                            <br/>
                        </div>
                        <br/>
                        {message}
                        <br/>
                        </div>
                    </div>

            </div>
        )
    }
}