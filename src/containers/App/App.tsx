import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

// Containers
import Home from '../Home';
import Heating from '../Heating';

const App = () => {
  return (
    <Router>
      <div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/heating" element={<Heating />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

