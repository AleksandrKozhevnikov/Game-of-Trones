import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';

describe('Testing <RandomChar/>', () => {
    it('RandomChar is rendered correctly', () => {
        const char = shallow(<RandomChar/>);
        expect(char).toMatchSnapshot();
    })
    it('State char in RandomChar is empty object', () => {
        const char = shallow(<RandomChar/>);
        expect(char.state().char).toBeObject();
    })
})