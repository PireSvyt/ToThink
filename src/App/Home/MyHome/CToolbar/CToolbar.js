import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  ButtonGroup,
  Button,
  Paper,
} from '@mui/material'

import ReorderIcon from '@mui/icons-material/Reorder'
import ViewStreamIcon from '@mui/icons-material/ViewStream'
import ArticleIcon from '@mui/icons-material/Article'

import appStore from '../../../store.js'
import { serviceActivityDig } from '../../../_services/activity/activity.services.js'
import { serviceToThinkDig } from '../../../_services/tothink/tothink.services.js'

export default function CToolbar(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('CToolbar')
  }
  // i18n
  const { t } = useTranslation()

  const zoomLevels = [
    {
      label: t('zoomer.label.activitylist'),
      zoomLevel: '0',
      disabled: false,
      icon: () => {
        return <ReorderIcon />
      },
    },
    {
      label: t('zoomer.label.activitydetails'),
      zoomLevel: '1',
      disabled: false,
      icon: () => {
        return <ViewStreamIcon />
      },
    },
    {
      label: t('zoomer.label.tothinklist'),
      zoomLevel: '2',
      disabled: false,
      icon: () => {
        return <ArticleIcon />
      },
    },
  ]

  // Changes
  let changes = {
    set: async (e, val) => {
      switch (val) {
        case '0':
          // get mine
          break
        case '1':
          console.log('DIG ACTIVITIES')
          serviceActivityDig({
            //activityids: [ LIST OF ACTIVITY IDS TO GET / OTHERWISE ALL ],
            requirements: ['name', 'description', 'tothinks', 'order'],
          })
          break
        case '2':
          //console.log("DIG ACTIVITIES")
          serviceActivityDig({
            //activityids: [ LIST OF ACTIVITY IDS TO GET / OTHERWISE ALL ],
            requirements: ['name', 'description', 'tothinks', 'order'],
          })
          //console.log("DIG TASKS")
          serviceToThinkDig({
            //tothinkids: [ LIST OF TASK IDS TO GET / OTHERWISE ALL ],
            requirements: ['name', 'description', 'state', 'order'],
          })
          break
      }
      props.set(val)
    },
    new: (item) => {
      switch (item) {
        case 'activity':
          appStore.dispatch({
            type: 'activityModalSlice/new',
          })
          break
        case 'tothink':
          appStore.dispatch({
            type: 'tothinkModalSlice/new',
          })
          break
        default:
          console.log('CToolbar.changes.new unrecognized', item)
      }
    },
  }

  return (
    <Box
      data-testid="component-tool bar"
      position="fixed"
      sx={{
        top: 50,
        bottom: 'auto',
        pt: 1,
        width: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000,
      }}
      bgcolor="white"
    >
      <Paper
        data-testid="component-tool bar"
        position="fixed"
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          p: 0,
        }}
        bgcolor="white"
        elevation={3}
        square={false}
      >
        <ToggleButtonGroup
          size="small"
          value={props.zoomLevel}
          exclusive={true}
          onChange={changes.set}
          sx={{
            p: 1,
          }}
        >
          {zoomLevels.map((zl) => {
            return (
              <ToggleButton
                value={zl.zoomLevel}
                key={zl.zoomLevel}
                disabled={zl.disabled}
              >
                {
                  //t(zl.label)
                  zl.icon()
                }
              </ToggleButton>
            )
          })}
        </ToggleButtonGroup>

        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled button group"
          sx={{
            p: 1,
          }}
        >
          <Button
            onClick={() => {
              changes.new('activity')
            }}
          >
            {t('generic.label.activity')}
          </Button>
          <Button
            onClick={() => {
              changes.new('tothink')
            }}
          >
            {t('generic.label.tothink')}
          </Button>
          <Button
            onClick={() => {
              changes.new('todo')
            }}
            disabled
          >
            {t('generic.label.todo')}
          </Button>
        </ButtonGroup>
      </Paper>
    </Box>
  )
}
