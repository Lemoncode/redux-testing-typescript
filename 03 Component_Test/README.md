# Sample 03: Components

In this sample we take as starting point sample: "02 Action_Test" and we will add all unit tests to components:
- Stateless components.
- Containers.
- Presentationals.

We will use _Enzyme_ as component testing library.

Summary:

- Implement tests for a stateless component.
- Implement tests for a container component.
- Implement test for a presentational component.


# Steps:

Let's start with memberRow stateless component.

Under _components/members_ let's create subfolder called _spec_, and create file
called memberRow.spec.tsx and add the following file:

````javascript
import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as React from 'react';
import { Link } from 'react-router';
import MemberRow from '../memberRow';
import MemberEntity from '../../../api/memberEntity';

describe('MemberRow presentational component', () => {
    it('should renders a tr element with three td like children' +
        'passing member property with default values', () => {
        let member = new MemberEntity();

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(0).type()).to.be.equals('td');
        expect(memberRowWrapper.children().at(1).type()).to.be.equals('td');
        expect(memberRowWrapper.children().at(2).type()).to.be.equals('td');
        expect(memberRowWrapper.children().at(3).type()).to.be.null;
    });

    it('should renders a img element in first column with class equals "avatar" ' +
        'and src property equals empty' +
        'passing member property with default values', () => {
        let member = new MemberEntity();

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(0).children().type()).to.be.equals('img');
        expect(memberRowWrapper.children().at(0).children().hasClass('avatar')).to.be.true;
        expect(memberRowWrapper.children().at(0).children().prop('src')).to.be.empty;
    });

    it('should renders a img element in first column with class equals "avatar" ' +
        'and src property equals "test"' +
        'passing member property equals { avatar_url: "test"}', () => {
        let member = new MemberEntity();
        member.avatar_url = "test";

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(0).children().type()).to.be.equals('img');
        expect(memberRowWrapper.children().at(0).children().hasClass('avatar')).to.be.true;
        expect(memberRowWrapper.children().at(0).children().prop('src')).to.be.equals('test');
    });

    it('should renders a Link element in second column with to property equals "/memberEdit/-1" ' +
        'and text equals -1' +
        'passing member property with default values', () => {
        let member = new MemberEntity();

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(1).children().type()).to.be.equals(Link);
        expect(memberRowWrapper.children().at(1).children().prop('to')).to.be.equals('/memberEdit/-1');
        expect(memberRowWrapper.children().at(1).children().children().text()).to.be.equals('-1');
    });

    it('should renders a Link element in second column with to property equals "/memberEdit/2" ' +
        'and text equals 2' +
        'passing member property equals { id: 2 }', () => {
        let member = new MemberEntity();
        member.id = 2

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(1).children().type()).to.be.equals(Link);
        expect(memberRowWrapper.children().at(1).children().prop('to')).to.be.equals('/memberEdit/2');
        expect(memberRowWrapper.children().at(1).children().children().text()).to.be.equals('2');
    });

    it('should renders a span element in third column with text equals empty ' +
        'passing member property with default values', () => {
        let member = new MemberEntity();

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(2).children().type()).to.be.equals('span');
        expect(memberRowWrapper.children().at(2).children().text()).to.be.empty;
    });

    it('should renders a span element in third column with text equals "test" ' +
        'passing member property equals { login: "test" }', () => {
        let member = new MemberEntity();
        member.login = "test";

        let memberRowWrapper = shallow(
            <MemberRow member={member}/>
        );

        expect(memberRowWrapper.type()).to.be.equals('tr');
        expect(memberRowWrapper.children().at(2).children().type()).to.be.equals('span');
        expect(memberRowWrapper.children().at(2).children().text()).to.be.equals('test');
    });
});

````

Let's continue by adding unit test support to a container component, in this cases ContainerMembersPage.

We are going to create an _spec_ folder under _components/members/_ then we will add a file named member memberPage.container.spec.tsx


````javascript
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import * as React from 'react';
import configureStore from 'redux-mock-store';
import * as membersActions from '../actions/membersRequest';
import MembersPageContainer from "../membersPage";
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
````

Just to finish with this component testing tour, let's add unit test support to a presentational component (membersPage), under members/spec we will
create a file named membersPage.spec.tsx

````javascript
import { expect } from 'chai';
import { shallow, mount } from "enzyme";
import * as React from "react";
import {MembersPage} from '../membersPage';
import {MemberEntity} from '../../../api/memberEntity';
import {MembersList} from '../membersList';



describe('MembersPage presentational component', () => {
    it('should renders a div with text equals "No data" and does not calls to loadMembers' +
        'passing members and repos properties equals undefined and using shallow enzyme method', () => {
        let loadMembersMock = sinon.spy();

        let properties = {
            members: undefined,
            repos: undefined,
            loadMembers: loadMembersMock,
        };

        var membersPageWrapper = shallow(
            <MembersPage {...properties} />
        );

        expect(membersPageWrapper.type()).to.be.equals('div');
        expect(membersPageWrapper.text()).to.be.equals('No data');
        expect(loadMembersMock.calledOnce).to.be.false;
    });

    it('should renders an empty div with text equals "< />"' +
        'passing members equals empty array and using shallow enzyme method', () => {
        let loadMembersMock = sinon.spy();

        let properties = {
            members: new Array<MemberEntity>(),
            loadMembers: loadMembersMock,
        };

        var membersPageWrapper = shallow(
            <MembersPage {...properties} />
        );

        expect(membersPageWrapper.type()).to.be.equals('div');
        expect(membersPageWrapper.text()).to.be.equals('< />');
        expect(loadMembersMock.calledOnce).to.be.false;
    });

    it('should renders a div with class equals "row" and two children, MemberList with property members equals array with one member ' +
        'and does not calls to loadMembers' +
        'passing members equals [member] array and using shallow enzyme method', () => {
        let loadMembersMock = sinon.spy();

        let member = new MemberEntity();

        let properties = {
            members: [member],
            loadMembers: loadMembersMock            
        };

        var membersPageWrapper = shallow(
            <MembersPage {...properties} />
        );

        expect(membersPageWrapper.type()).to.be.equals('div');
        expect(membersPageWrapper.hasClass('row')).to.be.true;
        expect(membersPageWrapper.children().at(0).type()).to.be.equals(MembersList);
        expect(membersPageWrapper.children().at(0).prop('members')).to.have.length(1);
        expect(loadMembersMock.calledOnce).to.be.false;
    });
});

````
