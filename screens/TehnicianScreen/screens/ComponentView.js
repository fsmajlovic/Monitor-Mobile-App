import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, FlatList, StatusBar } from 'react-native';
import { machineURL } from '../../../appConfig';
import { AuthContext } from '../../../contexts/authContext';

const Item = ({ name, type, quantity }) => (
    <View style={styles.container_text}>
        <Text style={styles.title}>
            { name }
        </Text>
        <Text style={styles.description}>
            { type }
        </Text>
        <Text style={styles.description}>
            Quantity: { quantity }
        </Text>
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
        <View style={ styles.containerItem }>
            <Item name={ item.name } quantity={ item.quantity } type={ item.type }  />
        </View>
    );

    return (
        <View style={styles.container} testID="flatList">
            <FlatList
                data={components}
                renderItem={renderItem}
                keyExtractor={item => item.componentId.toString()}
            />
            <View style={ styles.containerButton } testID="view">
                <TouchableOpacity testID="add" onPress={() => props.navigation.push('AddComponent', { task: task })}>
                    <View style={styles.containerButtonText}>
                        <Text style={styles.button}>Add part</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0,
    },
    containerButton: {
        alignItems: 'center'
    },  
    containerButtonText: {
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
    containerItem: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#D3D3D3',
        elevation: 2,
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
})

export default ComponentView;
