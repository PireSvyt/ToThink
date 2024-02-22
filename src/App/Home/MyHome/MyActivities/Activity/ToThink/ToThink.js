import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box, Skeleton, IconButton } from '@mui/material'

import appStore from '../../../../../store.js'
import {
  serviceToThinkUpdate,
  serviceToThinkDelete,
} from '../../../../../_services/tothink/tothink.services.js'
import ConfirmModal from '../../../../../_shared/ConfirmModal/ConfirmModal.js'
import ItemMenu from '../../../../../_shared/ItemMenu/ItemMenu.js'
import Editable from '../../../../../_shared/Editable/Editable.js'
import Selectable from '../../../../../_shared/Selectable/Selectable.js'
import DatePickable from '../../../../../_shared/DatePickable/DatePickable.js'
import tothinkSettings from './tothink.settings.json'


export default function ToThink(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('ToThink ' + props.tothinkid)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    tothink: useSelector((state) => state.tothinkSlice.tothinks[props.tothinkid]),
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
      console.log('ToThink.edit', fieldValue)
      let tothinkChange = { ...select.tothink }
      tothinkChange[fieldValue.field] = fieldValue.value
      appStore.dispatch({
        type: 'tothinkSlice/update',
        payload: {
          tothink: tothinkChange,
        },
      })
    },
    save: async (fieldValue) => {
      console.log('ToThink.save ', fieldValue, select.tothink)
      let directInputs = {
        tothinkid: props.tothinkid,
      }
      directInputs[fieldValue.field] = fieldValue.value
      serviceToThinkUpdate(directInputs)
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
        serviceToThinkDelete({
          tothinkid: props.tothinkid,
        }).then(() => {
          setDisabled(false)
        })
        break
      default:
        console.error('ToThink.confirmCallback unmatched ' + choice)
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
        sx={{ typography: tothinkSettings.requirements[0].name.variant}}
        width={Math.random() * 60 + 20 + '%'}
      />
    </Box>
  )

  //console.log("TASK : I RENDER!", select.tothink)
  let c = -1
  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      {select.tothink === undefined ? (
        skeleton
      ) : (
        <Box sx={{ width: '100%', m: 0, p: 0 }}>
          {select.tothink.availabilities === undefined ? (
            skeleton
          ) : (
            <Box
              data-testid={props.prefix + 'list-tothinks#listitem-' + props.index}
              tothinkid={props.tothinkid}
              sx={{ width: '100%' }}
              bgcolor={'white'}
            >
                <Box
                  tothinkid={props.tothinkid}
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
                      prefix={props.prefix + 'list-tothinks#listitem-' + props.index}
                      value={select.tothink}
                      field={'name'}
                      changes={changes}
                      settings={tothinkSettings.requirements[props.zoomLevel]}
                      disabled={disabled || props.dragging}
                    />

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Selectable
                        prefix={props.prefix + 'list-tothinks#listitem-' + props.index}
                        value={select.tothink}
                        values={tothinkSettings.values}
                        field={'state'}
                        changes={changes}
                        settings={
                          tothinkSettings.requirements[props.zoomLevel]
                        }
                        disabled={disabled || props.dragging}
                      />
                      <ItemMenu
                        prefix={props.prefix + 'list-tothinks#listitem-' + props.index}
                        menuItems={menuItems}
                        onclick={changes.onMenuItemClick}
                        disabled={disabled || props.dragging}
                      />                      
                    </Box>

                  </Box>

                </Box>
                    
                <Editable
                  prefix={props.prefix + 'list-tothinks#listitem-' + props.index}
                  value={select.tothink}
                  field={'description'}
                  changes={changes}
                  settings={
                    tothinkSettings.requirements[props.zoomLevel]
                  }
                  disabled={disabled || props.dragging}
                />

                {tothinkSettings.requirements[props.zoomLevel].reminderType === undefined ? (null) : (
                    <Box
                      sx={{
                        width: '100%',
                      }}
                    >
                    <Selectable
                      prefix={props.prefix + 'list-tothinks#listitem-' + props.index}
                      value={select.tothink}
                      values={tothinkSettings.values}
                      field={'reminderType'}
                      changes={changes}
                      settings={
                        tothinkSettings.requirements[props.zoomLevel]
                      }
                      disabled={disabled || props.dragging}
                    />

                      {select.tothink.reminderType === undefined ? (null) : (
                        <Box
                          sx={{
                            width: '100%',
                          }}
                        >
                          {select.tothink.reminderType !== 'oneshot' ? (null) : (
                            <Box
                              sx={{
                                width: '100%',
                              }}
                            >
                              <DatePickable 
                                prefix={props.prefix + 'list-tothinks#listitem-' + props.index}
                                value={select.tothink}
                                field={'oneshotDate'}
                                changes={changes}
                                settings={
                                  tothinkSettings.requirements[props.zoomLevel]
                                }
                                disabled={disabled || props.dragging}
                              />
                            </Box>
                          )}
                          {select.tothink.reminderType !== 'recurring' ? (null) : (
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
                    title: 'tothink.confirm.delete.title',
                    content: 'tothink.confirm.delete.content',
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
