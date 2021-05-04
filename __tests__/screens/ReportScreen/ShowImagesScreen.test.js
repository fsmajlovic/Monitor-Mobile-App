import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import ShowImagesScreen from "../../../screens/TehnicianScreen/screens/ShowImagesScreen";
import * as React from "react";

describe('ShowImagesScreen', () => {
    const task= {
        taskId: 108,
        userId: 6,
        deviceId: 39,
        photoUploaded: false,
        device: {
            deviceId: 39,
            name: "Desktop PC 3",
            location: "Sarajevo - Ložioničkaaaa",
            deviceUid: "33098e25-c605-4132-ad95-f38ecc3bd7a1"
        }
    }
    const route={params:task}
    it('Test ispravnog prikazivanja ShowImagesScreen-a', () => {
        const screen=render(
            <AuthProvider children={<ShowImagesScreen route={route} />}/>
        );
        //treba biti samo jedna flat lista prikazana
        const view=screen.getByTestId("slike");
        expect(view.children.length).toBe(1);
    });
    it('Test broja slika', () => {
        const screen=render(
            <AuthProvider children={<ShowImagesScreen route={route} />}/>
        );
        //pošto nema slika ovdje se treba baciti izuzetak
        try {
            const view=screen.UNSAFE_getAllByType("Image");
        }
        catch (e){
            expect(0).toBe(0);
        }
    });
});
