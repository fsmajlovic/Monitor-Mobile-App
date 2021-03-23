import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import {AuthContext} from '../../contexts/authContext';
import { DeviceContext } from '../../contexts/DeviceContext';
import ListView from '../ReportScreen/components/ListView';

export default function HomeScreen({navigation}) {
   const {signOut} = React.useContext(AuthContext);
   const { activeDevices } = useContext(DeviceContext);

    return(
        <View 
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} 
        >
        <ListView
          itemList={activeDevices}
          navigation={navigation}
        />
        
        <Button
        title={'LogOut'}
        onPress={() => {signOut()}}
         />


        </View>
      );
}