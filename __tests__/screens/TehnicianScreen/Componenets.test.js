import * as React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react-native";

import { AuthProvider} from "../../../contexts/authContext";
import AddComponent from "../../../screens/TehnicianScreen/screens/AddComponent";
import {Text, FlatList, TouchableOpacity} from 'react-native';
import ComponentView from "../../../screens/TehnicianScreen/screens/ComponentView";
import { Formik } from "formik";

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

    it('Render AddComponenet - 4 children', () => {
        const screen = render(
            <AuthProvider children={
               <AddComponent 
                   route={route}
                />}/>
        );
        const views = screen.getByTestId("views");
        expect(views.children.length).toBe(4);
    });
})

describe("ComponentView", ()=> {
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

    it('Render ComponenetView', () => {
        const screen = render(
            <AuthProvider children={
               <ComponentView
                   route={route}
                />}/>
        );
        const flatlist = screen.getByTestId("flatList");
        //2 jer ima flatlist i view
        expect(flatlist.children.length).toBe(2);
    });

    it('Pritisak na Add part', () => {
        const fja = jest.fn();
        const navigation = {push: fja}
        const {getByTestId} = render(
            <AuthProvider children={
               <ComponentView
                   route={route}
                   navigation={navigation}
                />}/>
        );
        fireEvent.press(getByTestId("add"));
        expect(fja).toHaveBeenCalled();
    });   
})
