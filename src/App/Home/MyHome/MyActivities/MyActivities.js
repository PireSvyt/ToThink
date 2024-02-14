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

import Activity from '../../../_shared/Activity/Activity.js'
import appStore from '../../../store.js'

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

  // Changes
  let changes = {
    new: () => {
      appStore.dispatch({
        type: 'activityModalSlice/new',
      })
    },
  }

  let c = -1

  return (
    <Box 
    data-testid="component-my activities"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <Box
        sx={{
          width: '80%',
        }}
      >

      <Stack direction="row" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h6" component="span">
          {t('home.label.myActivities')}
        </Typography>
        <IconButton
          data-testid="component-my activities#button-new activity"
          sx={{ p: 2 }}
          onClick={changes.new}
          color='primary'
        >
          <AddCircleIcon />
        </IconButton>
      </Stack>

      {select.myActivitiesState !== 'available' ? (
        <Box sx={{ left: '10%', right: '10%' }}>
          <LinearProgress/>
        </Box>
      ) : select.myActivities.length === 0 ? (
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
        <List dense={false} data-testid="component-my activities#list-activities">
          {select.myActivities.map((myActivity) => {
            c += 1
            return (
              <ListItem key={'activity-' + myActivity.activityid}>
                <Activity activity={myActivity} index={c} />
              </ListItem>
            )
          })}
        </List>
      )}
      </Box>
    </Box>
  )
}
