import React from 'react';
import '../Styles/Home_page.css'; // Import styles for this section
import backgroundImage from '../assets/images/bg.jpg'; // Background image
import donation from '../assets/images/donation1.gif';
import Navbar from './Navbar';
// import '../Styles/Navbar.css';

function Home_page({ scrollToChooseSection,scrollToHomePage, scrollToWhyDonateSection, scrollToHowItWorksSection, scrollToAboutus,scrollToWho }) {
    return (
        <div className='Main-home_container'>
            <img src={backgroundImage} alt="Background" className="background-image" />
            <Navbar
              scrollToChooseSection={scrollToHomePage}
              scrollToWhyDonateSection={scrollToWhyDonateSection}
              scrollToHowItWorksSection={scrollToHowItWorksSection}
              scrollToAboutus={scrollToAboutus}
              scrollToWho ={scrollToWho}
             />
            <div className='Home_container'>
                <div className="content"> {/* Align content on the left */}
                    <h1>Donate Clothes through Punah-Luga</h1>
                    <p>A platform that introduces cloth donation to individuals</p>
                    <button 
                        type="button" 
                        className="btn btn-primary btn-lg"
                        onClick={scrollToChooseSection} // Scroll to next section
                    >
                        Get Started
                    </button>
                </div>
                
                <div className="featured-img-container">   
                    <img src={donation} alt="butterfly" className="featured-img" /> {/* Align image on the right */}
                </div>
            </div>
        </div>
    );
}

export default Home_page;
