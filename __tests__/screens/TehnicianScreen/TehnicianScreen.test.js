import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';

import TehnicianScreen from '../../../screens/TehnicianScreen/TehnicianScreen';

it('renders AddTask button ', () => {
    const {getAllByText} = render(<TehnicianScreen/>);
    expect(getAllByText("Add Task").length).toBe(1);
})

it('renders Schedule button', () => {
    const {getAllByText} = render(<TehnicianScreen/>);
    expect(getAllByText("Schedule").length).toBe(1);
})

it('navigates to AddTask component', () => {
    const mockNavigation = {
        push: jest.fn()
    }
    const {getByText} = render(<TehnicianScreen navigation={mockNavigation}/>);
    const click = getByText("Add Task");
    fireEvent(click.parent.parent, 'press');
    expect(mockNavigation.push).toHaveBeenCalled();

})

it('navigates to Schedule component', () => {
    const mockNavigation = {
        push: jest.fn()
    }
    const {getByText} = render(<TehnicianScreen navigation={mockNavigation}/>);
    const click = getByText("Schedule");
    fireEvent(click.parent.parent, 'press');
    expect(mockNavigation.push).toHaveBeenCalled();
})