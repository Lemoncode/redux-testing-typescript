import {actionsEnums} from "../common/actions/actionsEnum";
import {MemberEntity} from "../api/memberEntity";

// Just to show how combine reducers work, we have
// divided into two reducers member load + member load/update/delete
export default (state : Array<MemberEntity> = [], action) => {
  switch (action.type) {
    case actionsEnums.membersPage.MEMBERS_REQUEST_COMPLETED:

      return [...action.members];

    default:
      return state;
  }
};
