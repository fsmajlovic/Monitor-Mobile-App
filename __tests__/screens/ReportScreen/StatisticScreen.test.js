import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import {DeviceProvider} from "../../../contexts/DeviceContext";
import StatisticScreen from "../../../screens/ReportScreen/screens/StatisticScreen";
import * as React from "react";

describe('StatisticScreen', () => {
    it('Test ispravnog prikazivanja StatisticScreen-a', () => {
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<StatisticScreen/>} />}/>
        );
        //StatisticScreen ima samo jedan child, ako je ispravno prikazan
        let view=screen.getByTestId( 'StatiscticView');
        expect(view.children.length).toBe(1);
    });
});
