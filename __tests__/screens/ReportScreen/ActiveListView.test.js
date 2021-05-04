import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import * as React from "react";
import ActiveListView from "../../../screens/ReportScreen/components/ActiveListView";
import { DeviceProvider } from "../../../contexts/DeviceContext";


describe('ActiveListView', () => {
    it('Test ispravnog prikaza za ActiveListeView', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<ActiveListView />} />}/>
        );
        const view = screen.getByTestId("view");
        expect(view.children.length).toBe(1);
    });
});