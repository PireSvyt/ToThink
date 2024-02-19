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
  Select,
  Skeleton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu.js'
import CircularProgress from '@mui/material/CircularProgress'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'

import { random_id } from '../../_services/toolkit'

export default function Editable(props) {
  /**
 * PROPS
    value={select.activity} 
    type={'TextField'} 
    field={'name'}
    changes={changes}
    settings={activitySettings.name[props.zoomLevel]}
    disabled={disabled || props.dragging}
 */

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
      console.log('to edit ' + readOnly)
      setReadOnly(readOnly === false)
    },
    edit: async (e) => {
      if (props.value[props.field] !== e.target.value) {
        await props.changes.edit({
          field: props.field,
          value: e.target.value,
        })
      }
    },
    onclick: async (value) => {
      if (props.value[props.field] !== value) {
        setSaving(true)
        await props.changes.save({
          field: props.field,
          value: value,
        })
        setSaving(false)
      }
    },
    save: async () => {
      setSaving(true)
      await props.changes.save({
        field: props.field,
        value: props.value[props.field],
      })
      setSaving(false)
    },
  }

  let c = -1

  function getSetting(setting, fallback) {
    if (props.settings === undefined) {
      return fallback
    } else {
      if (props.settings[setting] === undefined) {
        return fallback
      } else {
        return props.settings[setting]
      }
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
      hidden={getSetting('hidden', false)}
    >
      {props.type !== 'TextField' &&
      props.value !== undefined &&
      props.value[props.field] !== undefined ? null : (
        <Box sx={{ width: '100%' }}>
          {props.value.availabilities === undefined ? null : (
            <Box sx={{ width: '100%' }}>
              {props.value.availabilities[props.field] !== 'available' ? (
                <Box sx={{ width: '100%' }}>
                  <Skeleton
                    variant="text"
                    sx={{ typography: getSetting('variant', 'body1') }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ typography: getSetting('variant', 'body1') }}
                    width={Math.random() * 100 + '%'}
                  />
                </Box>
              ) : (
                <Input
                  multiline
                  fullWidth
                  size="small"
                  value={props.value[props.field]}
                  placeholder={t(props.field)}
                  variant="standard"
                  onChange={changes.edit}
                  onBlur={changes.save}
                  sx={{ typography: getSetting('variant', 'body1') }}
                  disabled={getSetting('disabled', false)}
                />
              )}
            </Box>
          )}
        </Box>
      )}

      {props.type !== 'Select' &&
      props.value !== undefined &&
      props.value[props.field] !== undefined ? null : (
        <Select
          data-testid={props.prefix + '#list-' + props.field}
          size="small"
          value={props.value[props.field]}
          label={t(props.field)}
          variant="standard"
          disabled={getSetting('disabled', false)}
          onChange={changes.edit}
          onBlur={changes.save}
          renderValue={(val) => {
            return (
              <Typography variant={getSetting('variant', 'body1')}>
                {t('generic.label.' + val)}
              </Typography>
            )
          }}
        >
          {props.values === undefined ? null : (
            <Box>
              {props.values.map((item) => {
                c += 1
                return (
                  <MenuItem
                    data-testid={
                      props.prefix + '#list-' + props.field + '#listitem-' + c
                    }
                    key={item.value}
                    onClick={() => changes.onclick(item.value)}
                    hidden={item.hidden === true}
                    disabled={item.disabled === true}
                    dense
                  >
                    <Typography variant={getSetting('variant', 'body1')}>
                      {t('generic.label.' + item.value)}
                    </Typography>
                  </MenuItem>
                )
              })}
            </Box>
          )}
        </Select>
      )}
    </Box>
  )
}
