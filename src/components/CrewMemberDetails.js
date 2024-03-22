import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
function CrewMemberDetails() {
    const navigate = useNavigate ();
    const [crewMember, setCrewMember] = useState(null);
    
    const { id } = useParams();
    const getColor = (expiryDate) => {
        const currentDate = new Date();
        const differenceInDays = Math.ceil((new Date(expiryDate) - currentDate) / (1000 * 60 * 60 * 24));
    
        if (differenceInDays <= 7) {
          return 'red';
        } else if (differenceInDays <= 30) {
          return 'yellow';
        } else if (differenceInDays <= 90) {
          return 'orange';
        } else {
          return '';
        }
      };
    useEffect(() => {
        // Fetch data and filter by ID when component mounts
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/crew/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch crew member');
            }
            const data = await response.json();
            setCrewMember(data);
        } catch (error) {
            console.error('Error fetching crew member:', error);
        }
    };

    if (!crewMember) {
        return <div>Loading...</div>;
    }
    const handleView = () => {
        // Logic to handle view action, e.g., navigate to detail page
        // console.log('View clicked for:', row);
        navigate('/');
    };

    const calculateBMI = () => {
        const setWeight = crewMember.weight
        const setHeight = crewMember.height
        if (setHeight && setWeight) {
            const bmi = (setWeight / ((setHeight / 100) * (setHeight / 100))).toFixed(2);
            return bmi;
        }
        return null;
    };

    return (
        <div>
            <h2>Crew Member Details</h2>
            <p><strong>First Name:</strong> {crewMember.first_name}</p>
            <p><strong>Middle Name:</strong> {crewMember.middle_name}</p>
            <p><strong>Last Name:</strong> {crewMember.last_name}</p>
            <p><strong>Email:</strong> {crewMember.email}</p>
            <p><strong>Address:</strong> {crewMember.address}</p>
            <p><strong>Birth Date:</strong> {crewMember.birthdate}</p>
            <p><strong>Age:</strong> {crewMember.age}</p>
            <p><strong>Rank:</strong> {crewMember.rank}</p>
            <p><strong>Height:</strong> {crewMember.height}</p>
            <p><strong>weight</strong> {crewMember.weight}</p>
            {crewMember.height && crewMember.weight && (
                <p><strong>BMI:</strong> {calculateBMI()}</p>
            )}
            <ul>
            {crewMember.documents && crewMember.documents.map(document => (
              <li key={document.id} style={{ color: getColor(document.expiry_date) }}>
                {document.document_name} - Expiry Date: {document.expiry_date}
              </li>
            ))}
            </ul>
            <p><button onClick={() => handleView()} className="btn btn-primary m-auto">Back</button></p>
        </div>
    );
}

export default CrewMemberDetails;
