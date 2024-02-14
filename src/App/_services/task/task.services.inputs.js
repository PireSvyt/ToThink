// APIs
import { 
  apiTaskCreate, 
  apiTaskUpdate, 
  apiTaskDelete, 
  apiTaskGetOne, 
  apiTaskGetMany 
} from './task.api.js'

// Services
import { random_id, random_string } from '../toolkit.js'
import appStore from '../../store.js'

export const taskCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskSlice/storingResults',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskSlice/storedResults',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.getinputsfunction',
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
      message: 'taskCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'taskSlice/change'
  },
  repackagingfunction: (serviceInputs, log) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.repackagingfunction',
      tags: ['function'],
    })

    let repackagedInputs = {}
    repackagedInputs.inputs = {}
    repackagedInputs.inputs.taskid = random_string()
    repackagedInputs.inputs.patientid = appStore.getState().taskSlice.patientid
    repackagedInputs.inputs.type = serviceInputs.inputs.type
    repackagedInputs.inputs.results = serviceInputs.inputs.results
    console.log('repackagedInputs', repackagedInputs)
    return repackagedInputs
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiTaskCreate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'task.create.success': () => {
        appStore.dispatch({
          type: 'taskSlice/storedResults',
          payload: {
            taskid: response.data.taskid
          }
        })
      },
      'task.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'taskSlice/change',
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
    //console.log("taskCreateInputs response", response)
    return responses[response.type]()
  },
}

export const taskUpdateInputs = {
}

export const taskDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceTaskDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {
        taskid: directInputs.taskid,
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
          // Check taskid is available
          field: 'taskid',
          error: 'task.error.missingtaskid',
        },
        {
          // Check patientid is available
          field: 'patientid',
          error: 'task.error.missingpatientid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceTaskDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiTaskDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceTaskDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'task.deletemine.success': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'task.snack.deleted',
          },
        })
      },
      'task.deletemine.errorondelete': () => {
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

export const taskGetOneInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskGetOneInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskSlice/loadAnalysis',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceTaskGetOne.getinputsfunction',
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
      error: 'task.error.missinginputs',
      subchecks: [
        {
          // Check patientid is available
          field: 'taskid',
          error: 'patient.error.missingtaskid',
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
      message: 'serviceTaskGetOne.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiTaskGetOne(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceTaskGetOne.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'task.getanalysis.success': () => {
        appStore.dispatch({
          type: 'taskSlice/setAnalysis',
          payload: response.data.task,
        })
      },
      'task.getanalysis.error.undefined': () => {
        console.warn("getmanageresponsefunction task.getanalysis.error.undefined")
        appStore.dispatch({
          type: 'taskSlice/change',
          payload: {
            state: {
              analysis: 'denied'
            }
          },
        })
      },
      'task.getanalysis.error.onfind': () => {
        console.warn("getmanageresponsefunction task.getanalysis.error.onfind")
        appStore.dispatch({
          type: 'taskSlice/setAnalysis',
          payload: {
            type: 'taskSlice/change',
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

export const taskGetManyInputs = {
}

