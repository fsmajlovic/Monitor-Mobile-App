import * as React from "react";
import { render } from '@testing-library/react-native';
import ConsoleRow from '../../../screens/ConsoleScreen/ConsoleRow';

describe('ConsoleRow', () => {
    it('should render ConsoleRow screen', () => {
        const { getAllByTestId } = render(
            <ConsoleRow rows={[]} />
        );
            
        let views = getAllByTestId('console-row');
        expect(views.length).toBe(1);
    });
    it('should render 0 rows', () => {
        const { getByTestId } = render(
            <ConsoleRow rows={[]} />
        );
            
        let view = getByTestId('console-row');
        //
        expect(view.children.length).toBe(0);
    });
    it('should render 2 rows with text command', () => {
        const { getAllByText } = render(
            <ConsoleRow rows={['command', 'command', 'ls']} />
        );

        const rows = getAllByText('command');
        expect(rows.length).toEqual(2);
    });
});