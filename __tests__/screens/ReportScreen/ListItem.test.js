import {fireEvent, render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import {DeviceProvider} from "../../../contexts/DeviceContext";
import ListItem from "../../../screens/ReportScreen/components/ListItem";
import * as React from "react";
import { testZaJest } from "../../../screens/AccessControlScreen/AccessControlScreen";

describe('ListItem', () => {
    it('Test ispravnog prikazivanja ListItem-a', () => {
        item = {
            deviceId: 22,
            name: "Desktop PC 1",
            location: "Mostar - Braće Fejić",
            lastTimeOnline: "02-07-2020"
        }
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<ListItem item={item}/>} />}/>
        );
        //ListItem ima 3 childa, ako je ispravno prikazan
        let view=screen.getByTestId( 'listitem');
        expect(view.children.length).toBe(3);
    });

    it('Test ispravnog pritiska na dugme ListItem', () => {
        item = {
            deviceId: 22,
            name: "Desktop PC 1",
            location: "Mostar - Braće Fejić",
            lastTimeOnline: "02-07-2020"
        }
        const test = jest.fn();
        navigation = {
            push : test
        }
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<ListItem item={item} navigation={navigation}/>} />}/>
        );
        fireEvent.press(screen.getByTestId( 'listitem'));
        expect(test).toHaveBeenCalled();
    });
});
