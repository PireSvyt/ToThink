import { createSlice } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activitySlice',
  initialState: {
    state: {
      update: undefined,
      getmany: undefined,
      getone: undefined,
      delete: undefined
    },
    activities: {},
  },
  reducers: {
    change: (state, action) => {
      console.log("activitySlice.change", action.payload)
      if (action.payload.state !== undefined) {
        if (action.payload.state.update !== undefined) {
          state.state.update = action.payload.state.update
        }
        if (action.payload.state.getmany !== undefined) {
          state.state.getmany = action.payload.state.getmany
        }
        if (action.payload.state.getone !== undefined) {
          state.state.getone = action.payload.state.getone
        }
        if (action.payload.state.delete !== undefined) {
          state.state.delete = action.payload.state.delete
        }
      }
      // get one
      if (action.payload.activity !== undefined) {
        let targetedActivity = { ...action.payload.activity }
        // preserve tasks
        if (state.activities[action.payload.activity.activityid] !== undefined) {
          if (state.activities[action.payload.activity.activityid].tasks !== undefined) {
            targetedActivity.tasks = state.activities[action.payload.activity.activityid].tasks
          }
        }
        state.activities[action.payload.activity.activityid] = targetedActivity
      }
      // get many
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach(activity => {
          let targetedActivity = { ...activity }
          // preserve tasks
          if (state.activities[activity.activityid] !== undefined) {
            if (state.activities[activity.activityid].tasks !== undefined) {
              targetedActivity.tasks = state.activities[activity.activityid].tasks
            }
          }
          state.activities[activity.activityid] = targetedActivity
        });
      }
    },
  },
})

export default activitySlice.reducer

