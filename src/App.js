// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CrewList from './components/CrewList';
import Login from './components/Login';
import AddCrewMember from './components/AddCrewMember';
import EditCrewMember from './components/EditCrewMember';
import CrewMemberDetails from './components/CrewMemberDetails';
import AddCrewDocumentation from './components/AddCrewDocumentation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes >
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/" element={<CrewList />}/>
          <Route exact path="/add" element={<AddCrewMember />}/>
          <Route exact path="/edit/:id" element={<EditCrewMember />}/>
          <Route exact path="/crew/:id" element={<CrewMemberDetails />}/>
          <Route exact path="/docu" element={<AddCrewDocumentation />}/>
        </Routes >
      </div>
    </Router>
  );
}

export default App;
