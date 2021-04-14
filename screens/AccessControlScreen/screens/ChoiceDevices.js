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
import SelectionListHeader from '../components/SelectionListHeader';

const mockItems = [
    {
        id: '1',
        name: 'masina 1',
    },
    {
        id: '2',
        name: 'masina 2',
    },
    {
        id: '3',
        name: 'masina 3',
    },
    {
        id: '4',
        name: 'masina 4',
    },
   
];

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

function Main() {
    const [items, setItems] = useState(mockItems);
    const selectionMode = useSelectionChange(items);

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
                key={item.id}
                style={[item.selected ? styles.selected : styles.normal]}>
                <Image source={require('../../../assets/monitor-icon.gif')} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                    <Text style={styles.description}>
                    {"lokacija"}
                    </Text>
                    <Text style={styles.description}>
                        {"last time online"}
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
                <Button title="Send" color='#0D47A1'></Button>
            </Root>
        </>
    );
}

export default Main;

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