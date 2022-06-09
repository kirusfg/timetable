import React from 'react';

import List from '@mui/joy/List';
import Box from '@mui/joy/Box';


interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  let { children } = props;

  return (
    <Box
      height='100vh'
      padding='1rem'
      bgcolor='background.level1'
    >
      <List>
        {children}
      </List>
    </Box>
  );
};

export default Navbar;
