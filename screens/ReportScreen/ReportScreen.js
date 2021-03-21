import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Button, View } from 'react-native';
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


  return (
    <View style={styles.container}>
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
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    elevation: 2,
  }
});

export default ReportScreen;
