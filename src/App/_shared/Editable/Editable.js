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
  Select
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import CircularProgress from '@mui/material/CircularProgress'
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

import { random_id } from '../../_services/toolkit'

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
    onclick: async (value) => {
      setSaving(true)
      await props.save({
        field: props.field,
        value: value
      })
      setSaving(false)
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

  let c = -1

  return (
    <Box
      sx={{
        width: '100%'
      }}
      hidden={props.zoomConstrains.hidden}
    >
      {props.type === 'TextField' ? (
        <Input  
            multiline
            fullWidth
            size="small"
            value={props.value}
            placeholder={t(props.field)}
            variant="standard"
            onChange={changes.edit}
            onBlur={changes.save}
            sx={{typography: props.zoomConstrains.variant}}
        />
      ) : props.type === 'Select' ? (
        <Select 
          data-testid={props.prefix+"#list-"+props.field}
          size="small"
          value={props.value}
          label={t(props.field)}
          variant="standard"
          onChange={changes.edit}
          onBlur={changes.save}
          renderValue={ val => {
            return (
              <Typography 
              variant={props.zoomConstrains.variant}
              >{t("generic.label."+val)}</Typography>
            )
          }}
        >
          {props.values.map((item) => {
              c += 1
              return (
                  <MenuItem
                      data-testid={props.prefix+"#list-"+props.field+"#listitem-"+c}
                      key={item.value}
                      onClick={() => changes.onclick(item.value)}
                      hidden={item.hidden === true}
                      disabled={item.disabled === true}
                      dense
                  >
                      <Typography 
                        variant={props.zoomConstrains.variant}
                      >{t("generic.label."+item.value)}</Typography>
                  </MenuItem>
              )
          })}
        </Select>
      ) : (
        null
      )}
      
    </Box>
  )
}