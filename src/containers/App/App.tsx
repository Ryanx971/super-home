import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Home from '../Home';
import Heating from '../Heating';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/heating" element={<Heating />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

