import { Box, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GoveeDevices from '../../components/GoveeDevices';
import SomfyDevices from '../../components/SomfyDevices';
import theme from '../../utils/theme';

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: theme.palette.lightGrey, minHeight: '100vh' }}>
      <Container>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.main,
            paddingY: 4,
          }}
        >
          {t('homePage.title')}
        </Typography>
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

