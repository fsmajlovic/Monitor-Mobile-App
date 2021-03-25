import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Alert,TouchableOpacity,Card,Button } from 'react-native';
import {useEffect, useState} from 'react'
import ListViewVertical from '../components/ListViewVertical';

var image_url = "https://static.thenounproject.com/png/59103-200.png";

export default function App({navigation}) { 
  const dataSet = [
    { name: 'Prvi fajl tutorijal', id: '1', image_url: image_url },
    { name: 'Drugi fajl', id: '2', image_url: image_url },
    { name: 'Treci fajl pdf', id: '3', image_url: image_url },
    { name: 'Cetvrti fajl', id: '4', image_url: image_url },
    { name: 'Peti fajl', id: '5', image_url: image_url },
    
  ];

  return( 
  
 <View style={styles.container}>
<ScrollView style={styles.scrollView}>
  <Text style={styles.text}>Files</Text>
  <ListViewVertical
            itemList={dataSet}
          />       
  </ScrollView>

   </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    justifyContent: 'center',
   // marginTop: 30,
    padding: 10,
    marginTop: 40

  },

  text: {
    fontSize: 20,
    marginBottom: 5
  },

  items: {
   // backgroundColor: "pink",
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
