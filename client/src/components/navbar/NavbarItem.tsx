import React from 'react';
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom';

import ListItemButton from '@mui/joy/ListItemButton';


interface NavbarItemProps {
  page: string;
  title: string;
  accent: string;
  icon: React.ReactElement;
}

const NavbarItem = (props: NavbarItemProps) => {
  let { page, title, accent, icon } = props;

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
      sx={{
        borderRadius: '35%',
        padding: 1,
        margin: '16px 0px',
        minHeight: '0',
        bgcolor: selected ? accent : undefined,
        color: selected ? 'common.white' : undefined,
        boxShadow: selected ? '0 10px 12px #00000020' : undefined,
        '&:hover': {
          bgcolor: accent,
          color: 'common.white',
          boxShadow: '0 10px 12px #00000020',
        }
      }}
      onClick={(event) => handleNavigation(event, page)}
    >
      {icon}
    </ListItemButton>
  );
};

export default NavbarItem;
