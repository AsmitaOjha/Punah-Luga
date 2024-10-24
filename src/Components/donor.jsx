import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// Set the app element for accessibility
Modal.setAppElement('#root');

function Donor() {
  const [profile, setProfile] = useState({ name: '', address: '', details: '' });
  const [donation, setDonation] = useState({ clothName: '', quantity: '', image: null, collectorId: '', contact: '', location: '' });
  const [collectors, setCollectors] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getDatabase();
  const storage = getStorage(); // Initialize Firebase Storage

  useEffect(() => {
    const collectorsRef = ref(db, 'collectors');
    onValue(collectorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCollectors(Object.keys(data).map(key => ({ id: key, ...data[key] })));
      }
    });

    const userRef = ref(db, `users/${currentUser.uid}`);
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        setProfile(userData);
      }
    });

    const donationsRef = ref(db, 'donations');
    onValue(donationsRef, (snapshot) => {
      const donationsData = snapshot.val();
      const requests = [];
      for (const key in donationsData) {
        if (donationsData[key].donorId === currentUser.uid) {
          requests.push({ id: key, ...donationsData[key] });
        }
      }
      setDonationRequests(requests);
    });
  }, [db, currentUser.uid]);

  const handleProfileSubmit = () => {
    const userRef = ref(db, `users/${currentUser.uid}`);
    set(userRef, profile);
    alert('Profile updated successfully');
  };

  const handleDonationSubmit = () => {
    const donationRef = push(ref(db, 'donations'));
    const collectorRef = ref(db, `collectors/${donation.collectorId}/donations`); // Path to collector's donations

    // Upload image to Firebase Storage
    const imageRef = storageRef(storage, `donations/${donation.image.name}`);
    uploadBytes(imageRef, donation.image)
      .then(() => {
        // Get the download URL
        return getDownloadURL(imageRef);
      })
      .then((downloadURL) => {
        // Create donation object with download URL
        const donationData = {
          ...donation,
          donorId: currentUser.uid,
          status: 'pending',
          imageUrl: downloadURL // Store the download URL
        };

        // Save donation to donations collection
        set(donationRef, donationData)
          .then(() => {
            // Save donation ID in the collector's donations
            set(push(collectorRef), donationData);
            alert('Donation request submitted successfully');
            setDonation({ clothName: '', quantity: '', image: null, collectorId: '', contact: '', location: '' });
          })
          .catch((error) => {
            console.error('Error submitting donation:', error);
            alert('There was an error submitting your donation.');
          });
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        alert('There was an error uploading the image.');
      });
  };

  const handleImageChange = (e) => {
    setDonation({ ...donation, image: e.target.files[0] });
  };

  return (
    <div className="container donor-dashboard my-5">
      <h1 className="text-center">Donor Dashboard</h1>
      <h2 className="text-center">User Type: Donor</h2>

      {/* Profile Setup Section */}
      <div className="card my-4">
        <div className="card-body">
          {!profile.name ? (
            <h3>Set up your Profile</h3>
          ) : (
            <h3>Your Profile</h3>
          )}
          <form>
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
              <textarea
                className="form-control"
                placeholder="Details"
                value={profile.details}
                onChange={(e) => setProfile({ ...profile, details: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleProfileSubmit}>
              Save Profile
            </button>
          </form>
        </div>
      </div>

      {/* Donation Section */}
      <div className="card my-4">
        <div className="card-body">
          <h3>Donate Clothes</h3>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Cloth Name"
                value={donation.clothName}
                onChange={(e) => setDonation({ ...donation, clothName: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={donation.quantity}
                onChange={(e) => setDonation({ ...donation, quantity: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input type="file" className="form-control" onChange={handleImageChange} />
            </div>
            <div className="mb-3">
              <select className="form-select" value={donation.collectorId} onChange={(e) => setDonation({ ...donation, collectorId: e.target.value })}>
                <option value="">Select a Collector</option>
                {collectors.map(collector => (
                  <option key={collector.id} value={collector.id}>{collector.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Contact Details"
                value={donation.contact}
                onChange={(e) => setDonation({ ...donation, contact: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Location"
                value={donation.location}
                onChange={(e) => setDonation({ ...donation, location: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-success" onClick={handleDonationSubmit}>
              Submit Donation
            </button>
          </form>
        </div>
      </div>

      {/* Donation Requests Section */}
      <div className="card my-4">
        <div className="card-body">
          <h3>Your Donation Requests</h3>
          <ul className="list-group">
            {donationRequests.map(request => (
              <li key={request.id} className="list-group-item">
                Cloth: {request.clothName}, Quantity: {request.quantity}, Status: {request.status}
                {request.imageUrl && (
                  <div>
                    <a href={request.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for Image Upload Confirmation */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Image Upload Confirmation"
      >
        <h2>Upload Confirmation</h2>
        <p>Your image has been uploaded successfully!</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default Donor;
