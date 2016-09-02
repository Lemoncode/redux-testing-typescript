import {actionsEnums} from "./actionsEnum";

const httpCallStarted = () => {
   return {
     type: actionsEnums.HTTP_GET_CALL_STARTED
   }
}

export default httpCallStarted;
