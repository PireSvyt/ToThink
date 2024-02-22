import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Typography,
  MenuItem,
  Select,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useSelector } from 'react-redux'

// Services
import { serviceToThinkCreate } from '../../../_services/tothink/tothink.services.js'
// Reducers
import appStore from '../../../store.js'

export default function ToThinkModal() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("ToThinkModal");
  }
  // i18n
  const { t } = useTranslation()

  // Constants
  const componentHeight = window.innerHeight - 115

  // Selects
  const select = {
    open: useSelector((state) => state.tothinkModalSlice.open),
    disabled: useSelector((state) => state.tothinkModalSlice.disabled),
    loading: useSelector((state) => state.tothinkModalSlice.loading),
    inputs: useSelector((state) => state.tothinkModalSlice.inputs),
    errors: useSelector((state) => state.tothinkModalSlice.errors),
    activities: useSelector((state) => state.activitySlice.activities),
  }

  // Changes
  const changes = {
    close: () => {
      appStore.dispatch({
        type: 'tothinkModalSlice/close',
      })
    },
    name: (e) => {
      appStore.dispatch({
        type: 'tothinkModalSlice/change',
        payload: {
          inputs: {
            name: e.target.value,
          },
          errors: {
            name: false,
          },
        },
      })
    },
    activityid: (e) => {
      appStore.dispatch({
        type: 'tothinkModalSlice/change',
        payload: {
          inputs: {
            activityid: e.target.value,
          },
          errors: {
            activityid: false,
          },
        },
      })
    },
    create: () => {
      console.log('ToThinkModal.create')
      serviceToThinkCreate()
    },
  }

  let c = -1

  // Render
  return (
    <Box>
      <Dialog
        open={select.open}
        onClose={changes.close}
        fullWidth={true}
        data-testid="modal-tothink"
      >
        <DialogTitle>{t('tothink.label.new')}</DialogTitle>
        <DialogContent
        /*sx={{
            height: componentHeight,
          }}*/
        >
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly',
            }}
          >
            <FormControl>
              <TextField
                name="name"
                required
                label={t('generic.input.name')}
                variant="standard"
                value={select.inputs.name}
                onChange={changes.name}
                autoComplete="off"
                error={select.errors.name}
                data-testid="modal-tothink#input-name"
              />

              <Select
                name="activityid"
                required
                label={t('generic.input.activity')}
                variant="standard"
                value={select.inputs.activityid}
                onChange={changes.activityid}
                error={select.errors.activityid}
                data-testid="modal-tothink#input-activityid"
              >
                <MenuItem value="" key={'act-' + ''}>
                  <em>{t('generic.label.none')}</em>
                </MenuItem>
                {Object.entries(select.activities).map((activity) => {
                  c += 1
                  return (
                    <MenuItem
                      value={activity[1].activityid}
                      key={'act-' + activity[1].activityid}
                    >
                      {activity[1].name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button data-testid="modal-tothink#button-close" onClick={changes.close}>
            {t('generic.button.cancel')}
          </Button>
          <LoadingButton
            variant="contained"
            onClick={changes.create}
            disabled={select.disabled}
            loading={select.loading}
            data-testid="modal-tothink#button-proceed"
          >
            {t('generic.button.proceed')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
