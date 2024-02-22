import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Skeleton, IconButton } from '@mui/material'

import appStore from '../../../../../store.js'
import {
  serviceTaskUpdate,
  serviceTaskDelete,
} from '../../../../../_services/task/task.services.js'
import ConfirmModal from '../../../../../_shared/ConfirmModal/ConfirmModal.js'
import ItemMenu from '../../../../../_shared/ItemMenu/ItemMenu.js'
import Editable from '../../../../../_shared/Editable/Editable.js'
import Selectable from '../../../../../_shared/Selectable/Selectable.js'
import DatePickable from '../../../../../_shared/DatePickable/DatePickable.js'
import taskSettings from './task.settings.json'


export default function Task(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('Task ' + props.taskid)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    task: useSelector((state) => state.taskSlice.tasks[props.taskid]),
  }

  // Changes
  let changes = {
    openMenu: (event) => {
      setAnchorEl(event.currentTarget)
      setMenuOpen(true)
    },
    onMenuItemClick: (value) => {
      let clickedItem = menuItems.filter(
        (menuItem) => menuItem.name === value
      )[0]
      clickedItem.onclick()
    },
    closeMenu: () => {
      setMenuOpen(false)
    },
    attemptDelete: () => {
      setConfirmOpen(true)
    },
    edit: (fieldValue) => {
      console.log('Task.edit', fieldValue)
      let taskChange = { ...select.task }
      taskChange[fieldValue.field] = fieldValue.value
      appStore.dispatch({
        type: 'taskSlice/update',
        payload: {
          task: taskChange,
        },
      })
    },
    save: async (fieldValue) => {
      console.log('Task.save ', fieldValue, select.task)
      let directInputs = {
        taskid: props.taskid,
      }
      directInputs[fieldValue.field] = fieldValue.value
      serviceTaskUpdate(directInputs)
    },
  }

  // Confirm modal
  const [dragged, setDragged] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [disabled, setDisabled] = useState(false)
  function confirmCallback(choice) {
    switch (choice) {
      case 'close':
        setConfirmOpen(false)
        break
      case 'delete':
        setConfirmOpen(false)
        setDisabled(true)
        serviceTaskDelete({
          taskid: props.taskid,
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
      onclick: () => {
        console.log('TODO duplicate')
      },
      disabled: true,
    },
    {
      name: 'delete',
      label: 'generic.button.delete',
      onclick: changes.attemptDelete,
    },
  ]

  const skeleton = (
    <Box sx={{ width: '100%' }}>
      <Skeleton
        variant="text"
        sx={{ typography: taskSettings.requirements[0].name.variant}}
        width={Math.random() * 60 + 20 + '%'}
      />
    </Box>
  )

  //console.log("TASK : I RENDER!", select.task)
  let c = -1
  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      {select.task === undefined ? (
        skeleton
      ) : (
        <Box sx={{ width: '100%', m: 0, p: 0 }}>
          {select.task.availabilities === undefined ? (
            skeleton
          ) : (
            <Box
              data-testid={props.prefix + 'list-tasks#listitem-' + props.index}
              taskid={props.taskid}
              sx={{ width: '100%' }}
              bgcolor={'white'}
            >
                <Box
                  taskid={props.taskid}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    direction: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >

                    <Editable
                      prefix={props.prefix + 'list-tasks#listitem-' + props.index}
                      value={select.task}
                      field={'name'}
                      changes={changes}
                      settings={taskSettings.requirements[props.zoomLevel]}
                      disabled={disabled || props.dragging}
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Selectable
                        prefix={props.prefix + 'list-tasks#listitem-' + props.index}
                        value={select.task}
                        values={taskSettings.values}
                        field={'state'}
                        changes={changes}
                        settings={
                          taskSettings.requirements[props.zoomLevel]
                        }
                        disabled={disabled || props.dragging}
                      />
                      <ItemMenu
                        prefix={props.prefix + 'list-tasks#listitem-' + props.index}
                        menuItems={menuItems}
                        onclick={changes.onMenuItemClick}
                        disabled={disabled || props.dragging}
                      />                      
                    </Box>

                  </Box>

                </Box>
                    
                <Editable
                  prefix={props.prefix + 'list-tasks#listitem-' + props.index}
                  value={select.task}
                  field={'description'}
                  changes={changes}
                  settings={
                    taskSettings.requirements[props.zoomLevel]
                  }
                  disabled={disabled || props.dragging}
                />

                {taskSettings.requirements[props.zoomLevel].reminderType === undefined ? (null) : (
                    <Box
                      sx={{
                        width: '100%',
                      }}
                    >
                    <Selectable
                      prefix={props.prefix + 'list-tasks#listitem-' + props.index}
                      value={select.task}
                      values={taskSettings.values}
                      field={'reminderType'}
                      changes={changes}
                      settings={
                        taskSettings.requirements[props.zoomLevel]
                      }
                      disabled={disabled || props.dragging}
                    />

                      {select.task.reminderType === undefined ? (null) : (
                        <Box
                          sx={{
                            width: '100%',
                          }}
                        >
                          {select.task.reminderType !== 'oneshot' ? (null) : (
                            <Box
                              sx={{
                                width: '100%',
                              }}
                            >
                              <DatePickable 
                                prefix={props.prefix + 'list-tasks#listitem-' + props.index}
                                value={select.task}
                                field={'oneshotDate'}
                                changes={changes}
                                settings={
                                  taskSettings.requirements[props.zoomLevel]
                                }
                                disabled={disabled || props.dragging}
                              />
                            </Box>
                          )}
                          {select.task.reminderType !== 'recurring' ? (null) : (
                            <Box
                              sx={{
                                width: '100%',
                              }}
                            >
                              RECURRING
                            </Box>
                          )}
                        </Box>
                      )}

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
          )}
        </Box>
      )}
    </Box>
  )
}
