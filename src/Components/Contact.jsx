import backgroundImage from '../assets/images/bg.jpg'; // Background image
import Navbar from './Navbar';
import '../Styles/Contact.css'; // Import styles for this section
import Footer from './Footer';
import React from "react";

function Contact() {
    return (
        <>
            <div className="Main_contact_container">
            <img src={backgroundImage} alt="Background" className="background-image" />
                <Navbar />
                <div className="contact-box">
                    <h1>Contact Us</h1>
                    <p>Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                    {/* Directly styling form elements without the container */}
                    <div className="form-floating mb-3 ">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Your full Name" />
                        <label htmlFor="floatingInput">Your Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="mail" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="Address" />
                        <label htmlFor="floatingInput">Address</label>
                    </div>
                    <div className="form-floating">
                        <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2"></textarea>
                        <label htmlFor="floatingTextarea2">Message</label>
                    </div>
                    <input class="btn btn-primary" type="submit" value="Submit"></input>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
