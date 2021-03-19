import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
 
var loadedImageUri = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'; 
var currentUri = '';
 
export default function AccessControlScreen({navigation}) {
  let [image, setImage] = useState(' ');
  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>AccessControl screen</Text>
      <Button title="Load Screenshot" onPress = {() => {
        if(currentUri == ' ') {
          /* TODO: Load and set image uri/source from actual API - Group 4 */ 
          currentUri = loadedImageUri;
          setImage(currentUri);
        }
        else {
          currentUri = ' ';
          setImage(currentUri);
        }
      }}/>
      <Image source={{ uri: image }}
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
}