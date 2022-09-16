import React, {} from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebook, faPinterest, faSnapchat, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import '../styling/homepage.css'

export default function Homepage() {

    let history = useHistory();

    return (
        <div>
            <div className="w3-top">
                <div className="w3-bar w3-black w3-card">
                    <a href="#homepage" className="w3-bar-item w3-button w3-padding-large">HOME</a>
                    <a href="#signup" className="w3-bar-item w3-button w3-padding-large w3-hide-small">SIGN UP</a>
                    <button onClick={() => history.push("/login")} className="w3-bar-item w3-button w3-padding-large w3-hide-small">SIGN IN</button>
                    <a href="#contact" className="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
                </div>
            </div>

            <div className="w3-container w3-content w3-center w3-padding-64" id="homepage">
                <img src="./todo.png" className="w3-round" alt="text" style={{width:"45%"}}/>
                <p className="w3-opacity"><i>Welcome to Task Management Hero!</i></p>
                <div className="w3-row w3-padding-32">
                <div className="w3-third">
                    <p style={{fontFamily: "cursive"}}>Organize your tasks!</p>
                </div>
                <div className="w3-third">
                    <p style={{fontFamily:"cursive"}}>Simple to use!</p>
                </div>
                <div className="w3-third">
                    <p style={{fontFamily: "cursive"}}>Ease work load!</p>
                </div>
                </div>
            </div>

            <div className="w3-black" id="signup" style={{alignItems: "center"}}>
                <div className="w3-container w3-content w3-padding-64" style={{maxWidth:"800px", alignItems: "center"}}>
                <br/>
                <h2 className="w3-wide w3-center">Join Us!</h2>
                <p className="w3-opacity w3-center"><i>Sign up now for free!</i></p><br/>
                <div className="w3-row-padding w3-padding-32" >
                    <div className="w3-margin-bottom" style={{position:"center"}}>
                    <div className="w3-container w3-white w3-margin-bottom"><br/>
                        <p className="w3-opacity w3-left-align">Organize your tasks.</p>
                        <p className="w3-left-align">Sign up, create lists and organize your tasks with Task Management Hero!</p>
                        <button className="w3-button w3-black w3-margin-bottom" onClick={() => history.push("/register")}>Sign Up</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="w3-container w3-content w3-padding-64" style={{maxWidth:"800px"}} id="contact">
                <h2 className="w3-wide w3-center">CONTACT</h2>
                <p className="w3-opacity w3-center  "><i>We would be pleased to receive your feedback!</i></p>
                <div className="w3-row w3-padding-32">
                <div className="w3-col m6 w3-large w3-margin-bottom w3-left-align">
                <FontAwesomeIcon icon={faEnvelope} /> Email: taskmanagementhero@outlook.com<br/>
                </div>
                <div className="w3-col m6">
                    <form action="http://localhost:3000/" target="_blank">
                    <div className="w3-row-padding" style={{margin:"0- 16px 8px -16px"}}>
                        <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Name" required name="Name"/>
                        </div>
                        <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Email" required name="Email"/><br/>
                        </div>
                        <div className="w3-half">
                        <input className="w3-input w3-border" type="text" placeholder="Message" required name="Message"/>
                        </div>
                    </div>

                    <button className="w3-button w3-black w3-section w3-right" type="submit">SEND</button>
                    </form>
                </div>
                </div>

                <footer className="w3-container w3-padding-64 w3-center w3-opacity ">
                    <FontAwesomeIcon className="w3-hover-opacity" style={{width:"20px"}} icon={faFacebook} />
                    <FontAwesomeIcon className="w3-hover-opacity" style={{width:"20px"}} icon={faInstagram} />
                    <FontAwesomeIcon className="w3-hover-opacity" style={{width:"20px"}} icon={faSnapchat} />
                    <FontAwesomeIcon className="w3-hover-opacity" style={{width:"20px"}} icon={faPinterest} />
                    <FontAwesomeIcon className="w3-hover-opacity" style={{width:"20px"}} icon={faTwitter} />
                    <FontAwesomeIcon className="w3-hover-opacity" style={{width:"20px"}} icon={faLinkedin} />
                    <p className="w3-medium">Powered by <a href="https://www.linkedin.com/in/malak-mohamed-2b234421b/">Malak</a></p>
                </footer>
            </div>

        </div>
    )
}