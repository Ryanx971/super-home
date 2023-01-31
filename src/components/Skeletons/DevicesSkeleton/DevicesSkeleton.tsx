import React from 'react';
import { Box, Grid, Skeleton } from '@mui/material';
import './DevicesSkeleton.scss';

interface DeviceSkeletonProps {
  repeat: number;
  height: number;
}

const DevicesSkeleton = ({ repeat, height }: DeviceSkeletonProps) => {
  return (
    <>
      {Array.from(Array(repeat), (item: number, index: number) => {
        return (
          <Grid item xs={4} key={index} height={height}>
            <Box className="device-skeleton">
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
                <Grid item xs={7} className="right-content">
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
                    width={20}
                    height={20}
                  />
                  <Skeleton
                    variant="circular"
                    animation="wave"
                    className="mr"
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
                className="slider"
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
    </>
  );
};

export default DevicesSkeleton;

