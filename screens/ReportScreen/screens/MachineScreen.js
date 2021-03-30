import React from 'react';
import { useContext } from 'react';
import { Text, View,Button} from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';


const MachineScreen = ({navigation}) => {
    const { currentDevice,addActiveDevice } = useContext(DeviceContext);
    return (
        <View>
            <Button 
              title='Upload slika'
              color='blue'
              onPress={()=>navigation.push('ImageUploadScreen')}
            ></Button>
            <Button
              title='Aktiviraj mašinu'
              color='red'
              onPress={()=>addActiveDevice(currentDevice)}
            >
            </Button>
        </View>
    )
}


export default MachineScreen;