import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';


const OptionScreen = ({ navigation }) => {

    const { activeDevice } = useContext(DeviceContext);
    return (
        <View>
            <Text>{activeDevice.name}</Text>
            <Button title="Access control" onPress={() => { navigation.push('AccessControl') }}></Button>
            <Button title="Console" onPress={() => { navigation.push('Console') }}></Button>
        </View>
    )
}

export default OptionScreen;