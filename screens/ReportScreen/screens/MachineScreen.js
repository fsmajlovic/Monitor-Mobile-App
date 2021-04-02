import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Text, View, Button, StyleSheet} from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import { machineURL } from '../../../appConfig'
import axios from 'axios';
import { AuthContext } from '../../../contexts/authContext';


const MachineScreen = ({navigation}) => {
    const { currentDevice, addActiveDevice, setTaskList } = useContext(DeviceContext); 
    const { getSavedToken } = useContext(AuthContext);

    useEffect(() => {
      updateTaskList();
    }, [])

  const updateTaskList = async () => {
    try {
      let token = await getSavedToken();
      let response = await axios.get(machineURL + `UserTasks/Device/${currentDevice.deviceId}`, { // Lista taskova
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      )
      setTaskList(response.data.data)
    } catch (e) {
      console.log("Greška")
    }
  }

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