import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TransitionGroup } from 'react-transition-group';

import Task from '../Task/Task.js'
import Editable from '../Editable/Editable.js'
import ItemMenu from '../ItemMenu/ItemMenu.js'
import appStore from '../../store.js'
import { serviceActivityUpdate } from '../../_services/activity/activity.services'
import { serviceTaskGetMany } from '../../_services/task/task.services'
import { random_id } from '../../_services/toolkit.js'
import activityBreakpoints from './activity.breakpoints.json'

export default function Activity(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('Activity ' + props.activity.activityid)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    myActivityTasks: useSelector((state) => { 
      if (props.activity.tasks === undefined) {
        return []
      } else {
        Object.entries(state.taskSlice.tasks)
        .filter( task => { 
          return props.activity.tasks
            .map(activityTask => { return activityTask.taskid })
            .includes(task.taskid)
        })
      }      
    })
  }

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
    getTasks: () => {
      serviceTaskGetMany( props.activity.tasks )
    },
    new: () => {
      appStore.dispatch({
        type: 'taskModalSlice/new',
        payload: {
          activity: {
            activityid: props.activity.activityid
          }
        }
      })
    },
    edit: (fieldValue) => {
      console.log("Activity.edit", fieldValue)
      let activityChange = {...props.activity}
      activityChange[fieldValue.field] = fieldValue.value
      appStore.dispatch({
        type: 'activitySlice/change',
        payload: {
          activity: activityChange
        }
      })
    },
    save: async (fieldValue) => {
      //console.log("Activity.save ", fieldValue)
      let directInputs = {
        activityid: props.activity.activityid
      }
      directInputs[fieldValue.field] = fieldValue.value
      serviceActivityUpdate(directInputs)
    },
    drag: (e) => {
      setDragged(true)
      e.dataTransfer.setData("text", e.target.data-testid);
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

  // Confirm modal
  const [zoomLevel, setZoomLevel] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [dragged, setDragged] = useState(false)
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
        console.error('Activity.confirmCallback unmatched ' + choice)
    }
  }

  let c = -1
  let d = -1

  return (
    <Box
      sx={{ width: '100%' }}
    >
      {dragged === true ? (
        <Box
          data-testid={"list-activities#listitem-"+props.index}
          activityid={props.activity.activityid}
          sx={{ width: '100%' }}
          bgcolor={'lightgrey'}
          draggable="true"
        >
          <Editable 
            value={props.activity.name} 
            type={'TextField'} 
            field={'name'} 
            save={changes.save} 
            edit={changes.edit}
            variant={activityBreakpoints.name.variant[zoomLevel]}
          />
        </Box>  
      ) : (
        <Box
          data-testid={"list-activities#listitem-"+props.index}
          activityid={props.activity.activityid}
          sx={{ width: '100%' }}
          bgcolor={'lightgrey'}
          draggable="true" 
          ondragstart={changes.drag}
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
              value={props.activity.name} 
              type={'TextField'} 
              field={'name'} 
              save={changes.save} 
              edit={changes.edit}
              variant={activityBreakpoints.name.variant[zoomLevel]}
            />
            <ItemMenu 
              prefix={"list-activities#listitem-"+props.index}
              menuItems={menuItems}
            />
          </Box>

          <Editable 
            value={props.activity.description} 
            type={'TextField'} 
            field={'description'} 
            save={changes.save} 
            edit={changes.edit} 
          />

          <Box
            // TASKS --------------------------------------------------------------
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center'
            }}
          >
            <Typography 
              variant={activityBreakpoints.tasks.variant[zoomLevel]}
              component="span">
              {t('activity.label.tasks')}
            </Typography>
            <IconButton
              data-testid={"list-activities#listitem-"+props.index+"#button-add task"}
              onClick={changes.new}
              color='primary'
              size='small'
            >
              <AddCircleIcon />
            </IconButton>
          </Box>
        
          <List 
            dense={false}
            data-testid={"list-activities#listitem-"+props.index+"#list-tasks"}
            sx={{ 
              width: '100%',
              p: 0
            }}
          >
            <TransitionGroup>
              {props.activity.tasks.map((activityTask) => {
                d += 1
                return (
                  <ListItem 
                    key={'task-' + activityTask.taskid}
                    sx={{ 
                      width: '100%',
                      p: 0
                    }}
                  >
                    <Task task={activityTask} index={d} prefix={"list-activities#listitem-"+props.index+"#"} />
                  </ListItem>
                )
              })}
            </TransitionGroup>
          </List>    
        </Box>  
      )}   
    </Box>
  )
}