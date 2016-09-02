import {memberApi} from '../../../api/memberApi';

export const loadMember = (id : number) => {
   return {
     type: 'MEMBER_LOAD'
     ,member: memberApi.getMemberById(id)
   }
}
