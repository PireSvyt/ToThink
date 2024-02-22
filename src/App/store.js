import { configureStore } from '@reduxjs/toolkit'
// Domains
import authSlice from './_services/auth/auth.slice.js'
import userSlice from './_services/user/user.slice.js'
import activitySlice from './_services/activity/activity.slice.js'
import tothinkSlice from './_services/tothink/tothink.slice.js'
// Modals
import signinModalSlice from './_shared/Appbar/SignInModal/_services/signinModal.slice.js'
import activityModalSlice from './_shared/Appbar/ActivityModal/_services/activityModal.slice.js'
import tothinkModalSlice from './_shared/Appbar/ToThinkModal/_services/tothinkModal.slice.js'
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
  tothinkSlice: tothinkSlice,
  // Modals & pages
  signinModalSlice: signinModalSlice,
  activityModalSlice: activityModalSlice,
  tothinkModalSlice: tothinkModalSlice,
  passwordResetSlice: passwordResetSlice,
  // Admin
  adminSlice: adminSlice,
}

export default configureStore({
  reducer: slices,
})
