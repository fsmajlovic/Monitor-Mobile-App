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
        backgroundColor: '#464646',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: 'white',
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
        color: '#cbbfa8',
    },
    photo: {
        height: 50,
        width: 50,
    },
});

const ActiveListItem = ({ item, navigation }) => {
    const { setActiveDevice, addActiveDevice } = useContext(DeviceContext);
    return (
        <TouchableWithoutFeedback onPress={() => { navigation.push('Options'); setActiveDevice(item); }}>
            <View style={styles.container}>
                <Image source={require('../../../assets/pc-icon.png')} style={styles.photo} />
                <View style={styles.container_text}>
                    <Text style={styles.title}>
                        {item.name}
                    </Text>
                    <Text style={styles.description}>
                        {item.lastTimeOnline}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default ActiveListItem;