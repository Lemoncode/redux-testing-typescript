# Sample 02: Actions

In this sample we take as starting point sample: "01 Setup" and we will add all unit tests to actions (sync and async ones).

Summary:

- Implement tests for a sync action.
- Implement test for an async one (thunk based).


# Steps:

Let's start with a synchrnous action, we will choose the LoadMember action (this action is synchronous just because we are using a fake api and returning hardcoded data).

We are going to create a subfolder under actions called specs.

Then we add the loadMember.spec.ts file, that will contain
the tests to check that the action is behaving as expected.

In this case the action is using an external service: the membersApi, we need to mock this service in order to simulate each of the cases, to do that we will use Sinon (mocking library).

Below you will find the spec code:

````javascript
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
````

Testing a synchronous action is something straight forward but, how can we test an action that dispatches another
action via Redux-Thunk middleware (e.g. ajax calls). The trick here is that we inject a dummy callback
and then check that the promise returns the expected value. Let's test the _membersRequestAction_.

Under _members/actions_ let's create a subfolder called _spec_

````javascript


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
````
