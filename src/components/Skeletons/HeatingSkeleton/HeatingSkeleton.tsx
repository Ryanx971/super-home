import { Box, Grid, Skeleton } from '@mui/material';
import theme from '../../../utils/theme';

const HeatingSkeleton = () => {
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.grey30,
        borderRadius: '25px',
        padding: '25px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <Skeleton
          variant="circular"
          animation="wave"
          width="22rem"
          height="22rem"
        />

        <Grid container spacing={6} sx={{ marginY: 4 }} justifyContent="center">
          {[...Array(4)].map((item, index) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={index}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Skeleton
                variant="rounded"
                animation="wave"
                width={180}
                height={80}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HeatingSkeleton;

