import React from 'react';

import Stack from '@mui/material/Stack';

import List from '@mui/material/List';
import Box from '@mui/material/Box';


interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  let { children } = props;

  return (
    <Box sx={{
      height: 'calc(100vh - 2rem)',
      padding: '1rem 1.5rem',
      bgcolor: 'grey.50',
    }}>
      <Stack spacing={8} direction='column' justifyContent='space-between'>
        <h1>K</h1>
        <List>
          {children}
        </List>
      </Stack>
    </Box>
  );
};

export default Navbar;
