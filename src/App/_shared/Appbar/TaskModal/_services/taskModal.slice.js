import { createSlice } from '@reduxjs/toolkit'

const taskModalSlice = createSlice({
  name: 'taskModalSlice',
  initialState: {
    disabled: false,
    loading: false,
    open: false,
    inputs: {
      name: '',
      activityid: '',
    },
    errors: {
      name: false,
      activityid: false,
    },
  },
  reducers: {
    lock: (state) => {
      // Locking the modal
      state.disabled = true
      state.loading = true
    },
    unlock: (state) => {
      // Unlocking the modal
      state.disabled = false
      state.loading = false
    },
    new: (state, action) => {
      state.open = true
      state.inputs.name = ''
      state.inputs.activityid = '1'
      state.errors.name = false
      state.errors.activityid = false
      state.disabled = false
      state.loading = false
      if (action.payload !== undefined) {
        if (action.payload.inputs !== undefined) {
          if (action.payload.inputs.name !== undefined) {
            state.inputs.name = action.payload.inputs.name
          }
          if (action.payload.inputs.activityid !== undefined) {
            state.inputs.activityid = action.payload.inputs.activityid
          }
        }
        if (action.payload.errors !== undefined) {
          if (action.payload.errors.name !== undefined) {
            state.errors.name = action.payload.errors.name
          }
          if (action.payload.errors.activityid !== undefined) {
            state.errors.activityid = action.payload.errors.activityid
          }
        }
      }
    },
    close: (state) => {
      state.open = false
      state.inputs.name = ''
      state.inputs.activityid = ''
      state.errors.name = false
      state.errors.activityid = false
      state.disabled = false
      state.loading = false
    },
    change: (state, action) => {
      //console.log("taskModalSlice/change", action.payload)
      if (action.payload.open !== undefined) {
        state.open = action.payload.open
      }
      // Inputs
      if (action.payload.inputs !== undefined) {
        if (action.payload.inputs.name !== undefined) {
          state.inputs.name = action.payload.inputs.name
        }
        if (action.payload.inputs.activityid !== undefined) {
          state.inputs.activityid = action.payload.inputs.activityid
        }
      }
      // Errors
      if (action.payload.errors !== undefined) {
        if (action.payload.errors.name !== undefined) {
          state.errors.name = action.payload.errors.name
        }
        if (action.payload.errors.activityid !== undefined) {
          state.errors.activityid = action.payload.errors.activityid
        }
      }
      // Lock
      if (action.payload.disabled !== undefined) {
        state.disabled = action.payload.disabled
      }
      if (action.payload.loading !== undefined) {
        state.loading = action.payload.loading
      }
    },
  },
})

export default taskModalSlice.reducer
