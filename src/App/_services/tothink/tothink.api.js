require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiToThinkCreate(tothinkCreateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'tothink/v1/create',
      data: tothinkCreateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiToThinkUpdate(tothinkUpdateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'tothink/v1/update',
      data: tothinkUpdateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiToThinkDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'tothink/v1/delete',
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

export async function apiToThinkGetOne(getInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'tothink/v1/getone',
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

export async function apiToThinkGetMany(getManyInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'tothink/v1/getmany',
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
