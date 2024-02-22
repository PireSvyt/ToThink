// APIs
import {
  apiToThinkCreate,
  apiToThinkUpdate,
  apiToThinkDelete,
  apiToThinkGetOne,
  apiToThinkGetMany,
} from './tothink.api.js'

// Services
import { random_id, random_string } from '../toolkit.js'
import appStore from '../../store.js'
import { serviceActivityGetMany } from '../activity/activity.services.js'

export const tothinkCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tothinkModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tothinkModalSlice/unlock',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'tothinkCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    return { inputs: appStore.getState().tothinkModalSlice.inputs }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      subchecks: [
        {
          // Check name is available
          field: 'name',
          error: 'generic.error.missingname',
          fieldsinerror: ['name'],
        },
        /*{
          // Check description is available
          field: 'description',
          error: 'generic.error.missingdescription',
          fieldsinerror: ['description'],
        },*/
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'tothinkModalSlice/change'
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'tothinkCreateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiToThinkCreate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'tothinkCreateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'tothink.create.success': () => {
        // add tothink to store
        appStore.dispatch({
          type: 'tothinkSlice/change',
          payload: {
            tothink: response.data.tothink,
          },
        })
        appStore.dispatch({
          type: 'tothinkModalSlice/close',
        })
        if (response.data.dependencies !== undefined) {
          if (response.data.dependencies.activityids !== undefined) {
            serviceActivityGetMany({
              activityids: response.data.dependencies.activityids,
            })
          }
        }
      },
      'tothink.create.error.oncreate': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("tothinkCreateInputs response", response)
    return responses[response.type]()
  },
}

export const tothinkUpdateInputs = {
  /*lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkUpdateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tothinkModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkUpdateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tothinkModalSlice/unlock',
    })
  },*/
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'tothinkUpdateInputs.getinputsfunction',
      tags: ['function'],
    })
    return { inputs: directInputs }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      subchecks: [
        {
          // Check name is available
          field: 'tothinkid',
          error: 'generic.error.missingtothinkid',
          fieldsinerror: ['tothinkid'],
        },
        /*{
          // Check description is available
          field: 'description',
          error: 'generic.error.missingdescription',
          fieldsinerror: ['description'],
        },*/
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkUpdateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'tothinkSlice/change'
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'tothinkUpdateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiToThinkUpdate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'tothinkUpdateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'tothink.update.success.modified': () => {
        // add tothink to store
        appStore.dispatch({
          type: 'tothinkSlice/change',
          payload: {
            tothink: response.data.tothink,
          },
        })
        if (response.data.dependencies !== undefined) {
          if (response.data.dependencies.activityids !== undefined) {
            serviceActivityGetMany({
              activityids: response.data.dependencies.activityids,
            })
          }
        }
      },
      'tothink.update.error.onmodify': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("tothinkUpdateInputs response", response)
    return responses[response.type]()
  },
}

export const tothinkDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceToThinkDelete.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: directInputs,
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      subchecks: [
        {
          // Check tothinkid is available
          field: 'tothinkid',
          error: 'tothink.error.missingtothinkid',
        },
      ],
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'serviceToThinkDelete.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiToThinkDelete(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceToThinkDelete.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'tothink.deleteone.success': () => {
        console.log('DELETEONE SUCCESS', response.data)
        appStore.dispatch({
          type: 'tothinkSlice/delete',
          payload: {
            tothinkid: response.data.tothinkid,
          },
        })
        if (response.data.dependencies !== undefined) {
          if (response.data.dependencies.activityids !== undefined) {
            serviceActivityGetMany({
              activityids: response.data.dependencies.activityids,
            })
          }
        }
      },
      'tothink.deleteone.errorondelete': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    console.log('WHAT IS THE response.type : ' + response.type)
    return responses[response.type]()
  },
}

export const tothinkGetOneInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkGetOneInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tothinkSlice/loadAnalysis',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceToThinkGetOne.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: { ...directInputs },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'tothink.error.missinginputs',
      subchecks: [
        {
          // Check patientid is available
          field: 'tothinkid',
          error: 'patient.error.missingtothinkid',
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
      message: 'serviceToThinkGetOne.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiToThinkGetOne(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'serviceToThinkGetOne.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'tothink.getanalysis.success': () => {
        appStore.dispatch({
          type: 'tothinkSlice/setAnalysis',
          payload: response.data.tothink,
        })
      },
      'tothink.getanalysis.error.undefined': () => {
        console.warn(
          'getmanageresponsefunction tothink.getanalysis.error.undefined'
        )
        appStore.dispatch({
          type: 'tothinkSlice/change',
          payload: {
            state: {
              analysis: 'denied',
            },
          },
        })
      },
      'tothink.getanalysis.error.onfind': () => {
        console.warn('getmanageresponsefunction tothink.getanalysis.error.onfind')
        appStore.dispatch({
          type: 'tothinkSlice/setAnalysis',
          payload: {
            type: 'tothinkSlice/change',
            payload: {
              state: {
                analysis: 'denied',
              },
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
    console.log('WHAT IS THE response.type : ' + response.type)
    return responses[response.type]()
  },
}

export const tothinkGetManyInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkGetManyInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tothinksSlice/getmany',
      payload: {
        state: 'wip',
        requirements: ['name', 'description', 'state', 'order'],
      },
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'tothinkGetManyInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {}
    if (directInputs.tothinkids !== undefined) {
      inputs.tothinkids = directInputs.tothinkids
    }
    if (directInputs.requirements !== undefined) {
      inputs.requirements = directInputs.requirements
    }
    return {
      inputs: inputs,
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
    },
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'tothinkGetManyInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiToThinkGetMany(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'tothinkGetManyInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'tothink.getmany.success': () => {
        appStore.dispatch({
          type: 'tothinkSlice/update',
          payload: {
            tothinks: response.data.tothinks,
          },
        })
      },
      'tothink.getmany.error.notfound': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'tothink.getmany.error.onfind': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("WHAT IS THE response.type : " + response.type)
    return responses[response.type]()
  },
}

export const tothinkDigInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'tothinkDigInputs.getinputsfunction',
      tags: ['function'],
    })
    //console.log('directInputs', directInputs)
    let tothinksToUpdate = []
    if (Object.keys(appStore.getState().tothinkSlice.tothinks).length !== 0) {
      // Gather tothinks
      let tothinks = {}
      if (directInputs.tothinkids !== undefined) {
        directInputs.tothinkids.forEach((tothinkid) => {
          tothinks[tothinkid] = appStore.getState().tothinkSlice.tothinks[tothinkid]
        })
      } else {
        tothinks = { ...appStore.getState().tothinkSlice.tothinks }
      }
      // Check tothinks meet requirements
      Object.keys(tothinks).forEach((tothinkid) => {
        let tothinkMeetsRequirements = true
        directInputs.requirements.forEach((requirement) => {
          if (Object.keys(tothinks[tothinkid]).includes(requirement) === false) {
            tothinkMeetsRequirements = false
          }
        })
        if (tothinkMeetsRequirements === false) {
          tothinksToUpdate.push(tothinkid)
        }
      })
    } else {
      console.log('DIG WITHOUT LIST')
    }

    return {
      inputs: {
        tothinkids: tothinksToUpdate,
        requirements: directInputs.requirements,
      },
    }
  },
  sercivechecks: [
    {
      // Check inputs root is available
      field: 'inputs',
      error: 'generic.error.missinginputs',
      subchecks: [],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'tothinkDigInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'tothinkSlice/change'
  },
  apicall: async (inputs, log) => {
    //console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'tothinkDigInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiToThinkGetMany(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'tothinkDigInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'tothink.getmany.success': () => {
        appStore.dispatch({
          type: 'tothinkSlice/update',
          payload: {
            tothinks: response.data.tothinks,
          },
        })
      },
      'tothink.getmany.error.notfound': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'tothink.getmany.error.onfind': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("tothinkDigInputs response", response)
    return responses[response.type]()
  },
}
