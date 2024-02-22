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

      // Activities
      let activities = {}
      action.payload.activities.forEach((activity) => {
        //console.log("ADDING ACTIVITY", activity)
        let updatedActivity = { ...activity }
        updatedActivity.availabilities = getAvailabilities(updatedActivity)
        activities[updatedActivity.activityid] = { ...updatedActivity }
      })
      state.activities = activities
      //console.log("ADDING ACTIVITIES", activities)

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
      // Empty fields
      activity.description = ''
      activity.tothinks = []
      //
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
      //console.log("activitySlice.update", action.payload)
      // Update an activity
      let sortedList = [...state.sortedList]
      let toSort = false
      // Activity
      if (action.payload.activity !== undefined) {
        let updatedActivity = updateActivity(
          { ...state.activities[action.payload.activity.activityid] },
          action.payload.activity
        )
        console.log('updatedActivity (single)', updatedActivity)
        state.activities[action.payload.activity.activityid] =
          updatedActivity.activity
        if (updatedActivity.reorder !== -1) {
          // SortedList
          let activityids = sortedList.map((a) => {
            return a.activityid
          })
          let pos = activityids.indexOf(action.payload.activity.activityid)
          sortedList[pos].order = updatedActivity.reorder
          toSort = true
        }
      }
      // Activities
      if (action.payload.activities !== undefined) {
        let activities = { ...state.activities }
        //console.log('initial activities', activities)
        Object.entries(action.payload.activities).forEach((activity) => {
          //console.log("forEach activity", activity)
          let updatedActivity = updateActivity(
            { ...activities[activity[1].activityid] },
            { ...activity[1] }
          )
          //console.log('updatedActivity.activity', updatedActivity.activity)
          activities[activity[1].activityid] = { ...updatedActivity.activity }
          if (updatedActivity.reorder !== -1) {
            // SortedList
            toSort = true
            let activityids = sortedList.map((a) => {
              return a.activityid
            })
            let pos = activityids.indexOf(activity[1].activityid)
            if (pos !== -1) {
              sortedList[pos].order = updatedActivity.reorder
            }
          }
        })
        //console.log('final activities', activities)
        state.activities = activities
      }

      // Sorted list
      if (toSort === true) {
        //console.log('SORT', sortedList)
        sortedList.sort((a, b) => {
          let c = { ...a }
          let d = { ...b }
          return d.order - c.order
        })
        //console.log('sortedList', sortedList)
        state.sortedList = sortedList
      }
    },
    change: (state, action) => {
      //console.log('activitySlice.change', action.payload)
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

function updateActivity(a, update) {
  let reorder = -1
  let activity = { ...a }
  if (activity.availabilities === undefined) {
    activity.availabilities = {}
  }
  if (update.name !== undefined) {
    activity.name = update.name
    activity.availabilities.name = 'available'
  }
  if (update.order !== undefined) {
    activity.order = update.order
    activity.availabilities.order = 'available'
    reorder = update.order
  }
  if (update.description !== undefined) {
    activity.description = update.description
    activity.availabilities.description = 'available'
  } else {
    console.log('no description in', update)
  }
  if (update.tothinks !== undefined) {
    activity.tothinks = update.tothinks
    activity.availabilities.tothinks = 'available'
  }
  //console.log("updateActivity", a, update, activity)
  return {
    activity: activity,
    reorder: reorder,
  }
}

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
