import * as React from "react";
import { render, fireEvent } from '@testing-library/react-native';
import { act } from "react-dom/test-utils";

import { DeviceProvider } from "../../../contexts/DeviceContext";
import { AuthProvider} from "../../../contexts/authContext";
import ConsoleLog from '../../../screens/ConsoleScreen/ConsoleLog';

describe('ConsoleLog', () => {

    it('should render ConsoleLog screen', () => {
        const { getAllByTestId } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleLog/>
                </DeviceProvider>
            </AuthProvider>
        );
        let views = getAllByTestId('console-log');
        expect(views.length).toBe(1);
    });

    it('should render ConsoleLog view with 3 components', async () => {
        const { getByTestId } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleLog/>
                </DeviceProvider>
            </AuthProvider>
        );

        let view = getByTestId('console-log');
        expect(view.children.length).toBe(3);
    });
    it('should render picker-users with 0 picker items', async () => {
        const { getByTestId } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleLog/>
                </DeviceProvider>
            </AuthProvider>
        );

        let picker = getByTestId('picker-users');
        expect(picker.children.length).toBe(0);
    });

    it('should call onValueChange for picker-sort', async () => {
        const onEventMock = jest.fn();
        const { getByTestId } = render(
            <AuthProvider>
                <DeviceProvider>
                    <ConsoleLog/>
                </DeviceProvider>
            </AuthProvider>
        );

        const picker = getByTestId("picker-sort");
        await act(async () => {
            fireEvent(picker, 'onValueChange', [0, 0]);
        })

    });
});