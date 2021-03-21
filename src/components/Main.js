import React from 'react';
import {
  Container,
} from '@material-ui/core';

export const Main = ({
  children,
  ...props
}) => {
  return (
    <Container
      component="main"
      maxWidth="md"
    >
      {children}
    </Container>
  );
};

