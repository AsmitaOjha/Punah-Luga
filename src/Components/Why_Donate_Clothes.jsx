import '../Styles/Why_Donate_Clothes.css'; 
import CircularProgress from './CircularProgress.jsx';
import donate from '../assets/images/donate.jpg';
import Counter from './Incrementing_counter.jsx';

function Why_Donate_Clothes(){
   
    return(
        <>
        <div className="why_donate_clothes_main_container">
            <h1>Why Donate Clothes?</h1>
            <p>Declutter your wardrobe. But leave your heart full.</p>
            <div className="donate_container">
               <div className="Donate_img_container"><img src={donate} alt="donate clothes" style={{ width: '400px', height: 'auto' }} /></div>
                <div className="box_By_giving_clothes">
                    <h3>By giving us your pre-loved clothes and textiles, you'll</h3>
                    <ul>
                        <li>✔️ <b>Help us save the planet</b>- your clothes don't go to landfill. </li>
                        <li>✔️ <b>Give your clothes a second home</b>- those in need around the world access to affordable clothing.</li>
                        <li>✔️ <b>Reduce waste</b> - Donating clothes reduces the environmental impact of textile production.</li>
                        <li>✔️ <b>Make a difference</b> - Your donation can improve someone's quality of life.</li>
                        <li>✔️ <b>Help to recycle</b> - You help recycle and upcycle clothes, reducing the need to cut down more trees.</li>
                    </ul>
                </div>
            </div>
                 <div className="box_Measuring_points">
                    <div className="box1">
                    <CircularProgress percentage={87} className="Circle"/>  <br/>
                    <h4>Of materials used to makeup clothing</h4>
                    <h3>END UP IN LANDFILL</h3>
                        <div className="box2">
                        <p>The world produces</p>
                        <Counter className="counter"/>
                        <p>of textile wastee every year</p>
                        </div>
                    </div>
                    
                   

                 </div>
        </div>
       
        </>
    );
}
export default Why_Donate_Clothes;