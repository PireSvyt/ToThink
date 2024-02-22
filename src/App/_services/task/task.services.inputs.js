// APIs
import {
  apiTaskCreate,
  apiTaskUpdate,
  apiTaskDelete,
  apiTaskGetOne,
  apiTaskGetMany,
} from './task.api.js'

// Services
import { random_id, random_string } from '../toolkit.js'
import appStore from '../../store.js'
import { serviceActivityGetMany } from '../activity/activity.services.js'

export const taskCreateInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskModalSlice/unlock',
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'taskCreateInputs.getinputsfunction',
      tags: ['function'],
    })
    return { inputs: appStore.getState().taskModalSlice.inputs }
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
      message: 'taskCreateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'taskModalSlice/change'
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
        // add task to store
        appStore.dispatch({
          type: 'taskSlice/change',
          payload: {
            task: response.data.task,
          },
        })
        appStore.dispatch({
          type: 'taskModalSlice/close',
        })
        if (response.data.dependencies !== undefined) {
          if (response.data.dependencies.activityids !== undefined) {
            serviceActivityGetMany({
              activityids: response.data.dependencies.activityids,
            })
          }
        }
      },
      'task.create.error.oncreate': () => {
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
  /*lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskUpdateInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskModalSlice/lock',
    })
  },
  unlockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskUpdateInputs.unlockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'taskModalSlice/unlock',
    })
  },*/
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'taskUpdateInputs.getinputsfunction',
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
          field: 'taskid',
          error: 'generic.error.missingtaskid',
          fieldsinerror: ['taskid'],
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
      message: 'taskUpdateInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'taskSlice/change'
  },
  apicall: async (inputs, log) => {
    console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'taskUpdateInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiTaskUpdate(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'taskUpdateInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'task.update.success.modified': () => {
        // add task to store
        appStore.dispatch({
          type: 'taskSlice/change',
          payload: {
            task: response.data.task,
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
      'task.update.error.onmodify': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("taskUpdateInputs response", response)
    return responses[response.type]()
  },
}

export const taskDeleteInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'serviceTaskDelete.getinputsfunction',
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
          // Check taskid is available
          field: 'taskid',
          error: 'task.error.missingtaskid',
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
      'task.deleteone.success': () => {
        console.log('DELETEONE SUCCESS', response.data)
        appStore.dispatch({
          type: 'taskSlice/delete',
          payload: {
            taskid: response.data.taskid,
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
      'task.deleteone.errorondelete': () => {
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
      inputs: { ...directInputs },
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
        console.warn(
          'getmanageresponsefunction task.getanalysis.error.undefined'
        )
        appStore.dispatch({
          type: 'taskSlice/change',
          payload: {
            state: {
              analysis: 'denied',
            },
          },
        })
      },
      'task.getanalysis.error.onfind': () => {
        console.warn('getmanageresponsefunction task.getanalysis.error.onfind')
        appStore.dispatch({
          type: 'taskSlice/setAnalysis',
          payload: {
            type: 'taskSlice/change',
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

export const taskGetManyInputs = {
  lockuifunction: (log) => {
    log.push({
      date: new Date(),
      message: 'taskGetManyInputs.lockuifunction',
      tags: ['function'],
    })
    appStore.dispatch({
      type: 'tasksSlice/getmany',
      payload: {
        state: 'wip',
        requirements: ['name', 'description', 'state', 'order'],
      },
    })
  },
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'taskGetManyInputs.getinputsfunction',
      tags: ['function'],
    })
    let inputs = {}
    if (directInputs.taskids !== undefined) {
      inputs.taskids = directInputs.taskids
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
      message: 'taskGetManyInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiTaskGetMany(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'taskGetManyInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'task.getmany.success': () => {
        appStore.dispatch({
          type: 'taskSlice/update',
          payload: {
            tasks: response.data.tasks,
          },
        })
      },
      'task.getmany.error.notfound': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'task.getmany.error.onfind': () => {
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

export const taskDigInputs = {
  getinputsfunction: (log, directInputs) => {
    log.push({
      date: new Date(),
      message: 'taskDigInputs.getinputsfunction',
      tags: ['function'],
    })
    //console.log('directInputs', directInputs)
    let tasksToUpdate = []
    if (Object.keys(appStore.getState().taskSlice.tasks).length !== 0) {
      // Gather tasks
      let tasks = {}
      if (directInputs.taskids !== undefined) {
        directInputs.taskids.forEach((taskid) => {
          tasks[taskid] = appStore.getState().taskSlice.tasks[taskid]
        })
      } else {
        tasks = { ...appStore.getState().taskSlice.tasks }
      }
      // Check tasks meet requirements
      Object.keys(tasks).forEach((taskid) => {
        let taskMeetsRequirements = true
        directInputs.requirements.forEach((requirement) => {
          if (Object.keys(tasks[taskid]).includes(requirement) === false) {
            taskMeetsRequirements = false
          }
        })
        if (taskMeetsRequirements === false) {
          tasksToUpdate.push(taskid)
        }
      })
    } else {
      console.log('DIG WITHOUT LIST')
    }

    return {
      inputs: {
        taskids: tasksToUpdate,
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
      message: 'taskDigInputs.getcheckoutcomedispatchfunction',
      tags: ['function'],
    })
    return 'taskSlice/change'
  },
  apicall: async (inputs, log) => {
    //console.log('apicall inputs', inputs)
    log.push({
      date: new Date(),
      message: 'taskDigInputs.apicall',
      inputs: inputs,
      tags: ['function'],
    })
    try {
      return await apiTaskGetMany(inputs, appStore.getState().authSlice.token)
    } catch (err) {
      return err
    }
  },
  getmanageresponsefunction: (response, log) => {
    log.push({
      date: new Date(),
      message: 'taskDigInputs.getmanageresponsefunction',
      response: response,
      tags: ['function'],
    })
    let responses = {
      'task.getmany.success': () => {
        appStore.dispatch({
          type: 'taskSlice/update',
          payload: {
            tasks: response.data.tasks,
          },
        })
      },
      'task.getmany.error.notfound': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
      'task.getmany.error.onfind': () => {
        appStore.dispatch({
          type: 'sliceSnack/change',
          payload: {
            uid: random_id(),
            id: 'generic.snack.error.wip',
          },
        })
      },
    }
    //console.log("taskDigInputs response", response)
    return responses[response.type]()
  },
}
