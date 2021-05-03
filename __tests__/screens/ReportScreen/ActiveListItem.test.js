import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import * as React from "react";
import ActiveListItem from "../../../screens/ReportScreen/components/ActiveListItem";
import { DeviceProvider } from "../../../contexts/DeviceContext";


describe('ActiveListItem', () => {

    const item = {
        name: "Desktop PC 3",
        location:"Sarajevo - Ložionička",
        lastTimeOnline:"Thu, 24 Apr 2021 05:49:04 GMT"
    }
    it('Test ispravnog prikaza', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<ActiveListItem item={item}/>} />}/>
        );
        const view = screen.getByTestId("view");
        expect(view.children.length).toBe(3);
    });
});



