import {actionsEnums} from "../common/actions/actionsEnum";
import objectAssign = require('object-assign');

// Later on add more flags, like error or something like that?
export class HttpState {
    httpCallsInProgress : boolean;
    numberOfCalls : number;

    constructor() {
      this.httpCallsInProgress = false;
      this.numberOfCalls = 0;
    }
}
// Just to show how combine reducers work, we have
// divided into two reducers member load + member load/update/delete
export const http =  (state : HttpState = {httpCallsInProgress : false, numberOfCalls: 0}, action) => {
  let newState : HttpState = null;
  let numberOfCalls : number = null;
  let callsInProgress : boolean = null;

  switch (action.type) {
    case actionsEnums.common.HTTP_GET_CALL_STARTED:
      numberOfCalls = state.numberOfCalls + 1;
      callsInProgress = true;

      newState = objectAssign({}, state, {httpCallsInProgress: callsInProgress, numberOfCalls: numberOfCalls});
      return newState;

    case actionsEnums.common.HTTP_GET_CALL_COMPLETED:
      numberOfCalls = (state.numberOfCalls > 0) ? state.numberOfCalls - 1 : 0;
      callsInProgress = (numberOfCalls > 0);

      newState = objectAssign({}, state, {httpCallsInProgress: callsInProgress, numberOfCalls: numberOfCalls});
      return newState;

    default:
      return state;
  }
};
