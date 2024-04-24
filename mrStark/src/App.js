import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './pages/NavBar';
import './App.css';
import Registration from "./pages/Registration";
import LoginForm from "./pages/LoginForm";
import Loader from './components/Loader';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to handle login and set the logged-in user
  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  return(
    <Router>
      <div>
         {/* Pass loggedInUser as prop */}
        <Routes>
          <Route path='/' element= {<NavBar loggedInUser={loggedInUser} />}/>
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path='/loader' element={<Loader/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
