import * as React from 'react';
import { useTranslation } from 'react-i18next'
import { 
  Box, ToggleButton, ToggleButtonGroup,
  ButtonGroup,
  Button, Paper 
} from '@mui/material';

import ReorderIcon from '@mui/icons-material/Reorder';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ArticleIcon from '@mui/icons-material/Article';

import appStore from '../../../store.js'
import { serviceActivityGetMany } from '../../../_services/activity/activity.services.js';

export default function CToolbar(props) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    //console.log('CToolbar')
  }
  // i18n
  const { t } = useTranslation()
  
  const zoomLevels = [
    {
      label: t('zoomer.label.activitylist'),
      zoomLevel: "0",
      disabled: false,
      icon: () => {return ( <ReorderIcon/> )}
    },
    {
      label: t('zoomer.label.activitydetails'),
      zoomLevel: "1",
      disabled: false,
      icon: () => {return ( <ViewStreamIcon/> )}
    },
    {
      label: t('zoomer.label.tasklist'),
      zoomLevel: "2",
      disabled: false,
      icon: () => {return ( <ArticleIcon/> )}
    },
  ];

  // Changes
  let changes = {
    set: (e, val) => {
      if (val !== null) {
        if (val !== "0") {
          console.log("CToolbar.set", val)
          serviceActivityGetMany({
            requirements: [
              "name", "description", "tasks", "order"
            ]
          })
        }
        props.set(val)
      }
    },
    new: (item) => {
      switch (item) {
        case 'activity':
          appStore.dispatch({
            type: 'activityModalSlice/new',
          })
          break
        case 'task':
          appStore.dispatch({
            type: 'taskModalSlice/new',
          })
          break
        default:
          console.log('CToolbar.changes.new unrecognized', item)
      }
    },
  }

  return (
    <Box
      data-testid="component-tool bar"
      position="fixed"
      sx={{
        top: 50,
        bottom: 'auto',
        pt: 1,
        width: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1000
      }}
      bgcolor="white"
    >
      <Paper
        data-testid="component-tool bar"
        position="fixed"
        sx={{
          width: 1,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          p: 0
        }}
        bgcolor="white"
        elevation={3}
        square={false}
      >
      <ToggleButtonGroup 
        size="small"
        value={props.zoomLevel}
        exclusive={true}
        onChange={changes.set}
        sx={{
          p: 1,
        }}
      >
        {zoomLevels.map(zl => {
          return (            
            <ToggleButton 
              value={zl.zoomLevel} 
              key={zl.zoomLevel}
              disabled={zl.disabled}
            >
              {
                //t(zl.label)
                zl.icon()
              }
            </ToggleButton>
          )
        })}
      </ToggleButtonGroup>

      <ButtonGroup
        disableElevation
        variant="contained"
        aria-label="Disabled button group"
        sx={{
          p: 1,
        }}
      >
        <Button
          onClick={() => {changes.new('activity')}}
        >{
          t('generic.label.activity')
        }</Button>
        <Button
          onClick={() => {changes.new('task')}}
        >{
          t('generic.label.task')
        }</Button>
        <Button
          onClick={() => {changes.new('todo')}}
          disabled
        >{
          t('generic.label.todo')
        }</Button>
      </ButtonGroup>
      </Paper>
    </Box>
  );
}