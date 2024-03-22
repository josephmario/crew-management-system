import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function AddCrewDocumentation() {
    const navigate = useNavigate ();
    const [selectedCrew, setSelectedCrew] = useState([]);
    const [documentName, setDocumentName] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [issuedDate, setIssuedDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [crew, setCrew] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCrew = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Token not found. Please log in.');
                return;
            }
    
            try {
                const response = await fetch('http://localhost:8000/api/crew', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setCrew(data);
                    setLoading(false);
                } else {
                    throw new Error('Failed to fetch crew data.');
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
    
        fetchCrew();
      }, []);
    const handleFileChange = (e) => {
        // console.log(e)
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        if(selectedFile.type !== 'application/pdf'){
            alert('Please upload only PDF files.');
            e.target.value = null;
        }
        
        if(selectedFile){
            setFile(selectedFile);
        }
        // if (selectedFile && selectedFile.type !== 'application/pdf') {
        //     alert('Please upload only PDF files.');
        //     e.target.value = null;
        // } else {
        //     setFile(selectedFile);
        // }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your submission logic here, such as sending data to the server

        console.log('id_crew:', selectedCrew[0]);
        console.log('Document Name:', documentName);
        console.log('Document Number:', documentNumber);
        console.log('Issued Date:', issuedDate);
        console.log('Expiry Date:', expiryDate);
        console.log('File:', file);
        // Reset form fields after submission
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token not found. Please log in.');
            return;
        }
        if (file) {
            const formData = new FormData();
            formData.append('file_path', file);
            formData.append('id_crew', selectedCrew[0]);
            formData.append('document_name', documentName);
            formData.append('document_number', documentNumber);
            formData.append('issued_date', issuedDate);
            formData.append('expiry_date', expiryDate);
            
            // Send file to backend using Fetch API
            fetch('http://localhost:8000/api/docu', {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${token}`,
                },
            })
              .then(response => {
                console.log(response)
                if (!response.ok) {
                  throw new Error('Failed to upload file');
                }
                setShowModal(true)
                setTimeout(() => {
                    // setShowSuccessMessage(false); // Hide success message after 3 seconds
                    setShowModal(false);
                    navigate('/');
                }, 3000);
                // console.log('File uploaded successfully');
                // Optionally, perform any additional actions after successful upload
              })
              .catch(error => {
                console.error('Error uploading file:', error);
                // Handle error
              });
          } else {
            console.warn('No file selected.');
          }
        setDocumentName('');
        setDocumentNumber('');
        setIssuedDate('');
        setExpiryDate('');
        setFile(null);
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title">Add Crew Documentation</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="crew">Select Crew:</label>
                                        <select
                                            multiple
                                            className="form-control"
                                            id="crew"
                                            value={selectedCrew}
                                            onChange={(e) => setSelectedCrew(Array.from(e.target.selectedOptions, option => option.value))}
                                        >
                                            {crew.map(crewMember => (
                                                <option key={crewMember.id} value={crewMember.id}>{crewMember.first_name} {crewMember.last_name}</option>
                                            ))}
                                            {/* Add more crew members as needed */}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="documentName" className="form-label">Document Name:</label>
                                        <input type="text" className="form-control" id="documentName" value={documentName} onChange={(e) => setDocumentName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="documentNumber" className="form-label">Document Number:</label>
                                        <input type="text" className="form-control" id="documentNumber" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="documentNumber" className="form-label">Issued Date:</label>
                                        <input type="date" className="form-control" id="issuedDate" value={issuedDate} onChange={(e) => setIssuedDate(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="documentNumber" className="form-label">Expiry Date:</label>
                                        <input type="date" className="form-control" id="expiryDate" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="fileInput" className="form-label">Upload Document (PDF only):</label>
                                        <input type="file" className="form-control" id="fileInput" accept=".pdf" onChange={handleFileChange} />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

        Success message pop-out
        
    </div>
    );
}

export default AddCrewDocumentation;
