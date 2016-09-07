import * as React from 'react';
import {Link} from 'react-router';
import {MemberEntity} from '../../api/memberEntity';
import {MemberRow} from './memberRow';

interface Props {
    members: Array<MemberEntity>;
}

// Stateless component
export const MembersList = (props: Props) => {
  return (
      <div>
          <h2> Members Page</h2>
          <Link to="/member">New Member</Link>
          <table className="table">
              <thead>
              <tr>
                  <th>
                      Avatar
                  </th>
                  <th>
                      Id
                  </th>
                  <th>
                      Name
                  </th>
              </tr>
              </thead>
              <tbody>
                  {
                      props.members.map((member : MemberEntity) =>
                          <MemberRow key={member.id} member = {member}/>
                          )
                  }
              </tbody>
          </table>
      </div>
  );
};

/*
export default class MembersList extends React.Component<Props, {}>{
    constructor(props: Props){
        super(props);
    }

    render() {
        return (
            <div>
                <h2> Members Page</h2>
                <Link to="/member">New Member</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            Avatar
                        </th>
                        <th>
                            Id
                        </th>
                        <th>
                            Name
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.members.map((member : MemberEntity) =>
                                <MemberRow key={member.id} member = {member}/>
                                )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}*/
