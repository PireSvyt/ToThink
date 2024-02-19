import { createSlice } from '@reduxjs/toolkit'
import appStore from '../../store.js'

const taskSlice = createSlice({
  name: 'taskSlice',
  initialState: {
    state: {
      update: undefined,
      getmany: undefined,
      getone: undefined,
      delete: undefined,
    },
    tasks: {},
  },
  reducers: {
    update: (state, action) => {
      console.log('taskSlice.update', action.payload)
      // activity
      if (action.payload.activity !== undefined) {
        if (action.payload.activity.tasks !== undefined) {
          action.payload.activity.tasks.forEach((task) => {
            let currentTask = { ...state.tasks[task.taskid] }
            Object.keys(task).forEach((k) => {
              currentTask[k] = task[k]
            })
            state.tasks[task.taskid] = currentTask
          })
        }
      }
      // activities
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((activity) => {
          if (activity.tasks !== undefined) {
            activity.tasks.forEach((task) => {
              let currentTask = { ...state.tasks[task.taskid] }
              Object.keys(task).forEach((k) => {
                currentTask[k] = task[k]
              })
              state.tasks[task.taskid] = currentTask
            })
          }
        })
      }
    },

    store: (state, action) => {
      console.log('taskSlice.store', action.payload)
      // get one
      if (action.payload.task !== undefined) {
        state.tasks[action.payload.task.taskid] = action.payload.task
        state.getone = 'available'
      }
      // get many
      if (action.payload.tasks !== undefined) {
        action.payload.tasks.forEach((task) => {
          state.tasks[task.taskid] = task
        })
        state.getmany = 'available'
      }
      // activity
      if (action.payload.activity !== undefined) {
        if (action.payload.activity.tasks !== undefined) {
          action.payload.activity.tasks.forEach((task) => {
            state.tasks[task.taskid] = { ...task }
          })
        }
      }
      // activities
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((activity) => {
          if (activity.tasks !== undefined) {
            activity.tasks.forEach((task) => {
              state.tasks[task.taskid] = { ...task }
            })
          }
        })
      }
    },
    change: (state, action) => {
      console.log('taskSlice.change', action.payload)
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
        action.payload.tasks.forEach((task) => {
          state.tasks[task.taskid] = task
        })
      }
      // activity
      if (action.payload.activity !== undefined) {
        if (action.payload.activity.tasks !== undefined) {
          action.payload.activity.tasks.forEach((task) => {
            state.tasks[task.taskid] = { ...task }
          })
        }
      }
      // activities
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((activity) => {
          if (activity.tasks !== undefined) {
            activity.tasks.forEach((task) => {
              state.tasks[task.taskid] = { ...task }
            })
          }
        })
      }
    },
    delete: (state, action) => {
      //console.log("sliceTask.delete",action.payload)
      let tasks = { ...state.tasks }
      //console.log("* before deletion", tasks)
      if (action.payload.taskid !== undefined) {
        delete tasks[action.payload.taskid]
      }
      if (action.payload.taskids !== undefined) {
        action.payload.taskids.forEach((taskid) => {
          delete tasks[taskid]
        })
      }
      //console.log("* after deletion", tasks)
      state.tasks = tasks
    },
  },
})

export default taskSlice.reducer
