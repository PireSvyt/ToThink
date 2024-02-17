import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import MyActivities from './MyActivities/MyActivities.js'

export default function MyHome() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('MyHome')
  }
  // i18n
  const { t } = useTranslation()

  return (
    <MyActivities/>
  )
}
