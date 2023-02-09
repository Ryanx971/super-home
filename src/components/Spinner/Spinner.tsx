import { Box } from '@mui/material';

import './Spinner.scss';

const Spinner = () => {
  return (
    <Box className="spinner-container">
      <Box className="spinner"></Box>
    </Box>
  );
};

export default Spinner;

