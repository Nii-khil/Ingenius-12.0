import React from "react";
import "./about.css";

export default function About() {
    return (
        <div className="about-container">
            <h2 className="about-heading">About Us</h2>
            <div className="about-text">
                <p>
                    At AcessCare, we are dedicated to transforming healthcare accessibility through innovative technology. Our platform seamlessly connects patients with skilled professionals for immediate consultations, diagnoses, and personalized medical guidance. With a focus on user-centric design and cutting-edge features such as real-time video consultations, machine learning-based symptom checking, and interactive health tips via chatbot, we empower individuals to take control of their health journey. Committed to making quality medical care accessible to everyone, we are revolutionizing the way healthcare is delivered.
                </p>
                <p>
                    For more information, please visit our <a href="#">website</a>.
                </p>
            </div>
        </div>
    )
}
