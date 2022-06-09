import React from 'react';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

import ListItemButton from '@mui/joy/ListItemButton';


interface NavbarItemProps {
  page: string;
  icon: React.ReactElement;
}

const NavbarItem = (props: NavbarItemProps) => {
  let { page, icon } = props;

  let navigate = useNavigate();
  let resolved = useResolvedPath(page);
  let selected = useMatch({ path: resolved.pathname, end: true });

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    page: string
  ) => {
    event.preventDefault();
    navigate(page, { replace: true });
  }

  return (
    <ListItemButton
      color={selected ? 'primary' : 'neutral'}
      sx={{
        borderRadius: '25%',
        padding: 1,
        minHeight: '0',
      }}
      onClick={(event) => handleNavigation(event, page)}
    >
      {icon}
    </ListItemButton>
  );
};

export default NavbarItem;
