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
import Editable from '../Editable/Editable'
import { serviceTaskUpdate } from '../../_services/task/task.services.js'

import appStore from '../../store.js'
import ItemMenu from '../ItemMenu/ItemMenu.js'
import { random_id } from '../../_services/toolkit.js'
import taskBreakpoints from './task.breakpoints.json'

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
    edit: (fieldValue) => {
      console.log("Task.edit", fieldValue)
      let taskChange = {...props.task}
      taskChange[fieldValue.field] = fieldValue.value
      appStore.dispatch({
        type: 'taskSlice/change',
        payload: {
          task: taskChange
        }
      })
    },
    save: async (fieldValue) => {
      console.log("Task.save ", fieldValue)
      let directInputs = {
        taskid: props.task.taskid
      }
      directInputs[fieldValue.field] = fieldValue.value
      serviceTaskUpdate(directInputs)
    }
  }

  // Confirm modal
  const [zoomLevel, setZoomLevel] = useState(0)
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

  let menuItems = [
    {
      item: 'duplicate',
      label: 'generic.button.duplicate',
      onclick: () => {console.log("TODO duplicate")},
      disabled: true
    },
    {
      item: 'delete',
      label: 'generic.button.delete',
      onclick: changes.attemptDelete
    }
  ]

  let c = -1

  return (
    <Box
      data-testid={props.prefix+"list-tasks#listitem-"+props.index}
      taskid={props.task.taskid}
      sx={{ width: '100%' }}
      bgcolor={'grey'}
    >
      { zoomLevel === 0 ? (
        <Box
          data-testid={props.prefix+"list-tasks#listitem-"+props.index}
          taskid={props.task.taskid}
          sx={{ 
            width: '100%',
            display: 'flex',
            direction: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Editable 
              value={props.task.name} 
              type={'TextField'}
              save={changes.save} 
              edit={changes.edit} 
              variant={taskBreakpoints.name.variant[zoomLevel]}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >       
              <Editable 
                value={props.task.state} 
                type={'Select'} 
                field={'state'} 
                save={changes.save} 
                edit={changes.edit} 
              />
              <ItemMenu 
                prefix={props.prefix+"list-tasks#listitem-"+props.index}
                menuItems={menuItems}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          data-testid={props.prefix+"list-tasks#listitem-"+props.index}
          taskid={props.task.taskid}
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Editable 
              value={props.task.name} 
              type={'TextField'} 
              field={'name'} 
              save={changes.save} 
              edit={changes.edit} 
              variant={taskBreakpoints.name.variant[zoomLevel]}
            />
            <ItemMenu 
              prefix={props.prefix+"list-tasks#listitem-"+props.index}
              menuItems={menuItems}
            />
          </Box>

          <Editable 
            value={props.task.description} 
            type={'TextField'} 
            field={'description'} 
            save={changes.save} 
            edit={changes.edit} 
          />
          <Editable 
            value={props.task.state} 
            type={'Select'} 
            field={'state'} 
            save={changes.save} 
            edit={changes.edit} 
          />
        </Box>
      )}
    </Box>
  )
}