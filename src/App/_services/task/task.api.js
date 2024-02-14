require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiTaskCreate(taskCreateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'task/v1/create',
      data: taskCreateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiTaskUpdate(taskUpdateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'task/v1/update',
      data: taskUpdateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiTaskDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'task/v1/delete',
      data: deleteInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiTaskGetOne(getInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'task/v1/getone',
      data: getInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiTaskGetMany(getManyInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'task/v1/getmany',
      data: getManyInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}
