import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import { machineURL } from '../../../appConfig';
import { AuthContext } from '../../../contexts/authContext';

const Item = ({ name }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
    </View>
);

const ComponentView = (props) => {
    const [components, setComponents] = useState([]);
    const { getSavedToken } = useContext(AuthContext);
    const { task } = props.route.params;

    useEffect(() => {
        async function getData(getSavedToken) {
            let token = await getSavedToken();
            fetch("https://si-2021.167.99.244.168.nip.io/api/Components/" + task.taskId, {
                method: 'GET',
                headers: { "Authorization": "Bearer " + token },
            }).then((response) => {
                return response.json();
            }).then((responseJson) => {
                setComponents(responseJson.data);

            })

        }
        getData(getSavedToken);
    }, [])

    const renderItem = ({ item }) => (
        <Item name={item.name} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={components}
                renderItem={renderItem}
                keyExtractor={item => item.componentId.toString()}
            />
            <TouchableOpacity onPress={() => props.navigation.push('AddComponent', { task: task })}>
                <View style={styles.containerButton}>
                    <Text style={styles.button}>Add part</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    editButton: {
        paddingRight: 12,
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    containerButton: {
        justifyContent: 'center',
        backgroundColor: "#0D47A1",
        height: 40,
        width: 250,
        margin: 10,
        borderRadius: 30,
        paddingHorizontal: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    button: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",

    },
    description: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 25,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: "#78a3f3",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
        width: 250
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
    },
})

export default ComponentView;
