import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import {DeviceProvider} from "../../../contexts/DeviceContext";
import ReportScreen from "../../../screens/ReportScreen/ReportScreen";
import * as React from "react";

describe('ReportScreen', () => {
    it('Test ispravnog prikazivanja ReportScreen-a', () => {
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<ReportScreen/>} />}/>
        );
        //StatisticScreen 3 childa, ako je ispravno prikazan
        let view=screen.getByTestId( 'view');
        expect(view.children.length).toBe(3);
    });
});