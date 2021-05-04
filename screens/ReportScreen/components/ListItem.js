import React from 'react';
import { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';

const styles = StyleSheet.create({
    container: {
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
    photo: {
        height: 50,
        width: 50,
    },
});

const ListItem = ({ item, navigation }) => {
    const { setCurrentDevice } = useContext(DeviceContext);
    return (
        <TouchableWithoutFeedback onPress={() => { navigation.push('MachineScreen'); setCurrentDevice(item) }}>
            <View style={styles.container} testID = {"listitem"}>
                <Image source={require('../../../assets/monitor-icon.gif')} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}> 
                        {item.name}
                    </Text>
                    <Text style={styles.description}>
                        {item.location}
                    </Text>
                    <Text style={styles.description}>
                        {new Date(item.lastTimeOnline).toGMTString()}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ListItem;