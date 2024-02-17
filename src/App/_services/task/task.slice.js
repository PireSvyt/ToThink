import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState: {
    state: {
      update: undefined,
      getmany: undefined,
      getone: undefined,
      delete: undefined
    },
    tasks: {},
  },
  reducers: {
    change: (state, action) => {
      console.log("taskSlice.change", action.payload)
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
      if (action.payload.task !== undefined) {
        state.tasks[action.payload.task.taskid] = action.payload.task
      }
      // get many
      if (action.payload.tasks !== undefined) {
        action.payload.tasks.forEach(task => {
          state.tasks[task.taskid] = task
        });
      }
    },
  },
})

export default taskSlice.reducer

