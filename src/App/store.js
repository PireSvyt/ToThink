import { configureStore } from '@reduxjs/toolkit'
// Domains
import authSlice from './_services/auth/auth.slice.js'
import userSlice from './_services/user/user.slice.js'
import activitySlice from './_services/activity/activity.slice.js'
import taskSlice from './_services/task/task.slice.js'
// Modals
import signinModalSlice from './_shared/Appbar/SignInModal/_services/signinModal.slice.js'
import activityModalSlice from './_shared/Appbar/ActivityModal/_services/activityModal.slice.js'
import taskModalSlice from './_shared/Appbar/TaskModal/_services/taskModal.slice.js'
import passwordResetSlice from './PasswordReset/_services/passwordReset.slice.js'
// Admin
import adminSlice from './Admin/_services/admin.slice.js'

// Slices
const slices = {
  // Authentication
  authSlice: authSlice,
  // Collections
  userSlice: userSlice,
  activitySlice: activitySlice,
  taskSlice: taskSlice,
  // Modals & pages
  signinModalSlice: signinModalSlice,
  activityModalSlice: activityModalSlice,
  taskModalSlice: taskModalSlice,
  passwordResetSlice: passwordResetSlice,
  // Admin
  adminSlice: adminSlice,
}

export default configureStore({
  reducer: slices,
})
