import React from 'react'
import { StyleSheet,View, ActivityIndicator } from 'react-native';

export default function LoadingScreen() {
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
             <ActivityIndicator size="small" color="#787878"/>
        </View>
      );
}