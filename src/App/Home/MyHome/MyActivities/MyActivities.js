import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  List,
  Collapse,
  Divider
} from '@mui/material'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import LinearProgress from '@mui/material/LinearProgress'
import { TransitionGroup } from 'react-transition-group';

import Activity from '../../../_shared/Activity/Activity.js'
import { serviceActivityGetMine } from '../../../_services/activity/activity.services.js'

export default function MyActivities(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('MyActivities')
  }
  // i18n
  const { t } = useTranslation()

  // State
  const [zoomLevel, setZoomLevel] = useState("0")
  const [dragging, setDragging] = useState(false)

  // Changes
  let changes = {
    getmine: async () => {
      await serviceActivityGetMine()
    },
    drag: (newValue) => {
      setDragging(newValue)
    },
    refresh: async () => {
      await serviceActivityGetMine()
    },
    sort: (a, b) => {
      return a.order < b.order
    }
  }

  // Selects
  const select = {
    mine: useSelector((state) => state.activitySlice.state.getmine),
    sortedList: useSelector((state) => state.activitySlice.sortedList),
  }

  // Initiates
  if (select.mine === undefined) {
    changes.getmine()
  }

  let c = -1

  return (
    <Box 
      data-testid="component-my activities"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        left: '5%',
        width: '90%',
        right: '5%'
      }}
    >
      {select.mine !== 'available' ? (
        <Box sx={{ width: '1' }}>
          <LinearProgress/>
        </Box>
      ) : select.sortedList.length === 0 ? (
        <Box
          sx={{
            m: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          data-testid="component-my activities#box-no activity note"
        >
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="h6"
            component="span"
            align="center"
          >
            {t('home.label.noActivity')}
          </Typography>
          <SmsFailedIcon
            sx={{ mt: 2, mb: 2 }}
            fontSize="large"
            color="primary"
          />
          <Typography
            sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}
            variant="body1"
            component="span"
            align="center"
          >
            {t('home.label.noActivityExplanation')}
          </Typography>
        </Box>
      ) : (
        <List 
          dense={false} 
          data-testid="component-my activities#list-activities"
          sx={{ 
            width: '100%',
            p: 0
          }}
        >
          <TransitionGroup>
            {(select.sortedList).map((activity) => {
              c += 1
              return (
                <Collapse           
                  sx={{ 
                    width: '100%',
                    m:0, p: 0
                  }}
                  key={'activityid-'+activity.activityid}
                >
                  <Activity 
                    zoomLevel={props.zoomLevel} 
                    activityid={activity.activityid} 
                    index={c}
                    dragging={dragging}
                    drag={changes.drag}
                  />
                  <Divider 
                    variant="middle" 
                    component="li" 
                    sx={{ m:0, p: 0}} 
                  />
                </Collapse>
              )
            })}
          </TransitionGroup>
        </List>
      )}
    </Box>
  )
}
