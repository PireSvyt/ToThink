import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  MenuItem,
  Input,
  Select,
  Skeleton,
} from '@mui/material'

export default function Editable(props) {
  /**
 * PROPS
    value={select.activity} 
    field={'name'}
    changes={changes}
    settings={activitySettings[props.zoomLevel]}
    disabled={disabled || props.dragging}
 */

  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('Editable')
  }

  // i18n
  const { t } = useTranslation()

  // Confirm modal
  const [initialValue, setInitialValue] = useState(null)
  const [readOnly, setReadOnly] = useState(true)
  const [saving, setSaving] = useState(false)

  if (
    initialValue === null &&
    props.value !== undefined &&
    props.value[props.field] !== undefined
  ) {
    setInitialValue(props.value[props.field])
  }

  // Changes
  let changes = {
    edit: async (e) => {
      if (props.value[props.field] !== e.target.value) {
        await props.changes.edit({
          field: props.field,
          value: e.target.value,
        })
      }
    },
    save: async () => {
      /*console.log('Editable.save', props.field)
      console.log('"'+initialValue+'" initial')
      console.log('"'+props.value[props.field]+'" new')*/
      if (initialValue !== props.value[props.field]) {
        setSaving(true)
        await props.changes.save({
          field: props.field,
          value: props.value[props.field],
        })
        setSaving(false)
      }
    },
  }

  let c = -1

  function getSetting(setting, fallback) {
    if (props.settings === undefined) {
      return fallback
    } else {
      if (props.settings[props.field] === undefined) {
        if (setting === 'hidden') {
          return true
        } else {            
          return fallback
        }
      } else {
        if (props.settings[props.field][setting] === undefined) {
          if (setting === 'hidden') {
            return false
          } else {            
            return fallback
          }
        } else {
          return props.settings[props.field][setting]
        }
      }
    }
  }

  const skeleton = (
    <Box sx={{ width: '100%' }}>
      <Skeleton
        variant="text"
        sx={{ typography: getSetting('variant', 'body1') }}
        width={Math.random() * 60 + 20 + '%'}
      />
    </Box>
  )

  //console.log("EDITABLE : I RENDER!", props.field)
  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      {props.settings[props.field] === undefined ? (
        null
      ) : (
        <Box sx={{ width: '100%', m: 0, p: 0 }}>
          {props.value === undefined ? (
           skeleton
          ) : (
            <Box sx={{ width: '100%', m: 0, p: 0 }}>
              {props.value.availabilities === undefined ? (
                skeleton
              ) : (
                <Box sx={{ width: '100%', m: 0, p: 0 }}>
                  {!Object.keys(props.value.availabilities).includes(props.field) ? (
                    skeleton
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                      }}
                      hidden={getSetting('hidden', false)}
                    >
                      {props.value === undefined ||
                      props.value[props.field] === undefined ? null : (
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
                                  data-testid={props.prefix + "#input-" + props.field}
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
                    </Box>
                  )}
                </Box>
              )}
            </Box>            
          )}
        </Box>
      )}
    </Box>
  )
}
