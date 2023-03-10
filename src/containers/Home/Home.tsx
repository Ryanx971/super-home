import { Box, Container } from '@mui/material';
import GoveeDevices from '../../components/GoveeDevices';
import SomfyDevices from '../../components/SomfyDevices';
import theme from '../../utils/theme';

const Home = () => {
  return (
    <Box sx={{ backgroundColor: theme.palette.lightGrey, minHeight: '100vh' }}>
      <Container>
        <Box sx={{ marginBottom: 6 }}>
          <GoveeDevices />
        </Box>
        <Box>
          <SomfyDevices />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

