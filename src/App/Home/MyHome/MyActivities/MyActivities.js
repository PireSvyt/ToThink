import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@mui/material'
import SmsFailedIcon from '@mui/icons-material/SmsFailed'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LinearProgress from '@mui/material/LinearProgress'
import { TransitionGroup } from 'react-transition-group';

import Activity from '../../../_shared/Activity/Activity.js'
import appStore from '../../../store.js'
import { serviceActivityGetMany } from '../../../_services/activity/activity.services.js'

export default function MyActivities() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('MyActivities')
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    myActivitiesState: useSelector((state) => state.activitySlice.state),
    myActivities: useSelector((state) => state.activitySlice.activities),
  }

  console.log("MyActivities", select.myActivities)

  // Changes
  let changes = {
    new: () => {
      appStore.dispatch({
        type: 'activityModalSlice/new',
      })
    },
    refresh: () => {
      console.log("myActivities Initiates")
      serviceActivityGetMany()
    },
  }

  // Initiates
  if (select.myActivitiesState.getmany === undefined) {
    changes.refresh()
  }

  let c = -1

  return (
    <Box 
      data-testid="component-my activities"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}
    >

      <Stack 
        direction="row" 
        justifyContent="space-between"
        sx={{ 
          width: '100%',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">
          {t('home.label.myActivities')}
        </Typography>
        <IconButton
          data-testid="component-my activities#button-new activity"
          onClick={changes.new}
          color='primary'
          size='small'
        >
          <AddCircleIcon />
        </IconButton>
      </Stack>

      {select.myActivitiesState.getmany !== 'available' ? (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress/>
        </Box>
      ) : Object.keys(select.myActivities).length === 0 ? (
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
          <TransitionGroup   
          >
            {Object.entries(select.myActivities).map((myActivity) => {
              c += 1
              //<Activity activity={select.myActivities[myActivityid]} index={c} />
              return (
                <ListItem          
                  sx={{ 
                    width: '100%',
                    p: 0
                  }}
                  key={'activity-' + myActivity[1].activityid}
                >
                  <Activity activity={myActivity[1]} index={c} />
                </ListItem>
              )
            })}
          </TransitionGroup>
        </List>
      )}
    </Box>
  )
}
