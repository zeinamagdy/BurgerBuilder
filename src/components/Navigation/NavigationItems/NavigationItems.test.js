import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NavigationItems/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })
    it('Should return two NavigationItem if not authenicated ', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('Should return two NavigationItem if authenicated ', () => {
        wrapper.setProps({ isAuthenicated: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('Should contain logout NavigationItem', () => {
        wrapper.setProps({ isAuthenicated: true })
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})