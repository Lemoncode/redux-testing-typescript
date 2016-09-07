import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as React from 'react';
import configureStore from 'redux-mock-store';
import * as membersActions from '../actions/membersRequest';
import {MembersPageContainer} from "../membersPageContainer";
import {MemberEntity} from '../../../api/memberEntity';

const createStore = configureStore();

describe('MembersPage container component', () => {

    it('should renders MembersPage presentational component with members property equals undefined' +
        'passing state equals { members: undefined }', sinon.test(() => {

        let sinon: Sinon.SinonStatic = this;

        let mockStore = createStore({
            members: undefined
        });


        let loadMembersActionMock = sinon.stub(membersActions,
                                               'memberRequest',
                                               () => {
                                                 return {
                                                   type: 'dummy'
                                                 }
                                               }
                                               );

        // TODO: Check why we have to downcast it to any
        const nonTypedMockStore : any = mockStore;
        let membersPageContainerWrapper = mount(
          <Provider store={nonTypedMockStore}>
              <MembersPageContainer />
          </Provider>
        );

        var membersPagePresentationalWrapper = membersPageContainerWrapper.find('MembersPage');
        expect(membersPagePresentationalWrapper).not.to.be.undefined;
        expect(membersPagePresentationalWrapper.prop('members')).to.be.undefined;

    }).bind(this));

    it('should renders MembersPage presentational component with members property equals empty' +
        'passing state equals { members: new Array<MemberEntity>() }',  sinon.test(() => {
        let sinon: Sinon.SinonStatic = this;
        let mockStore = createStore({
            members: new Array<MemberEntity>()
        });

        let loadMembersActionMock = sinon.stub(membersActions,
                                               'memberRequest',
                                               () => {
                                                 return {
                                                   type: 'dummy'
                                                 }
                                               }
                                               );

        // TODO: Check why we have to downcast it to any
        const nonTypedMockStore : any = mockStore;
        let membersPageContainerWrapper = mount(
            <Provider store={nonTypedMockStore}>
                <MembersPageContainer />
            </Provider>
        );

        var membersPagePresentationalWrapper = membersPageContainerWrapper.find('MembersPage');
        expect(membersPagePresentationalWrapper).not.to.be.undefined;
        expect(membersPagePresentationalWrapper.prop('members')).to.be.empty;
    }).bind(this));

    it('should renders MembersPage presentational component with members property equals array with one member' +
        'passing state equals { members: [member] }', sinon.test(() => {
        let sinon: Sinon.SinonStatic = this;
        let member = new MemberEntity();

        let mockStore = createStore({
            members: [member]
        });

        let loadMembersActionMock = sinon.stub(membersActions,
                                               'memberRequest',
                                               () => {
                                                 return {
                                                   type: 'dummy'
                                                 }
                                               }
                                               );

        // TODO: Check why we have to downcast it to any
        const nonTypedMockStore : any = mockStore;
        let membersPageContainerWrapper = mount(
            <Provider store={nonTypedMockStore}>
                <MembersPageContainer />
            </Provider>
        );

        var membersPagePresentationalWrapper = membersPageContainerWrapper.find('MembersPage');
        expect(membersPagePresentationalWrapper).not.to.be.undefined;
        expect(membersPagePresentationalWrapper.prop('members')).to.have.length(1);
    }).bind(this));

    it('should renders MembersPage presentational component with repos property equals undefined' +
        'passing state equals { repos: undefined }', sinon.test(() => {
        let sinon: Sinon.SinonStatic = this;

        let mockStore = createStore({
            repos: undefined
        });

        let loadMembersActionMock = sinon.stub(membersActions,
                                               'memberRequest',
                                               () => {
                                                 return {
                                                   type: 'dummy'
                                                 }
                                               }
                                               );


        // TODO: Check why we have to downcast it to any
        const nonTypedMockStore : any = mockStore;
        let membersPageContainerWrapper = mount(
            <Provider store={nonTypedMockStore}>
                <MembersPageContainer />
            </Provider>
        );

        var membersPagePresentationalWrapper = membersPageContainerWrapper.find('MembersPage');
        expect(membersPagePresentationalWrapper).not.to.be.undefined;
        expect(membersPagePresentationalWrapper.prop('repos')).to.be.undefined;
    }).bind(this));



    it('should renders MembersPage presentational component and calls to loadMembers' +
        'passing state equals { }', sinon.test(() => {
        let sinon: Sinon.SinonStatic = this;
        let mockStore = createStore({
        });

        let loadMembersActionMock = sinon.stub(membersActions,
                                               'memberRequest',
                                               () => {
                                                 return {
                                                   type: 'dummy'
                                                 }
                                               }
                                               );

        // TODO: Check why we have to downcast it to any
        const nonTypedMockStore : any = mockStore;
        let membersPageContainerWrapper = mount(
            <Provider store={nonTypedMockStore}>
                <MembersPageContainer />
            </Provider>
        );

        var membersPagePresentationalWrapper = membersPageContainerWrapper.find('MembersPage');
        expect(loadMembersActionMock.calledOnce).to.be.true;
    }).bind(this));
});
