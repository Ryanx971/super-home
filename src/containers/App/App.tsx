import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Containers
import Home from '../Home';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

