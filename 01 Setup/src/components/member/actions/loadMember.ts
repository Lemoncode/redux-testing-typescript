import {actionsEnums} from "../../../common/actions/actionsEnum";
import {memberApi} from '../../../api/memberApi';

export const loadMember = (id : number) => {
   return {
     type: actionsEnums.memberPage.MEMBER_LOAD
     ,member: memberApi.getMemberById(id)
   }
}
