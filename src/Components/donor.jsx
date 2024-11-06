import { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from './Navbar';
import Modal from 'react-modal';
import '../Styles/Donor.css';

Modal.setAppElement('#root');

function Donor() {
  const [profile, setProfile] = useState({ name: '', address: '', details: '' });
  const [donation, setDonation] = useState({ clothName: '', quantity: '', image: null, collectorId: '', name: '', contact: '', location: '' });
  const [collectors, setCollectors] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isProfileSetupComplete, setIsProfileSetupComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getDatabase();
  const storage = getStorage();

  useEffect(() => {
    if (currentUser) {
      const userRef = ref(db, `users/${currentUser.uid}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setProfile(userData);
          setIsProfileSetupComplete(!!userData.name); // Check if the profile is set up
        }
      });

      const collectorsRef = ref(db, 'collectors');
      onValue(collectorsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setCollectors(Object.keys(data).map(key => ({ id: key, ...data[key] })));
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
    } else {
      console.error('No user is currently logged in.');
    }
  }, [db, currentUser]);

  const validateForm = () => {
    return donation.clothName && donation.quantity && donation.image && donation.collectorId && donation.contact && donation.location && donation.name;
  };
  const handleDonationSubmit = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }
  
    if (currentUser) {
      setIsSubmitting(true);
  
      // Create a reference for the new donation under 'donations' and 'collectors/collectorId/Donation_request_details'
      const donationRef = push(ref(db, 'donations'));
      const collectorDonationRef = push(ref(db, `collectors/${donation.collectorId}/Donation_request_details`));
  
      const imageRef = storageRef(storage, `donations/${donation.image.name}`);
      uploadBytes(imageRef, donation.image)
        .then(() => getDownloadURL(imageRef))
        .then((downloadURL) => {
          // Prepare the donation data
          const donationData = {
            ...donation,
            donorId: currentUser.uid,
            status: 'pending',
            imageUrl: downloadURL
          };
  
          // Store the donation data in the 'donations' node
          set(donationRef, donationData)
            .then(() => {
              // Store the donation data in the 'collectors/collectorId/Donation_request_details' node
              set(collectorDonationRef, donationData);
  
              alert('Donation request submitted successfully');
              setDonation({
                clothName: '',
                quantity: '',
                image: null,
                collectorId: '',
                name: '',
                contact: '',
                location: ''
              });
              setIsSubmitting(false);
            })
            .catch((error) => {
              console.error('Error submitting donation:', error);
              alert('There was an error submitting your donation.');
              setIsSubmitting(false);
            });
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          alert('There was an error uploading the image.');
          setIsSubmitting(false);
        });
    } else {
      alert('You must be logged in to submit a donation.');
    }
  };
  

    

  const handleImageChange = (e) => {
    setDonation({ ...donation, image: e.target.files[0] });
  };

  const handleDeleteRequest = (requestId) => {
    if (currentUser) {
      const donationRef = ref(db, `donations/${requestId}`);
      set(donationRef, null)
        .then(() => {
          alert('Donation request deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting donation request:', error);
          alert('There was an error deleting the donation request.');
        });
    } else {
      alert('You must be logged in to delete a donation request.');
    }
  };

  // New function to handle profile setup
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (profile.name && profile.address) {
      set(ref(db, `users/${currentUser.uid}`), profile)
        .then(() => {
          setIsProfileSetupComplete(true);
        })
        .catch((error) => {
          console.error('Error setting up profile:', error);
          alert('There was an error setting up your profile.');
        });
    } else {
      alert('Please fill in all profile details.');
    }
  };

  return (
    <div className="donor-container">
      <Navbar />
      <div className="container donor-dashboard">
        <h1 className="text-center">Donor Dashboard</h1>
        <h2 className="text-center">User Type: Donor</h2>

        {/* Profile Setup Section */}
        <div className="card">
          <div className="card-body">
            <h3>Profile Setup</h3>
            {!isProfileSetupComplete ? (
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    required
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
                <button type="submit" className="btn btn-primary">Setup Profile</button>
              </form>
            ) : (
              <div>
                <h5>Profile Details</h5>
                <p><strong>Name:</strong> {profile.name}</p>
                <p><strong>Address:</strong> {profile.address}</p>
                <p><strong>Details:</strong> {profile.details}</p>
              </div>
            )}
          </div>
        </div>

        {/* Donation Section */}
        <div className="card">
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
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Quantity"
                  value={donation.quantity}
                  onChange={(e) => setDonation({ ...donation, quantity: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input type="file" className="form-control" onChange={handleImageChange} required />
              </div>
              <div className="mb-3">
                <select className="form-select" value={donation.collectorId} onChange={(e) => setDonation({ ...donation, collectorId: e.target.value })} required>
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
                  placeholder="Donar Name"
                  value={donation.name}
                  onChange={(e) => setDonation({ ...donation, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contact Details"
                  value={donation.contact}
                  onChange={(e) => setDonation({ ...donation, contact: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location"
                  value={donation.location}
                  onChange={(e) => setDonation({ ...donation, location: e.target.value })}
                  required
                />
              </div>
              <button type="button" className="btn btn-success" onClick={handleDonationSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Donation'}
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
                    <img src={request.imageUrl} alt="Image_preview" style={{ maxWidth: '200px' }} />
                    <a href={request.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a>
                  </div>
                )}
                {(request.status === 'accepted' || request.status === 'rejected' || request.status === 'pending')&& ( // Show delete button only for accepted requests
                  <button 
                    className="btn btn-danger btn-sm ms-2" 
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    Delete Request
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
</div>
  );
}

export default Donor;
