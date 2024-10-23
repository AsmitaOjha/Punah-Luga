import '../Styles/Footer.css'; 
import footerBackground from '../assets/images/leaf.jpg'; // Relative path
import logo from '../assets/images/logo.jpg';


function Footer(){
    const footerStyle = {
        backgroundImage: `url(${footerBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
       
      };
   
return(
    <>
    <div className="footer" style={footerStyle}>
        <br/>
        <div className="footer-content-container">
          <div className="footer-column">
            <h3>Quick Links </h3>
            <a href="#">Home</a>
            <a href="#">About us</a>
            <a href="#">Why Donate</a>
            <a href="#">Testimonials</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-column">
            <h3>In Partnership With</h3>
            <a href="#">XYZ NGO</a>
            <a href="#">ABC Delivery Service</a>
            <a href="#">PQR org</a>
          </div>
          <div className="footer-column">
            <h3>Follow us</h3>
            <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} /> 
            <a href="#">Youtube</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-end">
            <a href="#">Terms and conditions</a>
            <a href="#">Accessibility</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Privacy Policy</a>
            <p>© Copyright 2024 | All Rights Reserved | Punah Luga is a registered trademark of Your Donation Ltd | Company no 123456</p>
      </div>
    </div>
    </>
);
}
export default Footer;