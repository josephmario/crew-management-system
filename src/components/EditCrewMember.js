// EditCrewMember.js
import React, { useState, useEffect } from 'react';

const EditCrewMember = ({ crewMember, onUpdateCrewMember }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    // Set initial values when crewMember prop changes
    if (crewMember) {
      setName(crewMember.name);
      setRole(crewMember.role);
    }
  }, [crewMember]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate inputs
    if (!name || !role) {
      alert('Please enter name and role');
      return;
    }
    // Update crew member
    onUpdateCrewMember({ ...crewMember, name, role });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Crew Member</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Crew Member</button>
      </form>
    </div>
  );
}

export default EditCrewMember;
