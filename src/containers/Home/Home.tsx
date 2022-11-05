import { Container } from '@mui/material';
import GoveeDevices from '../../components/GoveeDevices';

import './Home.scss';

const Home = () => {
  return (
    <Container className="home-container">
      <GoveeDevices />
    </Container>
  );
};

export default Home;

