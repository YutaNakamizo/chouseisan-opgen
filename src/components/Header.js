import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
} from '@material-ui/core';

export const Header = ({
  ...props
}) => {
  return (
    <AppBar
      position="sticky"
      color="inherit"
    >
      <Toolbar
      >
        <Box
        >
          <Typography
            variant="h6"
            component="h1"
          >
            調整さん候補生成機
          </Typography>
        </Box>

        <Box
          flexGrow={1}
        >
        </Box>

        <Box
        >
        </Box>
      </Toolbar>
    </AppBar>
  );
};

