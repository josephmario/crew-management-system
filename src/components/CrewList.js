import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import { useNavigate  } from 'react-router-dom';
const CrewList = () => {
  const navigate = useNavigate ();
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
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

  const handleView = (row) => {
    // Logic to handle view action, e.g., navigate to detail page
    // console.log('View clicked for:', row);
    navigate(`/crew/${row.id}`);
  };
  const handleDelete = (row) => {
    // Logic to handle view action, e.g., navigate to detail page
    console.log('View clicked for:', row);
  };
  const handleDocu = (row) => {
    // Logic to handle view action, e.g., navigate to detail page
    navigate('/docu');
  };
  const columns = [
    {
        name: 'First Name',
        selector: row => row.first_name,
        sortable: true,
    },
    {
        name: 'Middle Name',
        selector: row => row.middle_name,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: row => row.last_name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row.address,
        sortable: false,
    },
    {
        name: 'Birth Date',
        selector: row => row.birthdate,
        sortable: false,
    },
    {
        name: 'Age',
        selector: row => row.age,
        sortable: true,
    },
    {
      name: 'Rank',
      selector: row => row.rank,
      sortable: true,
    },
    {
      name: 'Height',
      selector: row => row.height,
      sortable: false,
    },
    {
      name: 'Weight',
      selector: row => row.weight,
      sortable: false,
    },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button onClick={() => handleView(row)} className="btn btn-primary m-auto">View</button>
          <button onClick={() => handleDelete(row)} className="btn btn-danger m-auto">Delete</button>
          <button onClick={() => handleDocu(row)} className="btn btn-success m-auto">Upload Documentation</button>
        </>
      ),
      button: true,
      ignoreRowClick: true,
      allowOverflow: true,
      width: '350px',
    },
  ];

  const filteredCrew = crew.filter(member =>
    member.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
    member.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
    member.email.toLowerCase().includes(searchText.toLowerCase()) ||
    member.middle_name.toLowerCase().includes(searchText.toLowerCase()) ||
    member.rank.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="container mt-4">
      <h2>Crew List</h2>
      <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search..."
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
          <DataTable
            columns={columns}
            data={filteredCrew}
            pagination
            highlightOnHover
            striped
            sortActive
            sortDirection="asc"
        />
      )}
    </div>
  );
}

export default CrewList;
