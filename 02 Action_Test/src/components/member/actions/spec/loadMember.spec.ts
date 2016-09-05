import { expect } from 'chai';
import {actionsEnums} from '../../../../common/actions/actionsEnum';
import { loadMember } from '../loadMember';
import { memberApi } from '../../../../api/memberApi';
import { MemberEntity } from '../../../../api/memberEntity';

describe('loadMember', () => {
  it('should return action equals {type: MEMBER_LOAD, member: member } and calls to memberAPI.getMemberById(id) method ' +
      'when passing id equals 1', sinon.test(() => {
      // Arrange
      let sinon: Sinon.SinonStatic = this;
      let member = new MemberEntity();
      member.id = 1;

      let getMemberByIdMethodStub = sinon.stub(memberApi, "getMemberById");
      getMemberByIdMethodStub.returns(member);

      let id = 1;

      // Act
      let result = loadMember(id);

      // Assert
      expect(result.type).to.be.equal(actionsEnums.memberPage.MEMBER_LOAD);
      expect(result.member.id).to.be.equal(id);
      expect(getMemberByIdMethodStub.called).to.be.true;
      expect(getMemberByIdMethodStub.calledWith(id)).to.be.true;
  }).bind(this));
})
