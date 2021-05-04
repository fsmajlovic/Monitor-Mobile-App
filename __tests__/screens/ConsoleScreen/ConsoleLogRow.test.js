import * as React from "react";
import { render } from '@testing-library/react-native';
import ConsoleLogRow from '../../../screens/ConsoleScreen/ConsoleLogRow';


describe('ConsoleLogRow', () => {
    it('should render ConsoleLogRow screen', () => {
        const { getAllByTestId } = render(
            <ConsoleLogRow rows={[]} />
        );
            
        let views = getAllByTestId('console-log-row');
        expect(views.length).toBe(1);
    });
    it('should render 0 rows', () => {
        const { getByTestId } = render(
            <ConsoleLogRow rows={[]} />
        );
            
        let view = getByTestId('console-log-row');
        expect(view.children.length).toBe(0);
    });
    it('should render 2 rows with username Lejla', () => {
        const { getAllByText } = render(
            <ConsoleLogRow rows={[['lejla', '24-1-2021T01:01:01', 'ls', 'response'], ['lejla', '24-1-2021T01:01:01', 'ls', 'response'], ['test', '24-1-2021T01:01:01', 'ls', 'response']]} />
        );

        const rows = getAllByText('lejla');
        expect(rows.length).toEqual(2);
    });
    it('should render 1 row that conains lejla, 24-1-2021 01:01:01, ls and response', () =>  {
        const { getAllByText } = render(
            <ConsoleLogRow rows={[['lejla', '24-1-2021T01:01:01', 'ls', 'response']]} />
        );

        const username = getAllByText('lejla');
        expect(username.length).toEqual(1);
        const date = getAllByText('24-1-2021 01:01:01');
        expect(date.length).toEqual(1);
        const command = getAllByText('ls');
        expect(command.length).toEqual(1);
        const response = getAllByText('response');
        expect(response.length).toEqual(1);
    });
});