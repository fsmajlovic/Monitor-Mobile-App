import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import { activeMachineURL, machineURL } from '../../../appConfig'
import axios from 'axios';
import { AuthContext } from '../../../contexts/authContext';
import {userContext} from '../../../contexts/userContext';




const MachineScreen = ({navigation}) => {
    const { currentDevice, addActiveDevice, setTaskList } = useContext(DeviceContext); 
    const { getSavedToken } = useContext(AuthContext);
    var username = React.useContext(userContext);
  //   useEffect(() => {
  //     updateTaskList();
  //   }, [])

  // const updateTaskList = async () => {
  //   try {
  //     let token = await getSavedToken();
  //     let response = await axios.get(machineURL + `UserTasks/Device/${currentDevice.deviceId}`, { // Lista taskova
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //     }
  //     )
  //     setTaskList(response.data.data)
  //   } catch (e) {
  //     console.log("Greška")
  //   }
  // }

  const activateDevice = async () => {
    try {
      let token = await getSavedToken();
      let response = await axios.post(activeMachineURL + "agent/connect", {
        body: {
          deviceUid: currentDevice.deviceUid,
          user: username
        }
      },
      { 
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }
      )
    } catch (e) {
      console.log(e)
    }
  }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> { currentDevice.name } </Text>
            <Text> { currentDevice.location } </Text>
            <TouchableOpacity onPress={() => navigation.push('ImageUploadScreen')}>
              <View style={styles.containerButton}>
                <Text style={styles.button}>Upload pictures</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress = {async () => {
              await activateDevice()
              addActiveDevice(currentDevice)
              }}>
              <View style={styles.containerButton}>
                <Text style={styles.button}>Activate machine</Text>
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
    padding: 10
  },
  title: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontSize: 25,
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
})


export default MachineScreen;