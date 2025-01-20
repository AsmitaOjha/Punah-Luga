import React from 'react';
import '../Styles/About_us.css';

const About_us = () => {
  const teamMembers = [
    { name: 'Asmita Ojha', image: 'src/assets/images/2.jpg' },
    { name: 'Rohit Pal', image: 'src/assets/images/rohit.jpg' },
    { name: 'Jayanti Kumari Awasthi', image: 'src/assets/images/ja.jpg' },
  ];

  return (
    <section className="about-us-section">
      <div className="container">
        <h2 className="about-us-title">About Us</h2>
        <p className="about-us-description">
          Welcome to <strong>Punah-Luga</strong>, a platform dedicated to connecting donors of preused clothes with collectors such as recycling companies, organizations, NGOs, government agencies, and thrift stores. These entities work with preused clothes to donate them to those in need or recycle and upcycle them, contributing to a circular economy and promoting sustainable fashion.
        </p>
        <p className="about-us-description">
          At Punah-Luga, we aim to encourage the reuse of clothes, spread awareness about the fast fashion industry's impact, and advocate for sustainable choices before buying and discarding clothing.
        </p>
        <p className="about-us-description">
          This website is a collaborative effort by a team of CSIT students from Siddhanath Science Campus:
        </p>

        {/* Team Section */}
        <div className="team-list">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} className="team-member-image" />
              <p className="team-member-name">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About_us;
