import React from 'react'
import { useNavigate, useResolvedPath, useMatch } from 'react-router-dom'

import ListItemButton from '@mui/material/ListItemButton'

interface NavbarItemProps {
  href: string
  title: string
  accent: string
  icon: React.ReactElement
  isComplex?: boolean
  last?: boolean
}

const NavbarItem: React.FC<NavbarItemProps> = (props) => {
  let { href, accent, icon, isComplex, last } = props

  let navigate = useNavigate()
  let resolved = useResolvedPath(href)
  let selected = useMatch({ path: resolved.pathname, end: !isComplex })

  const handleNavigation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    href: string
  ) => {
    event.preventDefault()

    if (href[0] === '/') {
      navigate(href, { replace: true })
    } else {
      window.location.replace(href)
    }
  }

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
        bgcolor: selected ? accent : undefined,
        color: selected ? 'common.white' : undefined,
        '&:hover': {
          bgcolor: accent,
          color: 'common.white',
        },
      }}
      onClick={(event) => handleNavigation(event, href)}
    >
      {icon}
    </ListItemButton>
  )
}

export default NavbarItem
