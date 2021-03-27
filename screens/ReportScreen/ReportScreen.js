import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Button, View, FlatList, ActivityIndicator, Text } from 'react-native';
import ListView from './components/ListView';
import ListItem from './components/ListItem';
import StatisticsView from './components/StatisticsView';
import { AuthContext } from '../../contexts/authContext';
import { useContext } from 'react';
import { DeviceContext } from '../../contexts/DeviceContext';
import axios from 'axios';


const ReportScreen = ({ navigation }) => {
  const [state, setState] = useState(-1);
  const { getSavedToken } = React.useContext(AuthContext);
  const { setDevices, devices, page, setPage, loadMore, loading, setLoading } = useContext(DeviceContext);


  useEffect(() => {
    setLoading(true);
    async function getData(getSavedToken) {
      let token = await getSavedToken();
      fetch(`https://si-2021.167.99.244.168.nip.io/api/device/AllDevicesForGroup?page=${page}&per_page=10&name=&status=active&groupId=17`, {
        method: 'GET',
        headers: { "Authorization": "Bearer " + token },
      }).then((response) => {
        return response.json();
      }).then((responseJson) => {
        setDevices(devices.concat(responseJson.data));
        setLoading(false);
      }).catch((error) => {
        console.error(error);
      });
    }
    getData(getSavedToken);
  }, [page]);



  return (

    <View style={styles.container}>
      <Text style={{flex: 0.1, alignSelf: 'center', color: 'white', fontSize: 35}}>Available</Text>
      <Text style={{flex: 0.1, alignSelf: 'center', color: '#E50914', fontSize: 25, fontWeight: 'bold'}}>IWMs</Text>
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
