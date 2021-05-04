import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthProvider} from "../../../contexts/authContext";
import Schedule from '../../../screens/TehnicianScreen/screens/Schedule';


it('renders the schedule', ()=> {
    const {getAllByTestId} = render(<AuthProvider children={<Schedule/>}/>);
    expect(getAllByTestId('kalendar').length).toBe(1);
})