import React from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonGroup, Button, Box, Typography } from '@mui/material'

// Reducers
import WelcomeCarousel from './WelcomeCarousel/WelcomeCarousel.js'
import appStore from '../../store.js'

export default function Landing() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log("Landing");
  }
  // i18n
  const { t } = useTranslation()

  // Changes
  const changes = {
    signin: () => {
      appStore.dispatch({
        type: 'signinModalSlice/open',
      })
    },
  }

  // Render
  return (
    <Box data-testid="component-landing" textAlign="center" sx={{ p: 5 }}>
      <WelcomeCarousel />
      <Button
        onClick={changes.signin}
        size="large"
        data-testid="component-landing#button-sign in"
        variant="contained"
      >
        {t('generic.button.signin')}
      </Button>
    </Box>
  )
}
