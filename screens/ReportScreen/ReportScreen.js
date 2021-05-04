import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import ListItem from './components/ListItem';
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import {machineURL, activeMachineURL} from '../../appConfig';
import axios from 'axios';


const ReportScreen = ({ navigation }) => {
  const [state, setState] = useState(-1);
  const { getSavedToken } = React.useContext(AuthContext);
  const { setDevices, devices, page, setPage, loadMore, loading, setLoading } = useContext(DeviceContext);

  function filterActive(activeMachines, allMachines) {
    return activeMachines ? activeMachines.filter((machine) => {
        const existingMachine = allMachines.find(({deviceUid}) => {
            return machine.deviceUid === deviceUid;
        });
        if (existingMachine) {
            machine.deviceId = existingMachine.deviceId;
            machine.lastTimeOnline = existingMachine.lastTimeOnline;
        }
        return existingMachine;
    }) : [];
  }

  useEffect(() => {
    async function getData(getSavedToken) {
      let token = await getSavedToken();
      fetch(machineURL + `device/AllDevices`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token },
      }).then((response) => {
        return response.json();
      }).then(async (responseJson) => {
        let allMachines = responseJson.data;
        let activeMachines = [];
        try{
          activeMachines = await axios.get(activeMachineURL+'agents/online',{
            headers:{
              'Authorization': `Bearer ` + token
               }
            });
        }catch(e){
          console.log(e)
        }
        console.log("AKTIVNA" + JSON.stringify(activeMachines.data))
        console.log("ALL MACHINES " + allMachines.data)
        setDevices(filterActive(activeMachines.data, allMachines));
      }).catch((error) => {
        console.error(error);
      });
    }
    getData(getSavedToken);
  }, []);


  return (

    <View style={styles.container} testID="view">
      <Text style={{alignSelf: 'center', color: 'black', fontSize: 35}}>Active</Text>
        <Text style={{alignSelf: 'center', color: '#0D47A1', fontSize: 25, fontWeight: 'bold'}}>IWMs</Text>
      <FlatList style={{flex: 1}}
            keyExtractor={(item) => item.deviceId.toString()}
            data={devices}
            renderItem={({ item }) => <ListItem
                item = {item}
                navigation={navigation}
            />}
            ListFooterComponent={
              loading ?
              <View>
                <ActivityIndicator/>
              </View> : null
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: 'white',
    elevation: 2,
  }
});

export default ReportScreen;
