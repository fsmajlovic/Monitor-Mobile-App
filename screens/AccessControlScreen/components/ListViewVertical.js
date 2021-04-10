import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text, Button } from 'react-native';
import ListItemVertical from './ListItemVertical';
import { AuthContext } from "../../../contexts/authContext";
import { userContext } from '../../../contexts/userContext';
import SelectionListHeader from './SelectionListHeader';
import { downloadFile, renameFileFolder,copyFileFolder,moveFileFolder } from './ListItemVertical'
import Dialog from "react-native-dialog";


import {
    List,
    Content,
    Container,
    Root,
} from 'native-base';

var image_source_folder = '../../../assets/file-icon.jpg';
var image_source_data = '../../../assets/paper-icon.png';
var image_icon = '';

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

export default function ListViewVertical({ itemList }) {
    var { getSavedToken } = React.useContext(AuthContext);
    var username = React.useContext(userContext);
    const navigation = useNavigation();
    const [items, setItems] = useState(itemList);
    const selectionMode = useSelectionChange(items);
    const [visible, setVisible] = useState(false);
    //varijable potrebne za rename
    const [fileName, setFileName] = useState("");
    const [newFilename, setNewFileName] = useState(fileName);
    const [path, setPath] = useState("");
    //console.log(items);

    useEffect(() => { setItems(itemList) });




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

    const onPress = async item => {
        if (selectionMode) {
            toggleSelect(item);
        } else {
            //zasad se na klik na folder/file poziva ili download ili rename
            //ovo je za rename
            //setFileName(item.name);
            //setNewFileName(item.name);
            //setPath(item.path);
            //showDialog()

            //ovo je za download
            let token = await getSavedToken();
            downloadFile(token, username, item.path, item.name, item.type, item.children, navigation);
        }
    };

    const onLongPress = item => {
        if (selectionMode === false) {
            toggleSelect(item);
        }
    };

    //3 funkcije za rename Dialog
    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOK = async () => {
        let token = await getSavedToken();
        renameFileFolder(token, username, path, fileName, newFilename);
        setVisible(false);
    };

    const renderItem = item => {
        return (
            <TouchableOpacity
                onPress={() => onPress(item)}
                onLongPress={() => onLongPress(item)}
                key={item.id}
                style={[item.selected ? styles.selected : styles.normal]}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../../../assets/file-icon.jpg')}
                        style={styles.photo}
                    />
                    <View style={styles.container_text}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };



    return (
        <>
            <Root>
                <Container>
                    <SelectionListHeader
                        selectionMode={selectionMode}
                        title="Files"
                        selectedItemsCount={items.filter(i => i.selected).length}
                        clearSelection={clearSelection}
                        selectActions={[
                            {
                                name: 'Copy',
                                method: function () {
                                    //let token = await getSavedToken();

                                    //ovdje treba ponuditi listu foldera za  odabir
                                    // u koji cemo folder kopirati i tu cemo uzeti new path
                                    //tako isto i za move
                                



                                    if (selectedItemsCount==1){
                                   // copyFileFolder(token,username,items[0].name,items[0].path,newPath)
                                    }

                                    clearSelection();
                                },
                            },
                            {
                                name: 'Move',
                                method: function () {
                                   // let token = await getSavedToken();

                                    //moveFileFolder(token,username,naziv,oldPath,newPath)



                                    clearSelection();
                                }

                            },
                            {
                                name: 'Delete',
                                method: function () {
                                    clearSelection();
                                },
                            },
                            {
                                name: 'Download',
                            },
                            {
                                name: 'Send',
                            },
                            {
                                name: 'Cancel',                                
                            },
                        ]}
                    />
                    <Content>
                        <List>
                            {items.map(item => {
                                return renderItem(item);
                            })}
                        </List>
                    </Content>
                </Container>
            </Root>

            <Dialog.Container visible={visible}>
                <Dialog.Title>Rename</Dialog.Title>
                <Dialog.Description>
                    Enter new name
                </Dialog.Description>
                <Dialog.Input
                    value={newFilename}
                    onChangeText={text => setNewFileName(text)}
                >
                </Dialog.Input>
                <Dialog.Button label="Cancel" onPress={handleCancel} />
                <Dialog.Button label="OK" onPress={handleOK} />
            </Dialog.Container>

        </>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    selected: {
        backgroundColor: 'lightblue',
        marginLeft: 0,
        paddingLeft: 18,
    },
    normal: {},
    container: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: "#FFF",
        elevation: 2,
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: "#0D47A1",
        fontWeight: "bold",
    },
    container_text: {
        flex: 1,
        flexDirection: "column",
        marginLeft: 12,
        justifyContent: "center",
    },
    description: {
        fontSize: 11,
        fontStyle: "italic",
    },
    photo: {
        height: 50,
        width: 50,
    },
    containerDialog: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});