import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor:'#212121',
        color: 'white',
        py: 2,
        mt: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Poster Builder
      </Typography>
      <Typography variant="body2">
        Built with <Link href="https://reactjs.org/" color="inherit" underline="hover">React</Link> & <Link href="https://mui.com/" color="inherit" underline="hover">MUI</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
