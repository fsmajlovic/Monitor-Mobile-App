import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import { activeMachineURL } from '../../../appConfig'
import axios from 'axios';
import { AuthContext } from '../../../contexts/authContext';
import { userContext } from '../../../contexts/userContext';




const MachineScreen = ({navigation}) => {
    const { currentDevice, addActiveDevice } = useContext(DeviceContext);
    const { getSavedToken } = useContext(AuthContext);
    var username = useContext(userContext);


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
        <View style={styles.container} testID={"machinescreen"}>
            <Text style={styles.title}> { currentDevice.name } </Text>
            <Text> { currentDevice.location } </Text>

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
