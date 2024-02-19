import { createSlice } from '@reduxjs/toolkit'

const activitySlice = createSlice({
  name: 'activitySlice',
  initialState: {
    state: {
      getmine: undefined,
      create: undefined,
      update: undefined,
      getmany: undefined,
      getone: undefined,
      delete: undefined,
    },
    activities: {},
    sortedList: [],
  },
  reducers: {
    mine: (state, action) => {
      // Store the activities
      //console.log("activitySlice.mine", action.payload)
      state.sortedList = action.payload.activities
      state.state.getmine = 'available'
    },
    getmany: (state, action) => {
      console.log('activitySlice.getmany', action.payload)
      // request
      if (action.payload.state !== undefined) {
        state.state.getmany = action.payload.state
        if (action.payload.state === 'wip') {
          let activities = { ...state.activities }
          Object.keys(activities).forEach((aid) => {
            let wipActivity = { ...activities[aid] }
            let availabilities = wipActivity.availabilities
            action.payload.requirements.forEach((req) => {
              if (availabilities[req] !== 'available') {
                availabilities[req] = 'wip'
              }
            })
            wipActivity.availabilities = availabilities
            activities[aid] = wipActivity
          })
        }
      }
      // result
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((a) => {
          let activity = { ...a }
          let previousActivity = state.activities[activity.activityid]
          activity.availabilities = getAvailabilities(
            activity,
            previousActivity.availabilities
          )
          state.activities[activity.activityid] = activity
        })
        state.state.getmany = 'available'
      }
    },
    create: (state, action) => {
      // Creates a new activity
      //console.log("activitySlice.create", action.payload)
      let activity = { ...action.payload.activity }
      activity.availabilities = getAvailabilities(activity)
      state.activities[activity.activityid] = activity
      state.sortedList.unshift(action.payload.activity)
      state.state.create = 'available'
    },
    store: (state, action) => {
      // Overwrite any existing activity
      //console.log("activitySlice.store", action.payload)
      // get one
      if (action.payload.activity !== undefined) {
        let activity = { ...action.payload.activity }
        activity.availabilities = getAvailabilities(activity)
        state.activities[action.payload.activity.activityid] = activity
      }
      // get many
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((a) => {
          let activity = { ...a }
          activity.availabilities = getAvailabilities(activity)
          state.activities[activity.activityid] = activity
        })
        state.state.getmany = 'available'
      }
    },
    sort: (state, action) => {
      // Sort the activities
      let sortedList = [...state.sortedList]
      sortedList.sort((a, b) => {
        return a.order < b.order
      })
      state.sortedList = sortedList
    },
    update: (state, action) => {
      // Update an activity
      let sortedList = [...state.sortedList]
      // Activity
      if (action.payload.activity !== undefined) {
        let activity = { ...action.payload.activity }
        activity.availabilities = getAvailabilities(activity)
        state.activities[action.payload.activity.activityid] = activity
        // SortedList
        let activityids = sortedList.map((a) => {
          return a.activityid
        })
        let pos = activityids.indexOf(action.payload.activity.activityid)
        sortedList[pos] = action.payload.activity
        if (state.sortedList[pos].order !== sortedList[pos].order) {
          console.log('SORT')
          sortedList.sort((a, b) => {
            let c = { ...a }
            let d = { ...b }
            return d.order - c.order
          })
        }
      }
      // Activities
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((a) => {
          let activity = { ...a }
          activity.availabilities = getAvailabilities(activity)
          state.activities[activity.activityid] = activity
          // SortedList
          let activityids = sortedList.map((a) => {
            return a.activityid
          })
          let pos = activityids.indexOf(activity.activityid)
          sortedList[pos] = activity
        })
        sortedList.sort((a, b) => {
          let c = { ...a }
          let d = { ...b }
          return d.order - c.order
        })
      }
      console.log('sortedList', sortedList)
      state.sortedList = sortedList
    },
    change: (state, action) => {
      console.log('activitySlice.change', action.payload)
      if (action.payload.state !== undefined) {
        if (action.payload.state.getmine !== undefined) {
          state.state.getmine = action.payload.state.getmine
        }
        if (action.payload.state.create !== undefined) {
          state.state.create = action.payload.state.create
        }
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
        let currentActivity = {
          ...state.activities[action.payload.activity.activityid],
        }
        Object.keys(action.payload.activity).forEach((k) => {
          currentActivity[k] = action.payload.activity[k]
        })
        state.activities[action.payload.activity.activityid] = currentActivity
      }
      /*
      // get many
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach(activity => {
          state.activities[activity.activityid] = activity
        });
      }
      // task
      if (action.payload.task !== undefined) {
        let impactedActivities = []
        impactedActivities = Object.entries(state.activities).filter(
          activity => activity.tasks.map(
            activityTask => activityTask.taskid
          ).includes(action.payload.task.taskid)
        )
        impactedActivities.forEach(impactedActivity => {
          let currentTasks = {...impactedActivities.tasks}
          currentTasks.forEach(currentTask => {
            if (currentTask.taskid === action.payload.task.taskid) {
              currentTasks[currentTask.taskid] = action.payload.task
            }
          })
          impactedActivity.tasks = currentTasks
        })
        impactedActivities.forEach(impactedActivity => {
          state.activities[impactedActivity.activityid] = impactedActivity
        })
      }
      // TODO : many tasks*/
    },
    delete: (state, action) => {
      console.log('sliceActivity.delete', action.payload)
      let activities = { ...state.activities }
      let sortedList = []
      state.sortedList.forEach((sortedActivity) => {
        let toKeep = true
        if (action.payload.activityid !== undefined) {
          if (action.payload.activityid === sortedActivity.activityid) {
            toKeep = false
          }
        }

        if (toKeep) {
          sortedList.push(sortedActivity)
        }
      })
      console.log('sliceActivity.delete sortedList', sortedList)
      state.sortedList = sortedList
      state.activities = activities
    },
  },
})

export default activitySlice.reducer

function getAvailabilities(activity, previousAvailabilities = {}) {
  let availabilities = {}
  // Activity
  Object.keys(activity).forEach((k) => {
    availabilities[k] = 'available'
  })
  // Previous activity
  Object.keys(previousAvailabilities).forEach((k) => {
    if (availabilities[k] === undefined) {
      availabilities[k] = 'available'
    }
  })
  return availabilities
}
