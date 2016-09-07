import * as React from 'react';
import { MemberEntity } from '../../api/memberEntity';
import { MembersList } from './membersList';


// Presentational

// extends React.Props<MembersPage>
interface Props {
  members : any;  //: Array<MemberEntity>;
  loadMembers : any; // : () => void;
}

export class MembersPage extends React.Component<Props, {}> {

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
