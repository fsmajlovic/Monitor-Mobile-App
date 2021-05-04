import * as React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { act } from "react-dom/test-utils";

import { DeviceProvider } from "../../../contexts/DeviceContext";
import { AuthProvider} from "../../../contexts/authContext";
import ConsoleScreen from '../../../screens/ConsoleScreen/Console';

describe('ConsoleScreen', () => {
    it('should render ConsoleLog screen', () => {
        const { getAllByTestId } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleScreen/>
                </DeviceProvider>
            </AuthProvider>
        );
            
        let views = getAllByTestId('console');
        expect(views.length).toBe(1);
    });
    it('should call onSubmitEditing for command input', async () => {

        const { getByTestId, getAllByText } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleScreen/>
                </DeviceProvider>
            </AuthProvider>
        );

        const event = {nativeEvent: {text: 'ls'}};

        const input = getByTestId('input');
        await act(async () => {
            fireEvent(input, 'onSubmitEditing', [event]);
        })
        
    });

    it('should call onPress for tab button', async () => {

        const { getByTestId } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleScreen/>
                </DeviceProvider>
            </AuthProvider>
        );

        const tab = getByTestId('tab');
        await act(async () => {
            fireEvent(tab, 'onPress', []);
        })
        
    });

    
});
