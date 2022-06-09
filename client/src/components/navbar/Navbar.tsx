import React from 'react';

import Stack from '@mui/material/Stack';

import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import Box from '@mui/joy/Box';


interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  let { children } = props;

  return (
    <Box sx={{
      height: 'calc(100vh - 2rem)',
      padding: '1rem 1.5rem',
      bgcolor: 'background.level1',
    }}>
      <Stack spacing={8} direction='column' justifyContent='space-between'>
        <Typography level='h1'>K</Typography>
        <List>
          {children}
        </List>
      </Stack>
    </Box>
  );
};

export default Navbar;
