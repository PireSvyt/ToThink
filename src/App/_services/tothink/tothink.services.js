// Inputs
import {
  tothinkCreateInputs,
  tothinkUpdateInputs,
  tothinkDeleteInputs,
  tothinkGetOneInputs,
  tothinkGetManyInputs,
  tothinkDigInputs,
} from './tothink.services.inputs.js'
// Services
import serviceProceed from '../_services/serviceProceed.js'

export async function serviceToThinkCreate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceToThinkCreate')
  }
  await serviceProceed(tothinkCreateInputs, directInputs)
}

export async function serviceToThinkUpdate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceToThinkUpdate')
  }
  await serviceProceed(tothinkUpdateInputs, directInputs)
}

export async function serviceToThinkDelete(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceToThinkDelete')
  }
  await serviceProceed(tothinkDeleteInputs, directInputs)
}

export async function serviceToThinkGetOne(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceToThinkGetOne')
  }
  await serviceProceed(tothinkGetOneInputs, directInputs)
}

export async function serviceToThinkGetMany(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceToThinkGetMany')
  }
  await serviceProceed(tothinkGetManyInputs, directInputs)
}

export async function serviceToThinkDig(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceToThinkDig')
  }
  await serviceProceed(tothinkDigInputs, directInputs)
}
