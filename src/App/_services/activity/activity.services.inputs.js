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
      type: 'activityModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activityModalSlice/unlock',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    return { inputs: appStore.getState().activityModalSlice.inputs }
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
      message: 'activityCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'activityModalSlice/change'
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
        // add activity to store
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            activity: response.data.activity
          }
        })
        appStore.dispatch({
          type: 'activityModalSlice/close',
        })
      },
      'activity.create.error.oncreate': () => {
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
  /*lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityUpdateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activityModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityUpdateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activityModalSlice/unlock',
    })
  },*/
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityUpdateInputs.getinputsfunction',
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
          // Check activityid is available
          field: 'activityid',
          error: 'generic.error.missingactivityid',
          fieldsinerror: ['activityid'],
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
      message: 'activityUpdateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'activitySlice/change'
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'activityUpdateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiActivityUpdate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'activityUpdateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activity.update.success.modified': () => {
        // add activity to store
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            activity: response.data.activity
          }
        })
      },
      'activity.update.error.onmodify': () => {
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
      type: 'activitySlice/change',
      payload: {
        state: {
          getone: 'wip'
        }
      }
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
      'activity.getone.success': () => {
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            activity: response.data.activity,
            state: {
              getone: 'available'
            }
          }
        })
      },
      'activity.getone.error.undefined': () => {
        console.warn("getmanageresponsefunction activity.getone.error.undefined")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              getone: 'available'
            }
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
      'activity.getone.error.onfind': () => {
        console.warn("getmanageresponsefunction activity.getone.error.onfind")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              getone: 'available'
            }
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
    //console.log("WHAT IS THE response.type : " + response.type)
    return responses[response.type]()
  },
}

export const activityGetManyInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityGetManyInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activitySlice/change',
      payload: {
        state: {
          getmany: 'wip'
        }
      }
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityGetManyInputs.getinputsfunction',
      tags: ['function'],
    })
    return {
      inputs: {...directInputs},
    }
  },
  sercivechecks: [
    /*{
      // Check inputs root is available
      field: 'inputs',
      error: 'activity.error.missinginputs',
      subchecks: [
        
      ],
    },*/
  ],
  apicall: async (inputs, log) => {
    log.push({
      date: new Date(),
      message: 'activityGetManyInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiActivityGetMany(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'activityGetManyInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activities.getmany.success': () => {
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            activities: response.data.activities,
            state: {
              getmany: 'available'
            }
          }
        })
      },
      'activities.getmany.error.undefined': () => {
        console.warn("getmanageresponsefunction activity.getone.error.undefined")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              getmany: 'available'
            }
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
      'activity.getone.error.onfind': () => {
        console.warn("getmanageresponsefunction activity.getone.error.onfind")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              getmany: 'available'
            }
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

