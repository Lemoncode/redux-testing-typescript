import * as React from 'react';
import { connect } from 'react-redux';
import { MemberEntity } from '../../api/memberEntity';
import { MembersList } from './memberList';
import { memberRequest } from './actions/membersRequest';

// Presentational

// extends React.Props<MembersPage>
interface Props {
  members : any;  //: Array<MemberEntity>;
  loadMembers : any; // : () => void;
}

class MembersPage extends React.Component<Props, {}> {

   // Standard react lifecycle function:
   // https://facebook.github.io/react/docs/component-specs.html
   public componentDidMount() {
     this.props.loadMembers();
   }

   public render() {
     if(!this.props.members)
        return (<div>No data</div>)


       return (
        <div className="row">
          <MembersList members={this.props.members}/>
        </div>
       );
  }
}

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


const ContainerMembersPage = connect(
                                   mapStateToProps
                                  ,mapDispatchToProps
                                )(MembersPage)


export default ContainerMembersPage;
