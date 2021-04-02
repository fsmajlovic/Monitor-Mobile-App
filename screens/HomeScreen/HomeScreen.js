import React, { useContext } from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {AuthContext} from '../../contexts/authContext';
import { DeviceContext } from '../../contexts/DeviceContext';
import ActiveListItem from '../ReportScreen/components/ActiveListItem';
import ActiveListView from '../ReportScreen/components/ActiveListView';


export default function HomeScreen({navigation}) {
   const {signOut} = React.useContext(AuthContext);
   const { activeDevices } = useContext(DeviceContext);

    return(
        <View 
        style={{flex: 1}}  
        >
        <Text style={{alignSelf: 'center', color: 'black', fontSize: 35}}>Connected</Text>
        <Text style={{alignSelf: 'center', color: '#0D47A1', fontSize: 25, fontWeight: 'bold'}}>IWMs</Text>
        <FlatList style={{ flex: 1 }}
          keyExtractor={(item) => item.deviceId.toString()}
          data={activeDevices}
          renderItem={({ item }) => <ActiveListItem
            item={item}
            navigation={navigation}
          />}
        />
        
        <Button
        title={'LogOut'}
        color='#0D47A1'
        onPress={() => {signOut()}}
         />


        </View>
      );
}