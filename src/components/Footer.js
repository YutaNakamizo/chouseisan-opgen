import React from 'react';
import {
  Box,
} from '@material-ui/core';
import {
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
  },
}));

export const Footer = ({
  children,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Box
      component="footer"
      mt={6}
      mb={6}
      p={1}
      className={classes.root}
      {...props}
    >
      {children}
    </Box>
  );
};

