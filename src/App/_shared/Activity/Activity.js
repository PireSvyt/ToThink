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

import Task from '../Task/Task.js'
import appStore from '../../store.js'

export default function Activity(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('Activity ' + props.activity.activityid)
  }
  // i18n
  const { t } = useTranslation()

  // Selects
  const select = {
    myActivityTasks: useSelector((state) => { return state.taskSlice.tasks
      .filer( task => {props.activity.tasks
        .map(activityTask => { return activityTask.taskid })
        .includes(task.taskid)})
    }),
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
  }

  // Confirm modal
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
        console.error('Activity.confirmCallback unmatched ' + choice)
    }
  }

  return (
    <Box
      data-testid={"list-activities#listitem-"+props.index}
      activityid={props.activity.activityid}
    >
      ACTIVITY
      <List dense={false}
        data-testid={"list-activities#listitem-"+props.index+"#list-tasks"}
      >
          {select.myActivityTasks.map((activityTask) => {
            c += 1
            return (
              <ListItem key={'task-' + activityTask.taskid}>
                <Task task={activityTask} index={c} prefix={"list-activities#listitem-"+props.index+"#"} />
              </ListItem>
            )
          })}
        </List>
    </Box>
  )
}