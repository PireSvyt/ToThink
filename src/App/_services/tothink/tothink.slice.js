import { createSlice } from '@reduxjs/toolkit'
import appStore from '../../store.js'

const tothinkSlice = createSlice({
  name: 'tothinkSlice',
  initialState: {
    state: {
      update: undefined,
      getmany: undefined,
      getone: undefined,
      delete: undefined,
    },
    tothinks: {},
  },
  reducers: {
    update: (state, action) => {
      //console.log('tothinkSlice.update', action.payload)
      let tothinks = { ...state.tothinks }

      // tothink
      if (action.payload.tothink !== undefined) {
        let updatedToThink = updateToThink(
          { ...state.tothinks[action.payload.tothink.tothinkid] },
          { ...action.payload.tothink }
        )
        //console.log('updatedToThink', updatedToThink)
        tothinks[updatedToThink.tothink.tothinkid] = updatedToThink.tothink
      }

      // tothinks
      if (action.payload.tothinks !== undefined) {
        Object.entries(action.payload.tothinks).forEach((tothink) => {
          let updatedToThink = updateToThink(
            { ...state.tothinks[tothink[1].tothinkid] },
            { ...tothink[1] }
          )
          //console.log('updatedToThink', updatedToThink)
          tothinks[updatedToThink.tothink.tothinkid] = updatedToThink.tothink
        })
      }

      // activity
      if (action.payload.activity !== undefined) {
        if (action.payload.activity.tothinks !== undefined) {
          action.payload.activity.tothinks.forEach((tothink) => {
            console.log('forEach tothink', tothink)
            let updatedToThink = updateToThink(
              { ...state.tothinks[tothink.tothinkid] },
              { ...tothink }
            )
            //console.log('updatedToThink', updatedToThink)
            tothinks[updatedToThink.tothink.tothinkid] = updatedToThink.tothink
          })
        }
      }

      // activities
      if (action.payload.activities !== undefined) {
        //console.log("activities")
        Object.entries(action.payload.activities).forEach((activity) => {
          //console.log("forach activity[1]", activity[1])
          if (activity[1].tothinks !== undefined) {
            activity[1].tothinks.forEach((tothink) => {
              //console.log("forach tothink", tothink)
              let updatedToThink = updateToThink(
                { ...state.tothinks[tothink.tothinkid] },
                { ...tothink }
              )
              if (state.tothinks[tothink.tothinkid] === undefined) {
                updatedToThink = { tothink: { ...tothink } }
                updatedToThink.tothink.availabilities = getAvailabilities({ ...tothink })
              }
              //console.log('updatedToThink', updatedToThink.tothink)
              tothinks[updatedToThink.tothink.tothinkid] = { ...updatedToThink.tothink }
            })
          }
        })
      }

      //console.log("tothinks", tothinks)
      state.tothinks = tothinks
    },

    store: (state, action) => {
      console.log('tothinkSlice.store', action.payload)
      // tothink
      if (action.payload.tothink !== undefined) {
        state.tothinks[action.payload.tothink.tothinkid] = action.payload.tothink
        state.getone = 'available'
      }
      // tothinks
      if (action.payload.tothinks !== undefined) {
        action.payload.tothinks.forEach((tothink) => {
          state.tothinks[tothink.tothinkid] = tothink
        })
        state.getmany = 'available'
      }
      // activity
      if (action.payload.activity !== undefined) {
        if (action.payload.activity.tothinks !== undefined) {
          action.payload.activity.tothinks.forEach((tothink) => {
            state.tothinks[tothink.tothinkid] = { ...tothink }
          })
        }
      }
      // activities
      if (action.payload.activities !== undefined) {
        action.payload.activities.forEach((activity) => {
          if (activity.tothinks !== undefined) {
            activity.tothinks.forEach((tothink) => {
              state.tothinks[tothink.tothinkid] = { ...tothink }
            })
          }
        })
      }
    },
    change: (state, action) => {
      //console.log('tothinkSlice.change', action.payload)
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
      //console.log("sliceToThink.delete",action.payload)
      let tothinks = { ...state.tothinks }
      //console.log("* before deletion", tothinks)
      if (action.payload.tothinkid !== undefined) {
        delete tothinks[action.payload.tothinkid]
      }
      if (action.payload.tothinkids !== undefined) {
        action.payload.tothinkids.forEach((tothinkid) => {
          delete tothinks[tothinkid]
        })
      }
      //console.log("* after deletion", tothinks)
      state.tothinks = tothinks
    },
  },
})

export default tothinkSlice.reducer

function updateToThink(a, update) {
  let reorder = -1
  let tothink = { ...a }
  if (tothink.availabilities === undefined) {
    tothink.availabilities = {}
  }
  if (update.name !== undefined) {
    tothink.name = update.name
    tothink.availabilities.name = 'available'
  }
  if (update.order !== undefined) {
    tothink.order = update.order
    tothink.availabilities.order = 'available'
    reorder = update.order
  }
  if (update.description !== undefined) {
    tothink.description = update.description
    tothink.availabilities.description = 'available'
  }
  if (update.state !== undefined) {
    tothink.state = update.state
    tothink.availabilities.state = 'available'
  }
  return {
    tothink: tothink,
    reorder: reorder,
  }
}

function getAvailabilities(tothink, previousAvailabilities = {}) {
  let availabilities = {}
  // ToThink
  Object.keys(tothink).forEach((k) => {
    availabilities[k] = 'available'
  })
  // Previous tothink
  Object.keys(previousAvailabilities).forEach((k) => {
    if (availabilities[k] === undefined) {
      availabilities[k] = 'available'
    }
  })
  return availabilities
}
