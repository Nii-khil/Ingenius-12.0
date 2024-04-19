// import React from "react"
// import Logo from "/Users/nikhil/Documents/College/Hackathons/access-care/src/images/Preview 2.jpg"
// export default function Navbar() {
//     return(
//         <div>
//             <nav>
//                 <img src = {Logo} className="logo" width={150}></img>
//                 <div className="buttons">
//                     <ul>
//                         <li><a href="#">Home</a></li>
//                         <li><a href="#">About</a></li>
//                         <li><a href="#">Services</a></li>
//                         <li><a href="#">Contact</a></li>
//                     </ul>
//                 </div>
//             </nav>
//         </div>
//     )
// }

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
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}
