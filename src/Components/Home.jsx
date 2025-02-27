import React, { useRef } from 'react';
import '../Styles/Home.css'; // Import specific styles
import Footer from './Footer';
import Home_page from './Home_page'; // Import Home_page component
import Why_Donate_Clothes from './Why_Donate_Clothes';
import How_it_works from './How_it_works';
import Choose_who_you_are from './Choose_who_you_are';
import About_us from './About_us';

function Home() {
  // Create refs for each section
  const chooseSectionRef = useRef(null);
  const whyDonateRef = useRef(null);
  const howItWorksRef = useRef(null);
  const homePageRef = useRef(null);
  const about_usRef = useRef(null);


  // Functions to scroll to specific sections
  const scrollToHomePage = () => {
    homePageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAboutus = () => {
    about_usRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToChooseSection = () => {
    chooseSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhyDonateSection = () => {
    whyDonateRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorksSection = () => {
    howItWorksRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Pass scroll functions as props to Home_page */}
      <Home_page
        // scrollToHomePage={scrollToHomePage}
        scrollToChooseSection={scrollToChooseSection}
        scrollToAboutus={scrollToAboutus}
        scrollToWhyDonateSection={scrollToWhyDonateSection}
        scrollToHowItWorksSection={scrollToHowItWorksSection}
      
      />
      <section ref={chooseSectionRef} className="choose-who-you-are">
        <Choose_who_you_are />
      </section>
      <section ref={whyDonateRef} className="why-donate-clothes">
        <Why_Donate_Clothes />
      </section>
      <section ref={about_usRef} className="about-us">
        <About_us/>
      </section>
      <section ref={howItWorksRef} className="how-it-works">
        <How_it_works />
      </section> 
      <Footer />


    </>
  );
}

export default Home;
