import http from '../../api/http';
import {actionsEnums} from "./actionsEnum";

export const httpInitializeDispatcher = (dispatcher) => {
  http.Initialize(dispatcher);

  return {
    type: actionsEnums.HTTP_INITIALIZE_DISPATCHER
  }
}
