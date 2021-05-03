import * as React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react-native";

import { AuthProvider} from "../../../contexts/authContext";
import { DeviceProvider } from "../../../contexts/DeviceContext";
import ImageUploadScreen, { currentDate } from "../../../screens/TehnicianScreen/screens/ImageUploadScreen";

describe('AddComponenet', () => {
    const task = {
        taskId: 1,
        userId: 1,
        deviceId: 1,
        photoUploaded: false,
        device: {
            deviceId: 1,
            name: "Desktop PC",
            location: "Sarajevo",
            deviceUid: "33098e25-c605-4132-ad95-f38ecc3bd7a1"
        }
    }
    const route = { params: task}

    it('Render', () => {
        const screen = render(
            <AuthProvider children={<DeviceProvider children={<ImageUploadScreen route={route} />} />}/>
        );
        const views = screen.getByTestId("views");
        expect(views.children.length).toBe(1);
    });

    it('Render', () => {
        const screen = render(
            <AuthProvider children={<DeviceProvider children={<ImageUploadScreen route={route} />} />}/>
        );
        const views = screen.getByTestId("views");
        expect(views.children.length).toBe(1);
    });

    it('Funkcija currentDate', () => {
        let cDate = "2000:1:1:0:0:0";
        expect(currentDate(new Date("1.1.2000."))).toMatch(cDate);
    })
})
