import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import {AuthContext} from '../../contexts/authContext';

export default function HomeScreen({navigation}) {
   const {signOut} = React.useContext(AuthContext);

    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Button
        title={'LogOut'}
        onPress={() => {signOut()}}
      />
        </View>
      );
}