import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Typography,
  IconButton,
  List,
  Collapse,
  Divider,
  Skeleton
} from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TransitionGroup } from 'react-transition-group';

import Task from '../Task/Task.js'
import Editable from '../Editable/Editable.js'
import ItemMenu from '../ItemMenu/ItemMenu.js'
import appStore from '../../store.js'
import { serviceActivityUpdate, serviceActivityDelete, serviceActivityOrder, serviceActivityGetOne } from '../../_services/activity/activity.services'
import { serviceTaskGetMany } from '../../_services/task/task.services'
import activitySettings from './activity.settings.json'
import ConfirmModal from '../ConfirmModal/ConfirmModal.js'

export default function Activity(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('Activity', props.activity)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    activity: useSelector((state) => state.activitySlice.activities[props.activityid]),
  }

  // Changes
  let changes = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    onMenuItemClick: (value) => {
      let clickedItem = menuItems.filter(menuItem => menuItem.name === value)[0]
      clickedItem.onclick()
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    attemptDelete: () => {
      setConfirmOpen(true)
    },
    getTasks: () => {
      serviceTaskGetMany( select.activity.tasks )
    },
    edit: (fieldValue) => {
      console.log("Activity.edit", fieldValue)
      let activityChange = {...select.activity}
      activityChange[fieldValue.field] = fieldValue.value
      appStore.dispatch({
        type: 'activitySlice/change',
        payload: {
          activity: activityChange
        }
      })
    },
    new: () => {
      appStore.dispatch({
        type: 'taskModalSlice/new',
        payload: {
          inputs: {
            activityid: props.activityid
          }
        }
      })
    },
    save: async (fieldValue) => {
      //console.log("Activity.save ", fieldValue)
      if (select.activity[fieldValue.field] !== fieldValue.value) {
        let directInputs = {
          activityid: props.activityid
        }
        directInputs[fieldValue.field] = fieldValue.value
        serviceActivityUpdate(directInputs)
      }
    },
    drag: (e) => {
      console.log("DRAG "+e.target.key)
      // https://www.w3schools.com/html/html5_draganddrop.asp
      e.dataTransfer.setData("text", props.activityid)
      props.drag(true)
      setDragged(true)
    },
    allowDrop: (e) => {
      //console.log("ALLOW "+e.target.key)
      // https://www.w3schools.com/html/html5_draganddrop.asp
      e.preventDefault()
    },
    drop: (e) => {
      // https://www.w3schools.com/html/html5_draganddrop.asp
      //e.preventDefault();
      setDragged(false)
      props.drag(false)
      serviceActivityOrder({
        activityid: e.dataTransfer.getData('text'),
        where: e.target.getAttribute('name'),
        wrt: props.activityid,
      })    
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

  // States
  const [dragged, setDragged] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [collapsing, setCollasping] = useState(false)
  const [expanding, setExpanding] = useState(false)
  function confirmCallback(choice) {
    switch (choice) {
      case 'close':
        setConfirmOpen(false)
        break
      case 'delete':
        setConfirmOpen(false)
        setDisabled(true)
        serviceActivityDelete({
          activityid: props.activityid
        }).then(() => {
          setDisabled(false)
        })
        break
      default:
        console.error('Activity.confirmCallback unmatched ' + choice)
    }
  }

  // Check availabilties, otherwise fetch
  function availabilitiesMeetZoomRequirement() {
    if (select.activity !== undefined) {
      if (select.activity.availabilities !== undefined) {
        //console.log("select.activity.availabilities", select.activity.availabilities)
        Object.keys(activitySettings.requirements[props.zoomLevel]).forEach(k => {
          if (select.activity.availabilities[k] === undefined) {
            console.log("GETTING ACTIVIY", props.activityid)
            /*serviceActivityGetOne({
              activityid: props.activityid
            })*/
            return
          }
        })
      }
    }
  }
  availabilitiesMeetZoomRequirement()

  let c = -1
  let d = -1

  return (
    <Box
      sx={{ width: '100%', m:0, p: 0 }}
    >
      <Box
        data-testid={"list-activities#listitem-"+props.index}
        activityid={props.activityid}
        sx={{ width: '100%', m:0, p: 0 }}
        // https://www.w3schools.com/html/html5_draganddrop.asp
        draggable={true}
        onDragStart={changes.drag} 
      >
        <Box 
          data-testid={"list-activities#listitem-"+props.index+"#box-top dropping area"}
          sx={{
            width: '100%',
            p: activitySettings.dragAndDrop[props.zoomLevel].toparea
          }}
          // https://www.w3schools.com/html/html5_draganddrop.asp
          onDrop={changes.drop} 
          onDragOver={changes.allowDrop}
          name='toparea'
          activityid={props.activityid}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center'
          }}
        >
          {activitySettings.requirements[props.zoomLevel].name === undefined ? (null) : (
            <Editable 
              value={select.activity} 
              type={'TextField'} 
              field={'name'}
              changes={changes}
              settings={activitySettings.requirements[props.zoomLevel].name}
              disabled={disabled || props.dragging}
            />
          )}
          <ItemMenu 
            prefix={"list-activities#listitem-"+props.index}
            menuItems={menuItems}
            onclick={changes.onMenuItemClick}
            disabled={disabled || props.dragging}
          />
        </Box>

        {activitySettings.requirements[props.zoomLevel].description === undefined ? (null) : (
          <Editable 
            value={select.activity} 
            type={'TextField'} 
            field={'description'}
            changes={changes}
            settings={activitySettings.requirements[props.zoomLevel].description}
            disabled={disabled || props.dragging}
          />
        )}

        {activitySettings.requirements[props.zoomLevel].tasks === undefined ? (null) : (
          <Box          
          // TASKS --------------------------------------------------------------
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          >
            <Box
            sx={{
              width: '100%',
            }}
            >
              <Typography 
                variant={activitySettings.requirements[props.zoomLevel].tasks.variant}
                component="span"
              >
                {t('activity.label.tasks')}
              </Typography>
              <IconButton
                data-testid={"list-activities#listitem-"+props.index+"#button-add task"}
                onClick={changes.new}
                color='primary'
                size='small'
                disabled={disabled || props.dragging}
              >
                <AddCircleIcon />
              </IconButton>
            </Box>
          
            {select.activity.availabilities.tasks !== 'available' ? (
              <Box 
                sx={{ 
                  width: '95%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }} 
              >
                <Skeleton 
                  variant="text" 
                  width={(Math.random()*60)+'%'}
                />
                <Skeleton 
                  variant="text" 
                  width={(10+Math.random()*20)+'%'}
                />
              </Box>
            ) : (
              <List 
                dense={false}
                data-testid={"list-activities#listitem-"+props.index+"#list-tasks"}
                sx={{ 
                  width: '95%',
                  p: 0
                }}
              >
                <TransitionGroup>
                  { select.activity.tasks !== undefined ? (
                    select.activity.tasks.map((activityTask) => {
                      d += 1
                      return (
                        <Collapse 
                          key={'task-' + activityTask.taskid}
                          sx={{ 
                            width: '100%',
                            p: 0
                          }}
                        >
                          <Task 
                            taskid={activityTask.taskid}
                            index={d} 
                            prefix={"list-activities#listitem-"+props.index+"#"}
                            disabled={disabled || props.dragging}
                            zoomLevel={props.zoomLevel}
                          />
                          { ["0", "1"].includes(props.zoomLevel) ? (null) : (                              
                            <Divider 
                              variant="middle" 
                              component="li" 
                              sx={{ mt:1, mb:1}} 
                            />
                          )}
                        </Collapse>
                      )
                    })
                  ) : ( null)
                  }
                </TransitionGroup>
              </List> 
            )}

          </Box>
        )}

        <Box 
          data-testid={"list-activities#listitem-"+props.index+"#box-bottom dropping area"}
          sx={{
            width: '100%',
            p: activitySettings.dragAndDrop[props.zoomLevel].bottomarea
          }}
          // https://www.w3schools.com/html/html5_draganddrop.asp
          onDrop={changes.drop} 
          onDragOver={changes.allowDrop}
          name='bottomarea'
          activityid={props.activityid}
        />

      </Box>

      {confirmOpen === false ? null : (
        <ConfirmModal
          open={confirmOpen}
          data={{
            title: 'activity.confirm.delete.title',
            content: 'activity.confirm.delete.content',
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