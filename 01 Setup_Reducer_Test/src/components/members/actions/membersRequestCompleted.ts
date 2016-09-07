import {actionsEnums} from "../../../common/actions/actionsEnum";

export const membersRequestCompleted = (members : any) => {
   return {
     type: actionsEnums.membersPage.MEMBERS_REQUEST_COMPLETED,
     members: members
   }
 }
