import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../Styles/Choose_who_you_are.css'; 


function Choose_who_you_are() {
    const navigate = useNavigate(); // Initialize navigate function

    const handleDonorClick = () => {
        navigate('/signup'); // Link to donor signup page
    };

    const handleCollectorClick = () => {
        navigate('/signup'); // Link to collector signup page
    };

    return (
        <div className='Who_main_container'>
            <h1 style={{ textAlign: 'center' }}>Choose Who You Are</h1>
            <div className="choose_who_you_are_container"> 
                <div className="half">
                    <h2>Donor</h2>
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleDonorClick}>
                        I am a Donor
                    </button>
                    <p className="description">Individual who wants to donate clothes to NGOs or recycling companies.</p>
                </div>
                <div className="half">
                    <h2>Collector</h2>
                    <button type="button" className="btn btn-primary btn-lg" onClick={handleCollectorClick}>
                        I am a Collector
                    </button>
                    <p className="description">NGO or organization that wishes to collect clothes from different people.</p>
                </div>
            </div>
        </div>
    );
}

export default Choose_who_you_are;
