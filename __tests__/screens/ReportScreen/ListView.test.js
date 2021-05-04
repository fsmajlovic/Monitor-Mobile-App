import {fireEvent, render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import {DeviceProvider} from "../../../contexts/DeviceContext";
import ListView from "../../../screens/ReportScreen/components/ListView";
import * as React from "react";
import { testZaJest } from "../../../screens/AccessControlScreen/AccessControlScreen";

describe('ListView', () => {
    it('Test ispravnog prikazivanja ListView-a', () => {
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<ListView/>} />}/>
        );
        //ListItem ima 1 child, ako je ispravno prikazan
        let view=screen.getByTestId( 'listview');
        expect(view.children.length).toBe(1);
    });
});
