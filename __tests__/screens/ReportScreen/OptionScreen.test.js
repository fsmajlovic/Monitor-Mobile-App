import { render } from "@testing-library/react-native";
import * as React from "react";

import { AuthProvider} from "../../../contexts/authContext";
import { DeviceProvider } from "../../../contexts/DeviceContext";
import OptionScreen from "../../../screens/ReportScreen/screens/OptionScreen";

describe('OptionScreen', () => {
    it('Render', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<OptionScreen />} />}/>
        );
        const view = screen.getByTestId("view");
        expect(view.children.length).toBe(1);
    });
})