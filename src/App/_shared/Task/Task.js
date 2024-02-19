import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
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
import { serviceTaskUpdate, serviceTaskDelete } from '../../_services/task/task.services.js'

import appStore from '../../store.js'
import ItemMenu from '../ItemMenu/ItemMenu.js'
import taskSettings from './task.settings.json'
import ConfirmModal from '../ConfirmModal/ConfirmModal.js'

export default function Task(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('Task ' + props.taskid)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    thisTask: useSelector((state) => state.taskSlice.tasks[props.taskid]),
  }

  // Changes
  let changes = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    onMenuItemClick: (value) => {
      console.log("Task.changes.onMenuItemClick", value)
      let clickedItem = menuItems.filter(menuItem => menuItem.name === value)[0]
      clickedItem.onclick()
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    attemptDelete: () => {
      console.log("Task.changes.attemptDelete")
      setConfirmOpen(true)
    },
    edit: (fieldValue) => {
      console.log("Task.edit", fieldValue)
      let taskChange = {...select.thisTask}
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
        taskid: select.thisTask.taskid
      }
      directInputs[fieldValue.field] = fieldValue.value
      serviceTaskUpdate(directInputs)
    }
  }

  // Confirm modal
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  function confirmCallback(choice) {
    switch (choice) {
      case 'close':
        setConfirmOpen(false)
        break
      case 'delete':
        setMenuOpen(false)
        setConfirmOpen(false)
        setDisabled(true)
        serviceTaskDelete({
          taskid: select.thisTask.taskid
        }).then(() => {
          setDisabled(false)
        })
        break
      default:
        console.error('Task.confirmCallback unmatched ' + choice)
    }
  }

  let menuItems = [
    {
      name: 'duplicate',
      label: 'generic.button.duplicate',
      onclick: () => {console.log("TODO duplicate")},
      disabled: true
    },
    {
      name: 'delete',
      label: 'generic.button.delete',
      onclick: changes.attemptDelete
    }
  ]

  let c = -1

  if (select.thisTask === undefined) {
    return null
  } else {
    return (
      <Box
        data-testid={props.prefix+"list-tasks#listitem-"+props.index}
        taskid={select.thisTask.taskid}
        sx={{ width: '100%' }}
        bgcolor={'white'}
      >
        { props.zoomLevel === "1" ? (
          <Box
            data-testid={props.prefix+"list-tasks#listitem-"+props.index}
            taskid={select.thisTask.taskid}
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
                type={'TextField'}
                field={'name'} 
                value={select.thisTask.name} 
                save={changes.save} 
                edit={changes.edit} 
                zoomConstrains={taskSettings.name[props.zoomLevel]}
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >       
                <Editable 
                  type={'Select'}
                  field={'state'} 
                  value={select.thisTask.state} 
                  values={taskSettings.state.values}
                  save={changes.save} 
                  edit={changes.edit} 
                  zoomConstrains={taskSettings.state[props.zoomLevel]}
                />
                <ItemMenu 
                  prefix={props.prefix+"list-tasks#listitem-"+props.index}
                  menuItems={menuItems}
                  onclick={changes.onMenuItemClick}
                  disabled={disabled}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            data-testid={props.prefix+"list-tasks#listitem-"+props.index}
            taskid={select.thisTask.taskid}
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
                value={select.thisTask.name} 
                type={'TextField'} 
                field={'name'} 
                save={changes.save} 
                edit={changes.edit} 
                zoomConstrains={taskSettings.name[props.zoomLevel]}
              />
              <ItemMenu 
                prefix={props.prefix+"list-tasks#listitem-"+props.index}
                menuItems={menuItems}
                onclick={changes.onMenuItemClick}
              />
            </Box>

            <Editable 
              type={'TextField'} 
              field={'description'}  
              value={select.thisTask.description}
              save={changes.save} 
              edit={changes.edit} 
              zoomConstrains={taskSettings.description[props.zoomLevel]}
            />
            <Editable 
              type={'Select'}
              field={'state'} 
              value={select.thisTask.state} 
              values={taskSettings.state.values}
              save={changes.save} 
              edit={changes.edit} 
              zoomConstrains={taskSettings.state[props.zoomLevel]}
            />
          </Box>
        )}

        {confirmOpen === false ? null : (
          <ConfirmModal
            open={confirmOpen}
            data={{
              title: 'task.confirm.delete.title',
              content: 'task.confirm.delete.content',
              callToActions: [
                {
                  label: 'generic.button.cancel',
                  choice: 'close',
                },
                {
                  label: 'generic.button.proceed',
                  choice: 'delete',
                  variant: 'contained',
                  color: 'error',
                },
              ],
            }}
            callback={confirmCallback}
          />
        )}
      </Box>
    )    
  }
}