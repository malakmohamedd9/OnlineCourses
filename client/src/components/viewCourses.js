import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { link } from '../helper/constants'
import '../styling/homepage.css'

export default function ViewCourses() {

    let history = useHistory();

    return (
        <div>
            <div className="w3-top">
                <div className="w3-bar w3-black w3-card">
                    <a href="#homepage" className="w3-bar-item w3-button w3-padding-large">HOME</a>
                    <a href="#signup" className="w3-bar-item w3-button w3-padding-large w3-hide-small">SIGN UP</a>
                    <button onClick={() => history.push("/login")} className="w3-bar-item w3-button w3-padding-large w3-hide-small">SIGN IN</button>
                    <a href="#contact" className="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
                    <button onClick={() => history.push("/viewCourses")} className="w3-bar-item w3-button w3-padding-large w3-hide-small">COURSES</button>
                    <button onClick={() => history.push("/viewCategories")} className="w3-bar-item w3-button w3-padding-large w3-hide-small">CATEGORIES</button>
                </div>
            </div>
        </div>
    )
}