require('dotenv')
import axios from 'axios'

let apiURL = process.env.REACT_APP_SERVER_URL

export async function apiActivityCreate(activityCreateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'activity/v1/create',
      data: activityCreateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiActivityUpdate(activityUpdateInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'activity/v1/update',
      data: activityUpdateInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export async function apiActivityDelete(deleteInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'activity/v1/delete',
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

export async function apiActivityGetOne(getInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'activity/v1/getone',
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

export async function apiActivityGetMany(getManyInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'activity/v1/getmany',
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

export async function apiActivityGetMine(getMineInputs, token) {
  try {
    const res = await axios({
      method: 'post',
      url: apiURL + 'activity/v1/getmine',
      data: getMineInputs,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return res.data
  } catch (err) {
    return err.response.data
  }
}
