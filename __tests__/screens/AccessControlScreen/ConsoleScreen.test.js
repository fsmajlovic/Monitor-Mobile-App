import * as React from "react";
import { render } from '@testing-library/react-native';

import { DeviceProvider } from "../../../contexts/DeviceContext";
import { AuthProvider} from "../../../contexts/authContext";
import ConsoleScreen from '../../../screens/ConsoleScreen/Console';
import ConsoleLogRow from '../../../screens/ConsoleScreen/ConsoleLogRow';
import ConsoleLog from '../../../screens/ConsoleScreen/ConsoleLog';
import ConsoleRow from '../../../screens/ConsoleScreen/ConsoleRow';

//testovi za ConsoleScreen
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
});


//testovi za ConsoleLog
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

    it('should render ConsoleLog view with 3 children', () => {
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
});

//testovi za ConsoleLogRow
describe('ConsoleLogRow', () => {
    it('should render 0 rows', () => {
        const { getAllByText } = render(
            <ConsoleLogRow rows={[]} />
        );

        //svaki red tabele sadrži tekst User
        try {
            getAllByText('User');
        } catch (e) {
            expect(e.message).toEqual("Unable to find an element with text: User");
        }
    });
    it('should render 2 rows with username Lejla', () => {
        const { getAllByText } = render(
            <ConsoleLogRow rows={[['lejla', '24-1-2021T01:01:01', 'ls', 'response'], ['lejla', '24-1-2021T01:01:01', 'ls', 'response'], ['test', '24-1-2021T01:01:01', 'ls', 'response']]} />
        );

        const rows = getAllByText('lejla');
        expect(rows.length).toEqual(2);
    });
});

//testovi za ConsoleRow
describe('ConsoleRow', () => {
    it('should render 2 rows with text command', () => {
        const { getAllByText } = render(
            <ConsoleRow rows={['command', 'command', 'ls']} />
        );

        const rows = getAllByText('command');
        expect(rows.length).toEqual(2);
    });
});
