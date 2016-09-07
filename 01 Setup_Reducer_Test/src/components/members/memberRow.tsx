import * as React from 'react';
import {Link} from 'react-router';
import {MemberEntity} from '../../api/memberEntity';


// Stateless component
export const MemberRow = (props: {key: Number, member : MemberEntity}) => {
  return (
    <tr>
      <td>
        <img src={props.member.avatar_url} className="avatar"/>
      </td>
      <td>
       <Link to={`/memberEdit/${props.member.id}`}>{props.member.id}</Link>
      </td>
      <td>
        <span>{props.member.login}</span>
      </td>
    </tr>
  );
};
