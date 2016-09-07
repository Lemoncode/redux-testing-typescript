import {actionsEnums} from "../../../common/actions/actionsEnum";

const resetSaveCompleted = () => {
   return {
     type: actionsEnums.memberPage.MEMBER_RESET_SAVE_COMPLETED
   }
}

export default resetSaveCompleted;
