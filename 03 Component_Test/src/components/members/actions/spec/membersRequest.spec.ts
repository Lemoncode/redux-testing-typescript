
import { expect } from 'chai';
import configureStore from 'redux-mock-store';
import {actionsEnums} from '../../../../common/actions/actionsEnum';
import { memberRequest } from '../membersRequest';
import { MemberEntity } from '../../../../api/memberEntity';
import { memberApi } from '../../../../api/memberApi';
import ReduxThunk from 'redux-thunk';

const middlewares = [ ReduxThunk ];

const mockStore = configureStore(middlewares);

describe('loadMembers', () => {
  it('should return a promise, and this promise dispatch assignMembers action that returns ' +
    'an action equals { type: MEMBERS_ASSIGN, members: expectedMembers }', sinon.test((done) => {
    let sinon: Sinon.SinonStatic = this;
    let member1 = new MemberEntity();
    let member2 = new MemberEntity();

    member1.login = "test1";
    member2.login = "test2"

    let expectedMembers : Array<MemberEntity> = [member1, member2];

    // Arrange
    let getAllMembersAsyncMethodStub = sinon.stub(memberApi, 'getAllMembersAsync');
    getAllMembersAsyncMethodStub.returns({
      then: callback => {
        callback(expectedMembers);
      }
    });

    // Once the original action is executed it just dispatch a new action:
    // MEMBER_REQUEST_COMPLETED
    const expectedAction = {
      type: actionsEnums.membersPage.MEMBERS_REQUEST_COMPLETED,
      members: expectedMembers
    }

    // Act
    const store = mockStore([]);

    store.dispatch(memberRequest())
      .then(() => {
        expect(store.getActions()[0]['type']).to.be.equal((expectedAction.type));
        expect(store.getActions()[0]['members']['length']).to.be.equal(2);
        done();
      });
  }).bind(this));
});
