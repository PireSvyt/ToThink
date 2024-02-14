// Inputs
import { userGetDetailsInputs } from './user.services.inputs.js'
// Services
import serviceProceed from '../_services/serviceProceed.js'

export async function serviceUserGetDetails() {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceUserGetDetails')
  }
  await serviceProceed(userGetDetailsInputs)
}
