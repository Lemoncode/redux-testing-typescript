import {actionsEnums} from "./actionsEnum";

const httpCallCompleted = () => {
   return {
     type: actionsEnums.HTTP_GET_CALL_COMPLETED
   }
}

export default httpCallCompleted;
