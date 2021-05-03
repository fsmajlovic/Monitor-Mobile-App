import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import {DeviceProvider} from "../../../contexts/DeviceContext";
import MachineScreen from "../../../screens/ReportScreen/screens/MachineScreen";
import * as React from "react";

describe('MachineScreen', () => {
    it('Test ispravnog prikazivanja MachineScreen-a', () => {
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<MachineScreen/>} />}/>
        );
        //StatisticScreen 3 childa, ako je ispravno prikazan
        let view=screen.getByTestId( 'machinescreen');
        expect(view.children.length).toBe(3);
    });
});
