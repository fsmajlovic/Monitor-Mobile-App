import React, { useState, useEffect } from 'react';
import { Button, Image, View } from "react-native";

import {
    List,
    ListItem,
    Text,
    Body,
    Container,
    Root,
    Content,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { AuthContext } from '../../../contexts/authContext';
import { machineURL, activeMachineURL } from '../../../appConfig';
import axios from 'axios';
import { serverURL } from "../../../appConfig";

function useSelectionChange(items) {
    const [selectionMode, setSelectionMode] = useState(null);
    useEffect(() => {
        if (items.filter(i => i.selected).length > 0) {
            setSelectionMode(true);
        } else {
            setSelectionMode(false);
        }
    });
    return selectionMode;
}

export default function App({ route }) {
    const [items, setItems] = useState([]);
    const selectionMode = useSelectionChange(items);
    
    //setFilesToSend(route.params)

    var { getSavedToken } = React.useContext(AuthContext);

    useEffect(() => {
        async function getData(getSavedToken) {
            let token = await getSavedToken();
            let activeMachines = [];
            try {
                activeMachines = await axios.get(activeMachineURL + 'agents/online', {
                    headers: {
                        'Authorization': `Bearer ` + token
                    }
                });
            } catch (e) {
                console.log(e)
            }
            setItems(activeMachines.data)
        }
        getData(getSavedToken);
    }, []);

    const toggleSelect = item => {
        setItems(
            items.map(i => {
                if (item === i) {
                    i.selected = !i.selected;
                }
                return i;
            }),
        );
    };

    const clearSelection = () => {
        setItems(
            items.map(i => {
                i.selected = false;
                return i;
            }),
        );
    };

    const onPress = item => {
        if (selectionMode) {
            toggleSelect(item);
        } else {
            pressItem(item);
        }
    };

    const onLongPress = item => {
        if (selectionMode === false) {
            toggleSelect(item);
        }
    };

    const pressItem = item => {
        console.log(JSON.stringify(item) + " pressed");
    };

    const renderItem = item => {
        return (
            <ListItem
                onPress={() => onPress(item)}
                onLongPress={() => onLongPress(item)}
                style={[item.selected ? styles.selected : styles.normal]}>
                <Image source={require('../../../assets/monitor-icon.gif')} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                    <Text style={styles.description}>
                        {item.location}
                    </Text>
                </View>
            </ListItem>
        );
    };

    return (
        <>
            <Root>
                <Container>

                    <Content>
                        <List>
                            {items.map(item => {
                                return renderItem(item);
                            })}
                        </List>
                    </Content>
                </Container>
                <Button title="Send" color='#0D47A1' onPress={async ()=>{
                    let selectedMachines=items.filter((i) => i.selected);
                    let deviceUids=[];
                    let token = await getSavedToken();
                    for (let i = 0; i < selectedMachines.length; i++) deviceUids.push({deviceUid:selectedMachines[i].deviceUid});
                    //console.log(deviceUids)
                    let filesToSend=[];
                    filesToSend=route.params;
                    console.log("kk ", filesToSend);
                    //console.log(filesToSend)
                    //poziv rute agent/files/put
                    //u body ce ici deviceUids i filesToSend
                    try {
                        let response = await fetch(serverURL + "api/web/agent/files/put", {
                          method: "POST",
                          headers: {
                            "Content-type": "application/json; charset=UTF-8",
                            Accept: "text/html",
                            Authorization: "Bearer " + token,
                          },
                          body: JSON.stringify({
                            deviceUids: deviceUids,
                            files: filesToSend
                          }),
                        });
                        if (response.status == 400) {
                            var jsonResponse = await response.json();
                            if (jsonResponse.hasOwnProperty("error_id")) {
                              console.log("Zahtjev nije validan.");
                            }
                          } else if (response.status == 200) {
                            alert("Uspjesno poslano!");
                            console.log(deviceUids);
                        } else if (response.status == 300) {
                          alert("Folder nije validan");
                        } else if (response.status == 400) {
                            alert("Pogrešan zahtjev")
                        } else if (response.status == 403) {
                          //invalid token, trebalo bi dobaviti novi
                        } else if (response.status == 404) {
                          alert("File nije pronadjen");
                        } else {
                          console.log("Promijenjen JSON zahtjeva?");
                          alert("Greska pri slanju datoteke");                      
                          console.log(response.status);
                        }
                      } catch (error) {
                        console.log(error);
                      }
                }}></Button>
            </Root>
        </>
    );
}


const styles = StyleSheet.create({
    selected: {
        backgroundColor: 'lightblue',
        marginLeft: 0,
        paddingLeft: 18,
    },
    photo: {
        height: 50,
        width: 50,
    },
    title: {
        fontSize: 16,
        color: 'black',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
        color: '#0D47A1',
        fontWeight: 'bold',
    },
    normal: {},
});