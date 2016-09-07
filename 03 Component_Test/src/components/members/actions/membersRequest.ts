import {memberApi} from '../../../api/memberApi';
import {membersRequestCompleted} from './membersRequestCompleted';

export function memberRequest() {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatcher) {
    const promise = memberApi.getAllMembersAsync();
    
    memberApi.getAllMembersAsync().then(
      data => dispatcher(membersRequestCompleted(data))
    );

    return  promise;
  };
}
