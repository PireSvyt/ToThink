import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function ItemMenu(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('ItemMenu')
  }
  // i18n
  const { t } = useTranslation()

  // Confirm modal
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // Changes
  let changes = {
    openMenu: (event) => {
        setAnchorEl(event.currentTarget)
        setMenuOpen(true)
    },
    closeMenu: () => {
        setMenuOpen(false)
    },
    onclick: (e) => {
        console.log("ItemMenu.onclick", e.target.getAttribute('name'))
        setMenuOpen(false)
        props.onclick(e.target.getAttribute('name'))
    }
  }

  let c = -1

  return (
    <Box>
        <IconButton
            data-testid={props.prefix+"#button-menu open"}
            onClick={changes.openMenu}
            hidden={props.hidden === true}
            disabled={props.disabled === true}
            size='small'
        >
            <MoreHorizIcon />
        </IconButton>
        <Box>
        <Menu
            open={menuOpen}
            onClose={changes.closeMenu}
            anchorEl={anchorEl}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}            
            data-testid={props.prefix+"#list-item menu"}
        >
            {props.menuItems.map((item) => {
                c += 1
                return (
                    <MenuItem
                        data-testid={props.prefix+"#list-item menu#listitem-"+c}
                        key={item.name}
                        name={item.name}
                        onClick={changes.onclick}
                        hidden={item.hidden === true}
                        disabled={item.disabled === true}
                        dense
                    >
                        {t(item.label)}
                    </MenuItem>
                )
            })}
        </Menu>
        </Box>
    </Box>
  )
}