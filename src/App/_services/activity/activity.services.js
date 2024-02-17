// Inputs
import {
  activityCreateInputs,
  activityUpdateInputs,
  activityDeleteInputs,
  activityGetOneInputs,
  activityGetManyInputs,
} from './activity.services.inputs.js'
// Services
import serviceProceed from '../_services/serviceProceed.js'

export async function serviceActivityCreate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceActivityCreate')
  }
  await serviceProceed(activityCreateInputs, directInputs)
}

export async function serviceActivityUpdate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceActivityUpdate')
  }
  await serviceProceed(activityUpdateInputs, directInputs)
}

export async function serviceActivityDelete(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceActivityDelete')
  }
  /*let inputs = {
    activityid: directInputs.activityid,
    patientid: directInputs.patientid,
  }*/
  await serviceProceed(activityDeleteInputs, directInputs)
}

export async function serviceActivityGetOne(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceActivityGetOne')
  }
  await serviceProceed(activityGetOneInputs, directInputs)
}

export async function serviceActivityGetMany(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceActivityGetMany')
  }
  await serviceProceed(activityGetManyInputs, directInputs)
}
