import {actionsEnums} from "./actionsEnum";

const httpCallStarted = () => {
   return {
     type: actionsEnums.HTTP_GET_CALL_COMPLETED
   }
}

export default httpCallStarted;
