import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './authContext';
import axios from 'axios';

export const DeviceContext = React.createContext();

const URL = "https://si-2021.167.99.244.168.nip.io/api/device/AllDevices";

export const DeviceProvider = (props) => {
    const { getSavedToken } = useContext(AuthContext);
    const [devices, setDevices] = useState([]);
    const [activeDevice, setActiveDevice] = useState("nesto");
    const [activeDevices, setActiveDevices] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const addActiveDevice = (device) => {
        if (!activeDevices.find(item => item.deviceId === device.deviceId)) {
            setActiveDevices([...activeDevices, device]);
            alert("Successfully added to active!")
        } else {
            alert("Device already exists in active!");
        }
    }

    const loadMore = () => {
        setPage(page + 1);
        setLoading(true);
    };

    const values = {
        activeDevices,
        addActiveDevice,
        activeDevice,
        setActiveDevice, 
        devices,
        setDevices,
        page,
        setPage,
        loading,
        setLoading,
        loadMore,
    }

    return (
        <DeviceContext.Provider value={values}>
            { props.children}
        </DeviceContext.Provider>
    )
}