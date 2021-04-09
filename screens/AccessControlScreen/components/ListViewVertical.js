import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import ListItemVertical from './ListItemVertical';
import { AuthContext } from "../../../contexts/authContext";
import { userContext } from '../../../contexts/userContext';
import SelectionListHeader from './SelectionListHeader';
import { downloadFile } from './ListItemVertical'


import {
    List,
    Content,
    Container,
    Root,
} from 'native-base';

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
            
            let token = await getSavedToken();
            downloadFile(token, username,item.path, item.name, item.type,  item.children,navigation);
        }
    };

    const onLongPress = item => {
        if (selectionMode === false) {
            toggleSelect(item);
        }
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
                        source={require("../../../assets/file-icon.jpg")}
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
                                name: 'Delete',
                                method: function () {
                                    clearSelection();
                                },
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    selected: {
        backgroundColor: 'lightgray',
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
});