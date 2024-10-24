import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Navbar from './Navbar';

function Collector() {
  const [profile, setProfile] = useState({ name: '', address: '', contact: '' });
  const [donations, setDonations] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getDatabase();
  const storage = getStorage(); 

  useEffect(() => {
    const donationsRef = ref(db, 'donations');
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDonations(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      }
    });
  }, [db]);

  const handleProfileSubmit = () => {
    const collectorRef = ref(db, `collectors/${currentUser.uid}`);
    set(collectorRef, { ...profile, imageURL }); 
    alert('Profile updated successfully');
  };

  const handleAcceptDonation = (donationId) => {
    const donationRef = ref(db, `donations/${donationId}`);
    set(donationRef, { ...donations.find(d => d.id === donationId), status: 'accepted', collectorId: currentUser.uid, collectorDetails: profile });
    alert('Donation accepted');
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageReference = storageRef(storage, `donations/${file.name}`);
      uploadBytes(storageReference, file)
        .then(() => {
          getDownloadURL(storageReference).then((url) => {
            setImageURL(url); 
            alert('Image uploaded successfully');
          });
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
          alert('Failed to upload image');
        });
    }
  };

  return (
    <div className="container collector-dashboard my-5">
      <Navbar />
      <h1 className="text-center">Collector Dashboard</h1>
      
      <section className="profile-section mb-4">
        <h3>Set up your Profile</h3>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={profile.address}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Contact"
            value={profile.contact}
            onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>
        <button className="btn btn-primary" onClick={handleProfileSubmit}>Save Profile</button>
      </section>

      <section className="donation-requests">
        <h3>Donation Requests</h3>
        {donations.filter(d => d.status === 'pending').map(donation => (
          <div key={donation.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{donation.clothName}</h5>
              <p className="card-text">Quantity: {donation.quantity}</p>
              <div className="mb-3">
                <img src={donation.image} alt="Cloth" className="img-fluid" style={{ maxHeight: '200px', width: 'auto' }} />
              </div>
              <p className="card-text">Donor ID: {donation.donorId}</p>
              <div className="donor-info">
                <h6>Donor Details:</h6>
                <p>Name: {donation.donorName}</p> 
                <p>Location: {donation.location}</p>
                <p>Contact: {donation.contact}</p>
              </div>
              <a 
                href={donation.image} 
                download 
                className="btn btn-info mt-3" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Download Image
              </a>
              <button className="btn btn-success mt-3" onClick={() => handleAcceptDonation(donation.id)}>Accept Donation</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Collector;
