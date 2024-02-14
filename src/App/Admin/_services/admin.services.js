// Inputs
import {
    adminGetDatabaseLoadInputs
} from './admin.service.inputs.js'
// Services
import serviceProceed from '../../_services/_services/serviceProceed.js'


export async function serviceAdminGetDatabaseLoad() {
  if (process.env.REACT_APP_DEBUG === "TRUE") {
    console.log("serviceAdminGetDatabaseLoad");
  }
  await serviceProceed(adminGetDatabaseLoadInputs);
}