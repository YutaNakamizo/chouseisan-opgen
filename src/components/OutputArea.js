import React from 'react';
import {
  Box,
  TextField,
} from '@material-ui/core';

export const OutputArea = ({
  text,
  ...props
}) => {
  return (
    <Box
    >
      <TextField
        multiline
        value={text}
      />
    </Box>
  );
};

