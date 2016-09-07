import {actionsEnums} from "../../../common/actions/actionsEnum";

const uiInputMember = (fieldName : string, value: any) => {
   return {
     type: actionsEnums.memberPage.MEMBER_UI_INPUT
     ,fieldName : fieldName
     ,value: value
   }
}

export default uiInputMember;
