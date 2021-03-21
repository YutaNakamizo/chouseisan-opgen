import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
} from '@material-ui/core';

export const Header = ({
  onGenerateClick = function() {},
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
            調整さん 文字列生成
          </Typography>
        </Box>

        <Box
          flexGrow={1}
        >
        </Box>

        <Box
        >
          <Button
            variant="contained"
            color="primary"
            onClick={onGenerateClick}
          >
            日程を生成
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

