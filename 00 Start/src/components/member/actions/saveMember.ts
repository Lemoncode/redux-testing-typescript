import {MemberEntity} from "../../../api/MemberEntity";
import {memberApi} from '../../../api/memberApi';
import {MemberFormErrors} from '../../../validations/memberFormErrors';
import {memberFormValidator} from '../../../validations/memberFormValidator';

const saveMember = (member : MemberEntity) => {
  // Candidate to be splitted
  let errorsSave : MemberFormErrors = memberFormValidator.validateMember(member);

  if(errorsSave.isEntityValid) {
    memberApi.saveAuthor(member);
  }

   return {
     type: 'MEMBER_SAVE'
     ,errors : errorsSave
   }
}

export default saveMember;
