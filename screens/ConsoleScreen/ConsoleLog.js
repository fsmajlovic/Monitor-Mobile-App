import React, { useState, useContext } from 'react'
import { Text, View, ScrollView } from 'react-native';
import { AuthContext } from '../../contexts/authContext';
import { DeviceContext } from '../../contexts/DeviceContext';
import { styles } from './Styles'

export default function ConsoleLog({ navigation }) {

    const { getSavedToken } = React.useContext(AuthContext);
    const { activeDevice } = useContext(DeviceContext);

    const tableHead = ["User: ", "Date: ", "Command: ", "Response: "];
 //   const [TableData, setTableData] = useState([["User1", "Date1", "Command1", "Response1"], ["User2", "Date2", "Command2", "Response2"]]);
    const [TableData, setTableData] = useState([]);

    const [id2, setId2] = useState(activeDevice.deviceId);
    const [logs, setLogs] = useState(false);

    const addTableRow = (newRow) => {
        setTableData((prevRows) => {
            return (
                [...prevRows, newRow]
            )
        })
    };

    const getLogs = async () => {
        setLogs(true);
        let token = await getSavedToken();

        fetch('https://si-2021.167.99.244.168.nip.io/api/user-command-logs/CommandLogsForDevice?deviceId=' + "15", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token,
            },

        }).then(res => res.json())
            .then(res => {

                console.log(res.data.length)
                for (var i = 0; i < res.data.length; i++) {
                    var log = res.data[i];

                    addTableRow([log.user.email, log.time.slice(0, 10), log.command, log.response.slice(0, 3000)]);
                }
            });
    }

    if (!logs)
        getLogs();


    return (
        <View style={styles.componentContainer2}>
            <ScrollView>
                {TableData.map((row, index) => {
                    return (
                        <View key={index} style={styles.log} >
                            <View style={[styles.row, styles.logRow]}>
                                <Text style={styles.tableHead}>{tableHead[0]}</Text>
                                <Text style={styles.tableRow}>{row[0]}</Text>
                            </View>
                            <View style={[styles.row, styles.logRow]}>
                                <Text style={styles.tableHead}>{tableHead[1]}</Text>
                                <Text style={styles.tableRow}>{row[1]}</Text>
                            </View>
                            <View style={[styles.row, styles.logRow]}>
                                <Text style={styles.tableHead}>{tableHead[2]}</Text>
                                <Text style={styles.tableRow}>{row[2]}</Text>
                            </View>
                            <View style={[styles.row, styles.logRow]}>
                                <Text style={styles.tableHead}>{tableHead[3]}</Text>
                                <Text style={styles.tableRow}>{row[3]}</Text>

                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
};
