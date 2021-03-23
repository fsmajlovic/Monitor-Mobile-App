import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './authContext';
import axios from 'axios';

export const DeviceContext = React.createContext();

const URL = "https://si-2021.167.99.244.168.nip.io/api/device/AllDevices";

export const DeviceProvider = (props) => {
    const { getSavedToken } = useContext(AuthContext);
    const [devices, setDevices] = useState([]);

    const values = {
        devices,
        setDevices
    }

    return (
        <DeviceContext.Provider value={values}>
            { props.children}
        </DeviceContext.Provider>
    )
}