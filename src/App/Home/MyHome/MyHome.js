import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

// Components
import MyActivities from './MyActivities/MyActivities.js'
import CToolbar from './CToolbar/CToolbar.js'

export default function MyHome() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('MyHome')
  }
  // i18n
  const { t } = useTranslation()
  
  // State
  const [zoomLevel, setZoomLevel] = useState("0")
  
  // Changes
  let changes = {
    set: (newZoomLevel) => {
      setZoomLevel(newZoomLevel)
    },
  }

  return (
    <Box 
      data-testid="component-my home"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      }}
    >    
      <Box
        sx={{height: 60}}
      />
      <CToolbar zoomLevel={zoomLevel} set={changes.set} />
      <MyActivities zoomLevel={zoomLevel}/>
      <Box
        sx={{height: 50}}
      />
    </Box>
  )
}
