import { connect } from 'react-redux';
import {MembersPage} from "./membersPage"
import { memberRequest } from './actions/membersRequest';

// Container

const mapStateToProps = (state) => {
    return {
      members: state.members
    }
}


const mapDispatchToProps = (dispatch) => {
  return {
    loadMembers: () => {return dispatch(memberRequest())},
  }
}


export const MembersPageContainer = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(MembersPage)
