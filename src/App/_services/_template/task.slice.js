import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState: {
    state: {},
    tasks: {},
  },
  reducers: {
    change: (state, action) => {
      if (action.payload.taskid !== undefined) {
        state.tasks[action.payload.taskid] = action.payload.task
      }
    },
  },
})

export default taskSlice.reducer
