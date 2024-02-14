// APIs
import { 
  apiActivityCreate, 
  apiActivityUpdate, 
  apiActivityDelete, 
  apiActivityGetOne, 
  apiActivityGetMany 
} from './activity.api.js'

// Services
import { random_id, random_string } from '../toolkit.js'
import appStore from '../../store.js'

export const activityCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activitySlice/storingResults',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activitySlice/storedResults',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    return {...directInputs}
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      subchecks: [
        {
          // Check type is available
          field: 'type',
          error: 'generic.error.missingtype',
          fieldsinerror: ['type'],
          subchecks: [
            {
              // Check type is valid
              error: 'generic.error.invalidtype',
              fieldsinerror: ['type'],
              checkfunction: (serviceInputs) => {
                console.log(
                  'sercivechecks.checkfunction serviceInputs',
                  serviceInputs
                )
                if (serviceInputs.inputs.type === '') {
                  return {
                    errors: ['generic.error.invalidtype'],
                    stateChanges: {
                      errors: {
                        type: true,
                      },
                    },
                    proceed: false,
                  }
                } else {
                  return { proceed: true }
                }
              },
            },
          ],
        },
        {
          // Check results is available
          field: 'results',
          error: 'generic.error.missingresults',
          fieldsinerror: ['results'],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'activitySlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.activityid = random_string()
    repackagedInputs.inputs.patientid = appStore.getState().activitySlice.patientid
    repackagedInputs.inputs.type = serviceInputs.inputs.type
    repackagedInputs.inputs.results = serviceInputs.inputs.results
    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiActivityCreate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activity.create.success': () => {
        appStore.dispatch({
          type: 'activitySlice/storedResults',
          payload: {
            activityid: response.data.activityid
          }
        })
      },
      'activity.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              storage: 'error'
            }
          }
        })
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("activityCreateInputs response", response)
    return responses[response.type]()
  },
}

export const activityUpdateInputs = {
}

export const activityDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceActivityDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        activityid: directInputs.activityid,
        patientid: appStore.getState().patientSlice.patientid,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'game.error.missinginputs',
      subchecks: [
        {
          // Check activityid is available
          field: 'activityid',
          error: 'activity.error.missingactivityid',
        },
        {
          // Check patientid is available
          field: 'patientid',
          error: 'activity.error.missingpatientid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceActivityDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiActivityDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceActivityDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activity.deletemine.success': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'activity.snack.deleted',
          },
        })
      },
      'activity.deletemine.errorondelete': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    return responses[response.type]()
  },
}

export const activityGetOneInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityGetOneInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activitySlice/loadAnalysis',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceActivityGetOne.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {...directInputs},
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'activity.error.missinginputs',
      subchecks: [
        {
          // Check patientid is available
          field: 'activityid',
          error: 'patient.error.missingactivityid',
        },
        {
          // Check patientid is available
          field: 'patientid',
          error: 'patient.error.missingpatientid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceActivityGetOne.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiActivityGetOne(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceActivityGetOne.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activity.getanalysis.success': () => {
        appStore.dispatch({
          type: 'activitySlice/setAnalysis',
          payload: response.data.activity,
        })
      },
      'activity.getanalysis.error.undefined': () => {
        console.warn("getmanageresponsefunction activity.getanalysis.error.undefined")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              analysis: 'denied'
            }
          },
        })
      },
      'activity.getanalysis.error.onfind': () => {
        console.warn("getmanageresponsefunction activity.getanalysis.error.onfind")
        appStore.dispatch({
          type: 'activitySlice/setAnalysis',
          payload: {
            type: 'activitySlice/change',
            payload: {
              state: {
                analysis: 'denied'
              }
            },
          },
        })
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    console.log("WHAT IS THE response.type : " + response.type)
    return responses[response.type]()
  },
}

export const activityGetManyInputs = {
}

