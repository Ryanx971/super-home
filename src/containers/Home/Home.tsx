import { Container } from '@mui/material';
import GoveeDevices from '../../components/GoveeDevices';
import SomfyDevices from '../../components/SomfyDevices';

import './Home.scss';

const Home = () => {
  return (
    <Container className="home-container">
      <section id="govee-devices">
        <GoveeDevices />
      </section>
      <section id="somfy-devices">
        <SomfyDevices />
      </section>
    </Container>
  );
};

export default Home;

