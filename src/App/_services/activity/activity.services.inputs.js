// APIs
import { 
  apiActivityCreate, 
  apiActivityUpdate, 
  apiActivityDelete, 
  apiActivityGetOne, 
  apiActivityGetMany,
  apiActivityGetMine
} from './activity.api.js'

// Services
import { random_id } from '../toolkit.js'
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
    let inputs = {...appStore.getState().activityModalSlice.inputs}
    let max = 0
    Object.entries(appStore.getState().activitySlice.activities).forEach(
      activity => {
        if (activity[1].order > max) {
          max = activity[1].order
        }
      }
    )
    console.log("appStore.getState().activitySlice.activities", appStore.getState().activitySlice.activities)
    inputs.order = 1 + max 
    return { inputs: inputs }
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
          type: 'activitySlice/create',
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
          type: 'activitySlice/update',
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
          // Check activityid is available
          field: 'activityid',
          error: 'activity.error.missingactivityid',
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
      'activity.deleteone.success': () => {
        appStore.dispatch({
          type: 'activitySlice/delete',
          payload: {
            activityid: response.data.activityid
          },
        })
        if (response.data.taskids !== undefined) {
          appStore.dispatch({
            type: 'taskSlice/delete',
            payload: {
              taskids: response.data.taskids
            },
          })
        }
      },
      'activity.deleteone.errorondelete': () => {
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
          type: 'activitySlice/store',
          payload: {
            activity: response.data.activity,
          }
        })
        appStore.dispatch({
          type: 'taskSlice/change',
          payload: {
            activity: response.data.activity,
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
    console.log("WHAT IS THE response.type : " + response.type)
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
      type: 'activitySlice/getmany',
      payload: {
        state: 'wip',
        requirements: [
          "name", "description", "tasks", "order"
        ]
      }
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityGetManyInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {}
    if (directInputs.activityids !== undefined) {
      inputs.activityids = directInputs.activityids
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
      error: 'activity.error.missinginputs',
    },
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
          type: 'activitySlice/getmany',
          payload: {
            activities: response.data.activities,
          }
        })
        appStore.dispatch({
          type: 'taskSlice/update',
          payload: {
            activities: response.data.activities,
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
    //console.log("WHAT IS THE response.type : " + response.type)
    return responses[response.type]()
  },
}

export const activityGetMineInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityGetMineInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'activitySlice/change',
      payload: {
        state: {
          getmine: 'wip'
        }
      }
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityGetMineInputs.getinputsfunction',
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
      message: 'activityGetMineInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiActivityGetMine(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'activityGetMineInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activities.getmine.success': () => {
        appStore.dispatch({
          type: 'activitySlice/mine',
          payload: {
            activities: response.data.activities,
          }
        })
        appStore.dispatch({
          type: 'activitySlice/store',
          payload: {
            activities: response.data.activities,
          }
        })
      },
      'activities.getmine.error.undefined': () => {
        console.warn("getmanageresponsefunction activity.getone.error.undefined")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              getmine: 'available'
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
      'activity.getmine.error.onfind': () => {
        console.warn("getmanageresponsefunction activity.getmine.error.onfind")
        appStore.dispatch({
          type: 'activitySlice/change',
          payload: {
            state: {
              getmine: 'available'
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

export const activityOrderInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'activityOrderInputs.getinputsfunction',
      tags: ['function'],
    })
    console.log("directInputs",directInputs)
    let sortedList = [...appStore.getState().activitySlice.sortedList]
    //console.log("sortedList",sortedList)
    let activityids = sortedList.map(activity => {
      //console.log("map.activity", activity)
      return activity.activityid
    })
    //console.log("activityids",activityids)
    let pos = activityids.indexOf(directInputs.wrt)
    //console.log("pos",pos)

    let newOrder = -1
    switch(directInputs.where) {
      case 'toparea':
        newOrder = sortedList[pos-1].order
        break
      case 'bottomarea':
        newOrder = sortedList[pos+1].order
        break
    }
    if (newOrder !== -1) {
      console.log("newOrder",newOrder)
      newOrder = (newOrder + sortedList[pos].order)/2
      console.log("newOrder",newOrder)
    }
    //console.log("newOrder",newOrder)

    if (newOrder !== sortedList[pos].order) {
      return { 
        inputs: {
          activityid: directInputs.activityid,
          order: newOrder
        }
      }
    } else {
      return {}
    }
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
        {
          // Check order is available
          field: 'order',
          error: 'generic.error.missingorder',
          fieldsinerror: ['order'],
        },
      ],
    },
  ],
  getcheckoutcomedispatchfunction: (log) => {
    log.push({
      date: new Date(),
      message: 'activityOrderInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'activitySlice/change'
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'activityOrderInputs.apicall',
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
      message: 'activityOrderInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'activity.update.success.modified': () => {
        // add activity to store
        appStore.dispatch({
          type: 'activitySlice/update',
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
    //console.log("activityOrderInputs response", response)
    return responses[response.type]()
  },
}