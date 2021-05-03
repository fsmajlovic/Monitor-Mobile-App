import React from 'react';
import renderer from 'react-test-renderer';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { render } from "@testing-library/react-native";


import { testZaJest } from '../../../screens/AccessControlScreen/AccessControlScreen';
import { FileManager } from '../../../screens/AccessControlScreen/screens/FileManager';
import { AuthContext } from '../../../contexts/authContext';
import {userContext} from '../../../contexts/userContext';

import * as APP from '../../../App';

import * as FM from '../../../screens/AccessControlScreen/screens/FileManager';
import { AuthProvider} from "../../../contexts/authContext";
import { DeviceProvider } from "../../../contexts/DeviceContext";
import AccessControlScreen from "../../../screens/AccessControlScreen/AccessControlScreen";
import ListItemVertical from "../../../screens/AccessControlScreen/components/ListItemVertical";
import ListViewVertical from "../../../screens/AccessControlScreen/components/ListViewVertical";
import WebViewScreen from "../../../screens/AccessControlScreen/screens/WebViewScreen";

describe('Acces Control Screen Render Testing', () => {
    it('Render Access Control Screen Top View', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<AccessControlScreen />} />}/>
        );
        const view = screen.getByTestId("ACS_ID");
        expect(view.children.length).toBe(3);
    });
    it('ACS Child 1', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<AccessControlScreen />} />}/>
        );
        const view = screen.getByTestId("ACS_ID_1");
        expect(view.children.length).toBe(1);
    });
    it('ACS Child 2', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<AccessControlScreen />} />}/>
        );
        const view = screen.getByTestId("ACS_ID_2");
        expect(view.children.length).toBe(1);
    });
    it('ACS Child 3', () => {
        const screen =  render(
            <AuthProvider children={<DeviceProvider children={<AccessControlScreen />} />}/>
        );
        const view = screen.getByTestId("ACS_ID_3");
        expect(view.children.length).toBe(0);
    });
})

// describe('List Item Vertical Render Testing', () => {
//     it('Render List Item Vertical screen Top View', () => {
//         item = {
            
//         }
//         const screen =  render(
//             <AuthProvider children={<DeviceProvider children={<ListItemVertical item={item}/>} />}/>
//         );
//         const view = screen.getByTestId("LIV_ID_1");
//         expect(view.children.length).toBe(1);
//     });
    
// })

describe('Web View Render Testing', () => {
    it('Render Web View screen Top View', () => {
        let testnaLokacija = 'testnaLokacija';
        const location = {
            naziv: 'nesto'
        }
        const route = {params: location}
        const screen =  render(
            <AuthProvider children={<DeviceProvider  children={<WebViewScreen route={route}/>}/>}/>
        );
        const view = screen.getByTestId("WVS_ID");
        expect(view.children.length).toBe(0);
    });
    
})










// describe('AccessControlScreen', () => {
//     it('Primjer 1', () => {
//         //const tree = renderer.create(<App />).toJSON();
//         //expect(tree.children.length).toBe(1);
//         var rezultat = testZaJest(2);
//         expect(rezultat).toEqual(true);
//     });
// });

// describe('AccessControlScreen', () => {
//     it('FileManager test 1', async () => {
//         FM.getFiles();
//         const spy = jest.spyOn(Alert, 'alert');
//         expect(spy).toHaveBeenCalledTimes(1);
//     });
// });