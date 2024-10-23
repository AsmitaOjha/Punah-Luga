import '../Styles/How_it_works.css'; 
import earth from '../assets/images/happy earth.gif';
import { useEffect, useState } from 'react';

function How_it_works() {
    const [activeStep, setActiveStep] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            const steps = document.querySelectorAll('.step');
            steps.forEach((step, index) => {
                const rect = step.getBoundingClientRect();
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    setActiveStep(index + 1);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="HTW-container">
                <div className="How_it_works">
                    <h1>How it Works</h1>
                    <Step number={1} active={activeStep >= 1}>
                        Sign up and create a profile
                    </Step>
                    <Step number={2} active={activeStep >= 2}>
                        Enter details about the clothes
                    </Step>
                    <Step number={3} active={activeStep >= 3}>
                        Choose a charity or recycling group
                    </Step>
                    <Step number={4} active={activeStep >= 4}>
                        Pick from the list of organizations
                    </Step>
                    <Step number={5} active={activeStep >= 5}>
                        Submit your request and wait
                    </Step>
                    <Step number={6} active={activeStep >= 6}>
                        Receive approval and contact
                    </Step>
                    <Step number={7} active={activeStep >= 7}>
                        Pack your clothes
                    </Step>
                    <Step number={8} active={activeStep >= 8}>
                        Clothes are collected
                    </Step>
                    <Step number={9} active={activeStep >= 9}>
                        Get a digital certificate
                    </Step>
                </div>
                <div className="please-donate">
                <img src={earth} alt="happy earth"  />

                    <h3>Please donate:</h3>
                    <ul> 
                        <li>✔️ Good quality clean adult's and children's clothing</li>
                        <li>✔️ Pairs of shoes</li>
                        <li>✔️ Handbags and belts</li>
                        <li>✔️ Curtains, towels and soft toys</li>
                        <li>✔️ Bed linen, sheets, duvet covers & pillow cases</li>
                    </ul>
                    <h3>Please don't give us:</h3>
                    <ul>
                        <li>❌ Stained or damaged clothing</li>
                        <li>❌ Duvet, pillows and cushions</li>
                        <li>❌ Carpets & rugs</li>
                        <li>❌ Plastic toys, board games</li>
                        <li>❌ Other household items</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

function Step({ number, children, active }) {
    return (
        <div className={`step ${active ? 'active' : ''}`}>
            <div className="step-number">{number}</div>
            <h5>{children}</h5>
        </div>
    );
}

export default How_it_works;
