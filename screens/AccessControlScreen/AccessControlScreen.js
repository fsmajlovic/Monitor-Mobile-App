import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import {AuthContext} from '../../contexts/authContext';
import {serverURL} from '../../appConfig';
import axios from 'axios'
 
var loadedImageUri = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'; 
var currentUri = ' ';
var base64Icon = 'data:image/png;base64,';


async function postScreenshot(token) {
  console.log("token je "+token)
  try {
    let response = await fetch(serverURL + "api/screenshot", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'text/html',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        name: 'DESKTOP-SCC',
        location: 'Sarajevo - SCC'
      })
    });
    var json = await response.json();
    base64Icon = "data:image/png;base64," + json["message"];
    //console.log("slika " + base64Icon);
  } catch (error) {
    console.error(error);
  }
};


export default function AccessControlScreen({navigation}) {
  let [image, setImage] = useState(' ');
  var {getSavedToken} = React.useContext(AuthContext);

  return(
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>AccessControl screen</Text>
      <Button title="Load Screenshot" onPress = {async () => {
        let token = await getSavedToken();
        //console.log(token);
        await postScreenshot(token);
    
        if(currentUri == ' ') {
          /* TODO: Load and set image uri/source from actual API - Group 4 */ 
          currentUri = base64Icon;
          setImage(currentUri);
        }
        else {
          currentUri = ' ';
          setImage(currentUri);
        }
      }}/>
      <Image source={{ uri: image }}
        style={{ width: 400, height: 200 }}
      />
    </View>
  );
}