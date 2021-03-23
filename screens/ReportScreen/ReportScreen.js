import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Button, View, Text } from 'react-native';
import ListView from './components/ListView';
import StatisticsView from './components/StatisticsView';
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import axios from 'axios';


const ReportScreen = ({ navigation }) => {
  const [state, setState] = useState(-1);
  const { getSavedToken } = React.useContext(AuthContext);
  const { setDevices, devices } = useContext(DeviceContext);

  useEffect(() => {
    async function getData(getSavedToken) {
      let token = await getSavedToken();
      fetch("https://si-2021.167.99.244.168.nip.io/api/device/AllDevices", {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token },
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        setDevices(responseJson.data);
      }).catch((error) => {
        console.error(error);
      });
    }
    getData(getSavedToken);
  }, []);


  return (
    
    <View style={styles.container}>
      <Text style={{flex: 0.08, alignSelf: 'center', color: 'white', fontSize: 35, }}>Available</Text>
      <Text style={{flex: 0.1, alignSelf: 'center', color: '#E50914', fontSize: 25, fontWeight: 'bold'}}>IWMs</Text>
      <ListView
        itemList={ devices }
        navigation={ navigation }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#121212',
    elevation: 2,
  }
});

export default ReportScreen;
