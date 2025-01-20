import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useAuth } from "../firebase/AuthContext"; // Import useAuth
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar1 from "./Navbar1";
import "../Styles/Collector.css";

function Collector() {
  const { currentUser, loading } = useAuth(); // Use the AuthContext
  const [profile, setProfile] = useState({ name: "", address: "", contact: "" });
  const [donations, setDonations] = useState([]);
  const [isProfileSubmitted, setIsProfileSubmitted] = useState(false);
  const db = getDatabase();

  // Fetching collector profile data
  useEffect(() => {
    if (currentUser) {
      const collectorRef = ref(db, `collectors/${currentUser.uid}`);
      onValue(collectorRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProfile(data);
          setIsProfileSubmitted(true);
        } else {
          setProfile({ name: "", address: "", contact: "" });
          setIsProfileSubmitted(false);
        }
      });
    }
  }, [db, currentUser]);

  // Fetching donations data
  useEffect(() => {
    const donationsRef = ref(db, "donations");
    onValue(donationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setDonations(Object.keys(data).map((key) => ({ id: key, ...data[key] })));
      } else {
        setDonations([]);
      }
    });
  }, [db]);

  const handleProfileSubmit = () => {
    const collectorRef = ref(db, `collectors/${currentUser.uid}`);
    set(collectorRef, { ...profile });
    alert("Profile updated successfully");
    setIsProfileSubmitted(true);
  };

  const handleAcceptDonation = (donationId) => {
    const donationRef = ref(db, `donations/${donationId}`);
    set(donationRef, {
      ...donations.find((d) => d.id === donationId),
      status: "accepted",
      collectorId: currentUser.uid,
      collectorDetails: profile,
    });
    alert("Donation accepted");
  };

  const handleRejectDonation = (donationId) => {
    const donationRef = ref(db, `donations/${donationId}`);
    set(donationRef, {
      ...donations.find((d) => d.id === donationId),
      status: "rejected",
      collectorId: currentUser.uid,
      collectorDetails: profile,
    });
    alert("Donation rejected");
  };

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render authentication check
  if (!currentUser) {
    return <div>Please log in to access the Collector dashboard.</div>;
  }

  return (
    <div className="collector-container">
      <Navbar1 />
      <div className="container collector-dashboard">
        <h1 className="text-center">Collector Dashboard</h1>

        {/* Profile Section */}
        <section className="profile-section mb-4">
          <h3>Set up your Profile</h3>
          {isProfileSubmitted ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Profile Details</h5>
                <p className="card-text">
                  <strong>Name:</strong> {profile.name}
                </p>
                <p className="card-text">
                  <strong>Address:</strong> {profile.address}
                </p>
                <p className="card-text">
                  <strong>Contact:</strong> {profile.contact}
                </p>
              </div>
            </div>
          ) : (
            <>
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
              <button className="btn btn-primary" onClick={handleProfileSubmit}>
                Save Profile
              </button>
            </>
          )}
        </section>

        {/* Donation Requests Section */}
        <section className="donation-requests">
          <h3>Donation Requests</h3>
          {donations.filter((d) => d.status === "pending").length > 0 ? (
            donations.filter((d) => d.status === "pending").map((donation) => (
              <div key={donation.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{donation.clothName}</h5>
                  <p className="card-text">Quantity: {donation.quantity}</p>
                  <div className="mb-3">
                    <img
                      src={donation.imageUrl}
                      alt="Cloth"
                      className="img-fluid"
                      style={{ maxHeight: "200px", width: "auto" }}
                    />
                  </div>
                  <p className="card-text">Donor ID: {donation.donorId}</p>
                  <div className="donor-info">
                    <h6>Donor Details:</h6>
                    <p>Name: {donation.name}</p>
                    <p>Location: {donation.location}</p>
                    <p>Contact: {donation.contact}</p>
                  </div>
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => handleAcceptDonation(donation.id)}
                  >
                    Accept Donation
                  </button>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleRejectDonation(donation.id)}
                  >
                    Reject Donation
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending donation requests available.</p>
          )}
        </section>

        {/* Accepted Donations Section */}
        <section className="accepted-donations">
          <h3>Accepted Donations</h3>
          {donations.filter((d) => d.status === "accepted").length > 0 ? (
            donations.filter((d) => d.status === "accepted").map((donation) => (
              <div key={donation.id} className="card mb-3">
                <div className="card-body">
                  <h5 className="card-title">{donation.clothName}</h5>
                  <p className="card-text">Quantity: {donation.quantity}</p>
                  <div className="mb-3">
                    <img
                      src={donation.imageUrl}
                      alt="Cloth"
                      className="img-fluid"
                      style={{ maxHeight: "200px", width: "auto" }}
                    />
                  </div>
                  <p className="card-text"><strong>Donor ID:</strong> {donation.donorId}</p>
                  <div className="donor-info">
                    <h6>Donor Details:</h6>
                    <p><strong>Name:</strong> {donation.name}</p>
                    <p><strong>Location:</strong> {donation.location}</p>
                    <p><strong>Contact:</strong> {donation.contact}</p>
                  </div>
                  
                </div>
              </div>
            ))
          ) : (
            <p>No accepted donations yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Collector;
