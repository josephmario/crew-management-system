// AddCrewMember.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddCrewMember = () => {
  const navigate = useNavigate ();
  const [showModal, setShowModal] = useState(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    address: '',
    birthdate: '',
    age: '',
    rank: '',
    height: '',
    weight: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/api/crew-members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            throw new Error('Failed to add crew member');
        }
        
        const data = await response.json();
        console.log('New crew member added:', data);
        setShowModal(true)
        setTimeout(() => {
            // setShowSuccessMessage(false); // Hide success message after 3 seconds
            setShowModal(false);
            navigate('/');
        }, 3000);
        // Handle success (e.g., show a success message)
    } catch (error) {
        console.error('Error adding new crew member:', error);
        // Handle error (e.g., show an error message)
    }
  };
  return (
    <div className="container">
            <h2>Add New Crew Member</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Middle Name</label>
                    <input type="text" className="form-control" name="middle_name" value={formData.middle_name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Birthdate</label>
                    <input type="date" className="form-control" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rank</label>
                    <input type="text" className="form-control" name="rank" value={formData.rank} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Height</label>
                    <input type="text" className="form-control" name="height" value={formData.height} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Weight</label>
                    <input type="number" className="form-control" name="weight" value={formData.weight} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Crew Member</button>
            </form>
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Upload Document</h5>
                      </div>
                      <div className="modal-body">
                          <div className="alert alert-success" role="alert">
                              Document submitted successfully!
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
  );
}

export default AddCrewMember;
