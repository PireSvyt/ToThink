import { createSlice } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activitySlice',
  initialState: {
    state: {},
    activities: {},
  },
  reducers: {
    change: (state, action) => {
      if (action.payload.activityid !== undefined) {
        state.activities[action.payload.activityid] = action.payload.activity
      }
    },
  },
})

export default activitySlice.reducer

