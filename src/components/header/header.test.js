import React from 'react';
import Header from './header';
import {shallow} from 'enzyme';


describe('Testing <Header/>', () => {
    it('Header is rendered correctly', () => {
        const header = shallow(<Header/>);
        expect(header).toMatchSnapshot();
    })
})