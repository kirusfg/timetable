import React from 'react'

import ListItemButton from '@mui/material/ListItemButton'

interface NavbarItemProps {
  title: string
  accent: string
  icon: React.ReactElement
  isSelected?: boolean
  last?: boolean
  clickHandler: Function
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  let { accent, icon, isSelected, last, clickHandler } = props

  return (
    <ListItemButton
      sx={{
        padding: 1,
        minHeight: '0',
        flexGrow: '0',
        marginBottom: last ? '0' : '2rem',
        marginTop: last ? 'auto' : '0',
        borderRadius: '35%',
        fontSize: 6,
        bgcolor: isSelected ? accent : undefined,
        color: isSelected ? 'common.white' : undefined,
        '&:hover': {
          bgcolor: accent,
          color: 'common.white',
        },
      }}
      onClick={(event) => clickHandler(event)}
    >
      {icon}
    </ListItemButton>
  )
}

export default NavbarItem
