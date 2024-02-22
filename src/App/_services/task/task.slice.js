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
      //console.log('taskSlice.update', action.payload)
      let tasks = { ...state.tasks }

      // task
      if (action.payload.task !== undefined) {
        let updatedTask = updateTask(
          { ...state.tasks[action.payload.task.taskid] },
          { ...action.payload.task }
        )
        //console.log('updatedTask', updatedTask)
        tasks[updatedTask.task.taskid] = updatedTask.task
      }

      // tasks
      if (action.payload.tasks !== undefined) {
        Object.entries(action.payload.tasks).forEach((task) => {
          let updatedTask = updateTask(
            { ...state.tasks[task[1].taskid] },
            { ...task[1] }
          )
          //console.log('updatedTask', updatedTask)
          tasks[updatedTask.task.taskid] = updatedTask.task
        })
      }

      // activity
      if (action.payload.activity !== undefined) {
        if (action.payload.activity.tasks !== undefined) {
          action.payload.activity.tasks.forEach((task) => {
            console.log('forEach task', task)
            let updatedTask = updateTask(
              { ...state.tasks[task.taskid] },
              { ...task }
            )
            //console.log('updatedTask', updatedTask)
            tasks[updatedTask.task.taskid] = updatedTask.task
          })
        }
      }

      // activities
      if (action.payload.activities !== undefined) {
        //console.log("activities")
        Object.entries(action.payload.activities).forEach((activity) => {
          //console.log("forach activity[1]", activity[1])
          if (activity[1].tasks !== undefined) {
            activity[1].tasks.forEach((task) => {
              //console.log("forach task", task)
              let updatedTask = updateTask(
                { ...state.tasks[task.taskid] },
                { ...task }
              )
              if (state.tasks[task.taskid] === undefined) {
                updatedTask = { task: { ...task } }
                updatedTask.task.availabilities = getAvailabilities({ ...task })
              }
              //console.log('updatedTask', updatedTask.task)
              tasks[updatedTask.task.taskid] = { ...updatedTask.task }
            })
          }
        })
      }

      //console.log("tasks", tasks)
      state.tasks = tasks
    },

    store: (state, action) => {
      console.log('taskSlice.store', action.payload)
      // task
      if (action.payload.task !== undefined) {
        state.tasks[action.payload.task.taskid] = action.payload.task
        state.getone = 'available'
      }
      // tasks
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
      //console.log('taskSlice.change', action.payload)
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

function updateTask(a, update) {
  let reorder = -1
  let task = { ...a }
  if (task.availabilities === undefined) {
    task.availabilities = {}
  }
  if (update.name !== undefined) {
    task.name = update.name
    task.availabilities.name = 'available'
  }
  if (update.order !== undefined) {
    task.order = update.order
    task.availabilities.order = 'available'
    reorder = update.order
  }
  if (update.description !== undefined) {
    task.description = update.description
    task.availabilities.description = 'available'
  }
  if (update.state !== undefined) {
    task.state = update.state
    task.availabilities.state = 'available'
  }
  return {
    task: task,
    reorder: reorder,
  }
}

function getAvailabilities(task, previousAvailabilities = {}) {
  let availabilities = {}
  // Task
  Object.keys(task).forEach((k) => {
    availabilities[k] = 'available'
  })
  // Previous task
  Object.keys(previousAvailabilities).forEach((k) => {
    if (availabilities[k] === undefined) {
      availabilities[k] = 'available'
    }
  })
  return availabilities
}
