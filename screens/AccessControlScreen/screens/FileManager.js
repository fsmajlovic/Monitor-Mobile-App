import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Alert,TouchableOpacity,Card,Button } from 'react-native';
import {useEffect, useState} from 'react'
import ListViewVertical from '../components/ListViewVertical';

var image_url = "https://static.thenounproject.com/png/59103-200.png";

export default function App({navigation}) { 
  const dataSet = [
    { name: 'File 1', id: '1', image_url: image_url },
    { name: 'File 2', id: '2', image_url: image_url },
    { name: 'File 3', id: '3', image_url: image_url },
    { name: 'File 4', id: '4', image_url: image_url },
    { name: 'File 5', id: '5', image_url: image_url },
    { name: 'File 6', id: '6', image_url: image_url },
    { name: 'File 7', id: '7', image_url: image_url },
    { name: 'File 8', id: '8', image_url: image_url },
    { name: 'File 9', id: '9', image_url: image_url },
    { name: 'File 10', id: '10', image_url: image_url },
  ];

return( 
  <View style={styles.container}>
    <View style={{alignItems: 'center'}}>
      <Text style={styles.text}>Files</Text>
    </View>
      <ListViewVertical
        itemList={dataSet}
      />       
  </View>
);}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },

  text: {
    fontSize: 20,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
    color: '#0D47A1',
  },

  items: {
    padding: 20,
    marginTop: 4,
    borderBottomColor: "#bababa",
    borderRadius: 10,
    borderBottomWidth: 1,
    fontSize: 16,
    marginHorizontal: 20,
    alignSelf: "center",
    marginRight: 10
  }

});
