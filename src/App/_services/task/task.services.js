// Inputs
import {
  taskCreateInputs,
  taskUpdateInputs,
  taskDeleteInputs,
  taskGetOneInputs,
  taskGetManyInputs,
  taskDigInputs,
} from './task.services.inputs.js'
// Services
import serviceProceed from '../_services/serviceProceed.js'

export async function serviceTaskCreate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceTaskCreate')
  }
  await serviceProceed(taskCreateInputs, directInputs)
}

export async function serviceTaskUpdate(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceTaskUpdate')
  }
  await serviceProceed(taskUpdateInputs, directInputs)
}

export async function serviceTaskDelete(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceTaskDelete')
  }
  await serviceProceed(taskDeleteInputs, directInputs)
}

export async function serviceTaskGetOne(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceTaskGetOne')
  }
  await serviceProceed(taskGetOneInputs, directInputs)
}

export async function serviceTaskGetMany(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceTaskGetMany')
  }
  await serviceProceed(taskGetManyInputs, directInputs)
}

export async function serviceTaskDig(directInputs) {
  if (process.env.REACT_APP_DEBUG === 'TRUE') {
    console.log('serviceTaskDig')
  }
  await serviceProceed(taskDigInputs, directInputs)
}
