import { ColorLensOutlined } from '@mui/icons-material';
import { Box, IconButton, Popover } from '@mui/material';
import React from 'react';

import './IconPopover.scss';

interface Props {
  iconName: string;
  children: React.ReactNode;
  classes?: string;
  disabled?: boolean;
  anchorOriginVertical: number | 'bottom' | 'top' | 'center';
  anchorOriginHorizontal: number | 'center' | 'left' | 'right';
  transformOriginVertical: number | 'bottom' | 'top' | 'center';
  transformOriginHorizontal: number | 'center' | 'left' | 'right';
}

const IconPopover = ({
  children,
  classes,
  disabled,
  anchorOriginVertical,
  anchorOriginHorizontal,
  transformOriginVertical,
  transformOriginHorizontal,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const popOverClasses = `popover-container ${classes}`;

  return (
    <Box>
      <IconButton
        aria-describedby={id}
        aria-label="color picker"
        component="button"
        size="small"
        className="color-picker-button"
        disabled={disabled}
        onClick={handleClick}
      >
        <ColorLensOutlined
          fontSize="small"
          className={disabled ? 'color-gray' : 'color-primary'}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: anchorOriginVertical,
          horizontal: anchorOriginHorizontal,
        }}
        transformOrigin={{
          vertical: transformOriginVertical,
          horizontal: transformOriginHorizontal,
        }}
      >
        <Box className={popOverClasses}>{children}</Box>
      </Popover>
    </Box>
  );
};

export default IconPopover;

