import { Box, Grid, Skeleton } from '@mui/material';
import theme from '../../../utils/theme';

interface Props {
  repeat: number;
  height: number;
}

const DevicesSkeleton = ({ repeat, height }: Props) => {
  return (
    <Grid container spacing={6} columnSpacing={8}>
      {Array.from(Array(repeat), (item: number, index: number) => {
        return (
          <Grid item xs={4} key={index} height={height}>
            <Box
              sx={{
                backgroundColor: theme.palette.grey30,
                borderRadius: '25px',
                padding: '25px',
              }}
            >
              <Grid container>
                <Grid item xs={3}>
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    width={60}
                    height={60}
                  />
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid
                  item
                  xs={7}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    sx={{ marginRight: '0.5rem' }}
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
                    sx={{ marginRight: '0.5rem' }}
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    sx={{ marginRight: '0.5rem' }}
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={30}
                    height={20}
                  />
                </Grid>
              </Grid>
              <Skeleton
                sx={{ margin: '1rem 0' }}
                variant="text"
                width="100%"
                animation="wave"
                height={15}
              />
              <Skeleton
                variant="text"
                width="60%"
                animation="wave"
                height={40}
              />
              <Skeleton
                variant="text"
                width="25%"
                animation="wave"
                height={25}
              />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DevicesSkeleton;

