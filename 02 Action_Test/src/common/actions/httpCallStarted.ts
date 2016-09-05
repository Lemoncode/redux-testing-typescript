import {actionsEnums} from "./actionsEnum";

const httpCallStarted = () => {
   return {
     type: actionsEnums.common.HTTP_GET_CALL_STARTED
   }
}

export default httpCallStarted;
