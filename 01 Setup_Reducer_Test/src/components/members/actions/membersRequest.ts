import {memberApi} from '../../../api/memberApi';
import {membersRequestCompleted} from './membersRequestCompleted';

export function memberRequest() {

  // Invert control!
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatcher) {
    return memberApi.getAllMembersAsync().then(
      data => dispatcher(membersRequestCompleted(data))
    );
  };
}
