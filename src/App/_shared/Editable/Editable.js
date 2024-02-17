import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Link,
  TextField,
  Input,
  InputAdornment,
  Select
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import CircularProgress from '@mui/material/CircularProgress'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

export default function Editable(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('Editable')
  }
  // i18n
  const { t } = useTranslation()

  // Confirm modal
  const [readOnly, setReadOnly] = useState(true)
  const [saving, setSaving] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  // Changes
  let changes = {
    switchMode: () => {
      //setAnchorEl(event.currentTarget)
      console.log("to edit "+ readOnly)
      setReadOnly(readOnly === false)
    },
    edit: async (e) => {
      await props.edit({
        field: props.field,
        value: e.target.value
      })
    },
    save: async () => {
      setSaving(true)
      await props.save({
        field: props.field,
        value: props.value
      })
      setSaving(false)
    }
  }

  return (
    <Box
      sx={{
        width: '100%'
      }}
    >
      {props.type === 'TextField' ? (
        <TextField 
            multiline
            fullWidth
            size="small"
            value={props.value}
            placeholder={t(props.field)}
            variant="standard"
            onChange={changes.edit}
            onBlur={changes.save}
            inputProps={{
              sx:{
                variant: props.variant
              }
            }}
        />
      ) : props.type === 'Select' ? (
        <Select 
            size="small"
            value={props.value}
            label={t(props.field)}
            variant="standard"
            onChange={changes.edit}
            onBlur={changes.save}
        />
      ) : (
        null
      )}
      
    </Box>
  )
}