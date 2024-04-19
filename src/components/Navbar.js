import React from "react";
import { Link } from "react-router-dom";
import Logo from "/Users/nikhil/Documents/College/Hackathons/access-care/src/images/Preview 2.jpg";

export default function Navbar() {
    return (
        <div>
            <nav>
                <img src={Logo} className="logo" width={150} alt="Logo"></img>
                <div className="buttons">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/services">Symptom Checker</Link></li>
                        <li><Link to="/call">Consultation</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}