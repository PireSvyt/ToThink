import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import CircularProgress from '@mui/material/CircularProgress'

export default function Task(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Task ' + props.task.taskid)
  }
  // i18n
  const { t } = useTranslation()

  // Changes
  let changes = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    attemptDelete: () => {
      setConfirmOpen(true)
    },
  }

  // Confirm modal
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  function confirmCallback(choice) {
    switch (choice) {
      case 'close':
        setConfirmOpen(false)
        break
      case 'delete':
        setMenuOpen(false)
        setConfirmOpen(false)
        setDeleting(true)
        servicePatientDelete(props.patient.patientid).then(() => {
          setDeleting(false)
          serviceUserGetDetails()
        })
        break
      default:
        console.error('Task.confirmCallback unmatched ' + choice)
    }
  }

  return (
    <Box
      data-testid={props.prefix+"list-tasks#listitem-"+props.index}
      taskid={props.task.taskid}
    >
      TASK
    </Box>
  )
}