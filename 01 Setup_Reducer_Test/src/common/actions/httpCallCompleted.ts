import {actionsEnums} from "./actionsEnum";

const httpCallCompleted = () => {
   return {
     type: actionsEnums.common.HTTP_GET_CALL_COMPLETED
   }
}

export default httpCallCompleted;
