import React from 'react';
import { IconButton, Popover, Box } from '@mui/material';
import { ColorLensOutlined } from '@mui/icons-material';

import './IconPopover.scss';

interface IProps {
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
  iconName,
  children,
  classes,
  disabled,
  anchorOriginVertical,
  anchorOriginHorizontal,
  transformOriginVertical,
  transformOriginHorizontal,
}: IProps) => {
  const [anchorEl, setAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

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
    <>
      <IconButton
        aria-describedby={id}
        aria-label="color picker"
        component="button"
        className="color-picker-button"
        disabled={disabled}
        onClick={handleClick}
      >
        <input hidden accept="image/*" type="file" />
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
    </>
  );
};

export default IconPopover;

