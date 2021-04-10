import React, { useState , useEffect } from 'react';
import { Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DeviceContext } from '../../contexts/DeviceContext';
import ConsoleRow from './ConsoleRow'
import { styles } from './Styles'
import { AuthContext } from '../../contexts/authContext';
import { userContext } from '../../contexts/userContext';
import { serverURL } from '../../appConfig';
import { useContext } from 'react';
import axios from 'axios';

export default function Console({ navigation }) {

    const group1 = ["?", "clear", "ls", "driverquery", "ipconfig", "systeminfo", "tasklist", "dir"];
    const group2 = ["cd", "echo", "erase", "kill", "move", "rd", "set", "mkdir", "ping"];

    var username = React.useContext(userContext);
    const { activeDevice } = useContext(DeviceContext);
    const [id, setId] = useState(activeDevice.deviceUid);
    const [path, setPath] = useState(activeDevice.path);
    const [connected, setConnected] = useState(false);

    const [rows, setRows] = useState([]);
    const [current, setCurrent] = useState("");

    const { getSavedToken } = React.useContext(AuthContext);

    const addRows = (newRow) => {
        setRows((prevRows) => {
            return (
                [...prevRows, newRow]
            )
        })
    };

    const connect = async () => {
        let token = await getSavedToken();

        fetch('https://si-grupa5.herokuapp.com/api/agent/connect', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                deviceUid: id,
                user: username
            })
        }).then(res => res.json())
            .then(res => {
                console.log(id);
                console.log(username);
                console.log("konekcija " + res.message)
                if(!(username === 'undefined'))
                    setConnected(true);
            });
    }

    useEffect(() => {
        if (!connected)
            connect();
    }, [username]);

    const sendRequest = async (command, token) => {

        fetch('https://si-grupa5.herokuapp.com/api/agent/command', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                deviceUid: id,
                command: command,
                path: path,
                //  parameters: [],
                user: username
            })
        })
            .then(res => res.json())
            .then(res => {
                //  Token = res.token;

                if (typeof res.message === 'undefined') {
                    addRows(res.error)
                } else {
             //       let modified = res.message.replace(/\\n/g, "\n");
             //       modified = modified.replace(/\\r/g, "\r");
                    setPath(res.path);
                    if(res.message.length != 0)
                        addRows(res.message);
                }
            });
    }

    return (
        <View style={styles.componentContainer}>

            <ScrollView>
                <ConsoleRow rows={rows} />
                <View style={styles.row}>
                    <Text style={styles.textArea}> {path}>  </Text>
                    <TextInput
                        style={styles.inputArea}
                        value={current}
                        onChangeText={(e) => setCurrent(e)}
                        placeholder="..."
                        placeholderTextColor="#bbbbbb"
                        onSubmitEditing={async (event) => {
                            let input = event.nativeEvent.text.replace(/ +/g, ' ').trim();
                            let args = input.split(" ");
                            let command = "";
                            command = args[0].toLowerCase();

                        //    console.log("getUsername " + getUsername());
                            console.log("username " + username);
                      //      if (!connected)
                      //          connect(username);

                            addRows(path + "> " + event.nativeEvent.text);

                            if ((group1.includes(command) && args.length == 1) || (group2.includes(command) && args.length == 2)) {
                                //validna komanda
                                if (group2.includes(command)) {
                                    command += " " + args[1];
                                }

                                let token = await getSavedToken();
                                sendRequest(command, token);
                            } else {
                                //nevalidna komanda
                                addRows("Invalid command!");
                            }

                            setCurrent("");
                        }}></TextInput>
                </View>
            </ScrollView>
        </View>
    );
}