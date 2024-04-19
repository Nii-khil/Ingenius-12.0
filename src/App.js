// import React from "react"
// import Navbar from "./components/Navbar"
// import "./style.css"
// export default function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//     </div>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import statement
import Navbar from "./components/Navbar";
import About from "./components/About";
import Call from "./components/Call"
// import Home from "./Home";
// import Services from "./Services";
// import Contact from "./Contact";
import "./style.css"

export default function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes> {/* Replaced Switch with Routes */}
                    <Route path="/about" element={<About />} /> {/* Updated Route syntax */}
                    {/* <Route path="/symptom" element={<Services />} /> Updated Route syntax */}
                    <Route path="/call" element={<Call />} /> Updated Route syntax
                    {/* <Route path="/" element={<Home />} /> Updated Route syntax */}
                </Routes> {/* Replaced Switch with Routes */}
            </div>
        </Router>
    );
}
