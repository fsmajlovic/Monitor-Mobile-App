import React, { useState, useContext } from 'react'
import { Picker, View, ScrollView } from 'react-native';
import { AuthContext } from '../../contexts/authContext';
import { DeviceContext } from '../../contexts/DeviceContext';
import { styles } from './Styles'
import ConsoleLogRow from './ConsoleLogRow'

export default function ConsoleLog({ navigation }) {

    const { getSavedToken } = React.useContext(AuthContext);
    const { activeDevice } = useContext(DeviceContext);

    const [TableData, setTableData] = useState([]);
    const [SortByDate, setSortByDate] = useState(["Sort by date: ascending", "Sort by date: descending"]);
    const [users, setUsers] = useState([["All users", -1]]);
    const [id2, setId2] = useState(activeDevice.deviceId);
    const [logs, setLogs] = useState(false);
    const [users2, setUsers2] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const [selectedSort, setSelectedSort] = useState(0);

    const addTableRow = (newRow) => {
        setTableData((prevRows) => {
            return (
                [...prevRows, newRow]
            )
        })
    };

    const addUser = (newUser) => {
        setUsers((prevUsers) => {
            return (
                [...prevUsers, newUser]
            )
        })
    };

    const getUsers = async () => {
        setUsers2(true);

        let token = await getSavedToken();

        fetch("https://si-2021.167.99.244.168.nip.io/api/user/GetAllUsers", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token,
            },

        }).then(res => res.json())
            .then(res => {
                for (var i = 0; i < res.data.users.length; i++) {
                    var user = res.data.users[i];
                    addUser([user.email, user.userId]);
                }
            });

    }

    const getLogs = async (userId) => {
        setLogs(true);
        setTableData([]);
        let token = await getSavedToken();

        let url = "";

        if (userId == -1)
            url = "https://si-2021.167.99.244.168.nip.io/api/user-command-logs/CommandLogsForDevice?deviceId=" + id2;
        else
            url = "https://si-2021.167.99.244.168.nip.io/api/user-command-logs/CommandLogsForDeviceAndUser?deviceId=" + id2 + "&userId=" + userId;

        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token,
            },

        }).then(res => res.json())
            .then(res => {
                for (var i = 0; i < res.data.length; i++) {
                    var log = res.data[i];
                    var fullName = log.user.name + " " + log.user.lastname
                    addTableRow([fullName, log.time, log.command, log.response.slice(0, 3000)]);
                }
            });
    }

    if (!logs)
        getLogs(-1);

    if (!users2)
        getUsers();

    return (
        <View testID={'console-log'} style={styles.componentContainer2}>
            <View style={styles.picker}>
                <Picker
                    testID={'picker-users'}
                    mode="dropdown"
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); getLogs(users[itemIndex][1]); }}>
                    {users.map((item, index) => {
                        return (<Picker.Item label={item[0]} value={index} key={index} />)
                    })}
                </Picker>
            </View>
            <View style={styles.picker}>
                <Picker
                    mode="dropdown"
                    testID={'picker-sort'}
                    selectedValue={selectedSort}
                    onValueChange={(itemValue, itemIndex) => {
                        setSelectedSort(itemValue); if (itemValue == 0)
                            TableData.sort((a, b) => Date.parse(a[1]) - Date.parse(b[1]))
                        else TableData.sort((a, b) => Date.parse(b[1]) - Date.parse(a[1]))
                    }}>
                    {SortByDate.map((item, index) => {
                        return (<Picker.Item label={item} value={index} key={index} />)
                    })}
                </Picker>
            </View>
            <ScrollView>
                <ConsoleLogRow rows={TableData} />
            </ScrollView>
        </View>
    );
};
