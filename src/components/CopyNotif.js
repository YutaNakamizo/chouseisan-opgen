import React from 'react';
import {
  Snackbar,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

export const CopyNotif = ({
  open,
  onClose = function() {},
  ...props
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message="コピーしました"
      action={
        <IconButton
          size="small"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon
            fontSize="small"
          />
        </IconButton>
      }
    />
  );
};

