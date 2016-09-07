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
