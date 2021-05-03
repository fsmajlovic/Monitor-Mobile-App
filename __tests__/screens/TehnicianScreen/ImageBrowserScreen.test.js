import * as React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react-native";

import { AuthProvider} from "../../../contexts/authContext";
import { DeviceProvider } from "../../../contexts/DeviceContext";
import ImageBrowserScreen from "../../../screens/TehnicianScreen/screens/ImageBrowserScreen";

describe('BrowserScreen', () => {

    it('Test ispravnog prikazivanja BrowserScreena', () => {
        const screen = render(
            <AuthProvider children={<DeviceProvider children={<ImageBrowserScreen />} />}/>
        );
        const views = screen.getByTestId("browserscreen");
        expect(views.children.length).toBe(1);
    });

    it('Test ispravnog pritiska na masinu', () => {
        const screen = render(
            <AuthProvider children={<DeviceProvider children={<ImageBrowserScreen />} />}/>
        );
        fireEvent.press(screen.getByTestId( 'browserscreen'));
        expect(test).toHaveBeenCalled();
    });
})
