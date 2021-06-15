import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DeviceContext } from '../../contexts/DeviceContext';
import ConsoleRow from './ConsoleRow'
import { styles } from './Styles'
import { AuthContext } from '../../contexts/authContext';
import { userContext } from '../../contexts/userContext';
import { serverURL } from '../../appConfig';
import { useContext } from 'react';
import axios from 'axios';
import moment from "moment";
import 'moment-timezone';

export default function Console({ navigation }) {

    const group1 = ["?", "clear", "ls", "driverquery", "ipconfig", "systeminfo", "tasklist", "dir"];
    const group2 = ["cd", "echo", "erase", "kill", "move", "rd", "set", "mkdir", "ping"];
    const group3 = ["shutdown"];

    const [username, setUsername] = useState("");

    const [folders, setFolders] = useState([]);
    const [edited, setEdited] = useState(true);
    const [previous, setPrevious] = useState("");
    const [indexFolder, setIndexFolder] = useState(0);
    const [filteredFolders, setFilteredFolders] = useState([]);

    const { activeDevice } = useContext(DeviceContext);
    const [id, setId] = useState(activeDevice.deviceUid);
    const [id2, setId2] = useState(activeDevice.deviceId);
    const [path, setPath] = useState(activeDevice.path);
    const [connected, setConnected] = useState(false);
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(false);
    const [restart, setRestart] = useState(false);
    const [password, setPassword] = useState(false);

    const [rows, setRows] = useState([]);
    const [current, setCurrent] = useState("");

    const { getSavedToken } = React.useContext(AuthContext);

    const [restartCommand, setRestartCommand] = useState([]);

    const addRows = (newRow) => {
        setRows((prevRows) => {
            return (
                [...prevRows, newRow]
            )
        })
    };

    const addRestartCommand = (newRow) => {
        setRestartCommand((prevRows) => {
            return (
                [...prevRows, newRow]
            )
        })
    };

    const deleteRestartCommand = () => {
        setRestartCommand([]);
    };

    useEffect(() => {
        getFoldersInCurrentPath();
    }, [path]);

    const getUser = async () => {
        setUser(true);
        let token = await getSavedToken();

        fetch("https://si-2021.167.99.244.168.nip.io:3333/jwt/verify", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": "Bearer " + token,
            },

        }).then(res => res.json())
            .then(res => {
                setUserId(res.id);
                setUsername(res.email);
            });
    }

    const connect = async () => {
        let token = await getSavedToken();
        await getUser();

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
                console.log("konekcija " + res.message)
                if (!(username === 'undefined'))
                    setConnected(true);
                //???????????????????????????????????????????????????????????                   
                //   getFoldersInCurrentPath();
            });
    }

    useEffect(() => {
        if (!connected)
            connect();
    }, [username]);

    const connectToDataBase = async (command, response) => {
        let token = await getSavedToken();
        let time = moment().utcOffset('+02:00').format('YYYY-MM-DD hh:mm:ss a').toString()
        fetch('https://si-2021.167.99.244.168.nip.io/api/user-comand-logs', {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                UserId: userId,
                DeviceId: id2,
                Command: command,
                Response: response,
                Time: time
            })
        }).then(res => res.text())
            .then(text => {
                //console.log(text)
            });
    }
    const sendRequest = async (command) => {
        console.log("Komanda: " + command);

        let token = await getSavedToken();

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
                user: username
            })
        })
            .then(res => res.json())
            .then(res => {

                if (typeof res.message === 'undefined') {
                    addRows(res.error)
                } else {
                    let modified = res.message;

                    if (command === 'ls') {
                        let modified = res.message.replace(/\\n/g, "\n");
                        modified = modified.replace(/\\r/g, "\r");
                    }
                    setPath(res.path);
                    if (res.message.length != 0)
                        addRows(modified);

                    connectToDataBase(command, modified);
                }
            });
    }

    const getFolders = (unformatted) => {
        console.log("Pozvalo se ovo 1");
        let folderi = [];
        for (let i = 7; i < unformatted.length; i++) {
            let red = unformatted[i].replace(/\s\s+/g, ' ').split(" ");
            if (isNaN(red[3]))
                folderi.push(red.slice(3).join(" ").trim());
        }
        return folderi.filter((x) => { return x != ""; });
    }

    const getFoldersInCurrentPath = async () => {
        console.log("Pozvalo se ovo 1");
        let token = await getSavedToken();
        fetch('https://si-grupa5.herokuapp.com/api/agent/command', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                deviceUid: id,
                command: "ls",
                path: path,
                user: username
            })
        })
            .then(res => res.json())
            .then(res => {
                let modified = res.message.replace(/\\n/g, "\n");
                modified = modified.replace(/\\r/g, "\r");
                modified = modified.split("\n");
                setFolders(getFolders(modified));
            });
    }

    const recommendFolder = async () => {

        console.log("Pozvalo se ovo 2");
        if (edited) {
            setEdited(false);
            setIndexFolder(0);
            let text = current.split(" ");
            text = text[text.length - 1];
            setFilteredFolders(folders.filter((x) => { return x.startsWith(text) }));
            setPrevious(current);
            return;
        }
        let text = previous.split(" ");
        text = text[text.length - 1];
        setCurrent(previous + filteredFolders[indexFolder].replace(text, ""));
        if (indexFolder == filteredFolders.length - 1) {
            setIndexFolder(0);
        }
        else {
            setIndexFolder(indexFolder + 1);
        }
    }

    return (
        <View testID={'console'} style={styles.componentContainer1}>

            <ScrollView style={styles.scrollView}>
                <ConsoleRow rows={rows} />
                <View style={styles.row}>
                    <Text style={styles.textArea}> {path}>  </Text>
                    <TextInput
                        testID={'input'}
                        style={styles.inputArea}
                        value={current}
                        secureTextEntry={password}
                        onChangeText={(e) => { setCurrent(e); setEdited(true); }}
                        placeholder="..."
                        placeholderTextColor="#bbbbbb"
                        onSubmitEditing={async (event) => {
                            let input = event.nativeEvent.text.replace(/ +/g, ' ').trim();
                            let args = input.split(" ");
                            let command = "";
                            command = args[0].toLowerCase();

                            if (restartCommand.length != 2) addRows(path + "> " + event.nativeEvent.text);

                            //unesen restart
                            if (restartCommand.length == 0 && input.toLowerCase().includes("shutdown -r")) {
                                addRestartCommand("shutdown -r");
                                addRows("Username: ");
                                setPath("");
                            }
                            //unesen username
                            else if (restartCommand.length == 1) {
                                addRestartCommand(input);
                                addRows("Password: ");
                                setPassword(true);
                            }
                            //unsen password
                            else if (restartCommand.length == 2) {
                                sendRequest(restartCommand[0] + " " + restartCommand[1] + " " + input);
                                setPassword(false);
                                addRows("Restarting");
                                deleteRestartCommand();
                            }
                            //ostale validne komande
                            else if ((group1.includes(command) && args.length == 1) || (group2.includes(command) && args.length >= 2) || group3.includes(command)) {
                                sendRequest(input);
                                
                                if (group3.includes(command)) {
                                    addRows("Shutting down...");
                                    setPath("");
                                }
                            }
                            //nevalidna komanda
                            else {
                                addRows("Invalid command!");
                            }

                            setCurrent("");
                        }}></TextInput>
                </View>
            </ScrollView>
            <View style={[styles.container1]}>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        testID={'tab'}
                        style={styles.button}
                        onPress={() => { recommendFolder(); }}
                    >
                        <Text style={styles.buttonText}>Tab</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}