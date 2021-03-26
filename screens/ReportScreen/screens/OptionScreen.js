import React, { useContext } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';


const OptionScreen = ({ navigation }) => {

    const { activeDevice } = useContext(DeviceContext);
    return (
        <View>
            <Text style={styles.device}>{activeDevice.name}</Text>
            <Button color="#0D47A1" title="Access control" onPress={() => { navigation.push('AccessControl') }}></Button>
            <Button color="#0D47A1" title="Console" onPress={() => { navigation.push('Console') }}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    device: {
        margin: 10,
        marginBottom: 20,
        color: '#464646',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#0D47A1',
        textAlign: 'center',
        padding: 10,
        fontSize: 18
    }
});

export default OptionScreen;