import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react'
import {AuthContext} from '../../contexts/authContext';
import {serverURL} from '../../appConfig';
import ListView from './components/ListView';
import ListViewVertical from './components/ListViewVertical';
import { DeviceContext } from '../../contexts/DeviceContext';
import { useContext } from 'react';
import {userContext} from '../../contexts/userContext';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

var currentUri = ' ';
var image_url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXv3SprlcGxiV_248M-azw5lTzEYLKHXU5w&usqp=CAU';
var buttonPressed = false;
var base64Icon = '';

async function postScreenshot(token, id, username) {

  console.log("uid je " + id);
  console.log("token je "+token)
  try {
    let response = await fetch(serverURL + "api/agent/screenshot", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'text/html',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        deviceUid: id,
        user: username
      })
    });

    if(response.status == 200) {
      var json = await response.json();
      base64Icon = json["message"];
      buttonPressed = true;
      //console.log("slika " + base64Icon);
    }
    else if(response.status == 503) {
      alert("Servis nedostupan");
    }
    else if(response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    }
    else if(response.status == 404) {
      alert("Masina nije spojena sa serverom");
    }
    else {
      console.log("Promijenjen JSON zahtjeva?");
      alert("Greska pri dobavljanju screenshota");
    }
  } catch (error) {
    console.error(error);
  }
};


export default function AccessControlScreen({navigation}) {
  let [image, setImage] = useState(' ');
 
let openShareDialogAsync = async () => {
  if (!(await Sharing.isAvailableAsync())) {
    alert(`Sharing isn't available on your platform`);
    return;
  }

  await Sharing.shareAsync(expoFileLocation);
};



expoFileLocation = "";
fileData = "";
fileName = "";
async function saveToExpoFileSystem() {
  fileData = base64Icon;
  fileName = "screenshot.jpg";
  expoFileLocation = FileSystem.documentDirectory + fileName;
  FileSystem.writeAsStringAsync(expoFileLocation, fileData, {
    encoding: FileSystem.EncodingType.Base64
  }).catch((error) => {
    console.log(error);
  });
}


  var {getSavedToken} = React.useContext(AuthContext);
  const { activeDevice } = useContext(DeviceContext);
  const [id, setId] = useState(activeDevice.deviceUid);

  const dataSet = [
    { name: 'File 1', id: '1', image_url: image_url },
    { name: 'File 2', id: '2', image_url: image_url },
    { name: 'File 3', id: '3', image_url: image_url },
    { name: 'File 4', id: '4', image_url: image_url },
    { name: 'File 5', id: '5', image_url: image_url },
    
  ];
  var username = React.useContext(userContext);

  return(
  <View style={styles.container}>
    <View>
      <TouchableOpacity onPress={async () => {
       let token = await getSavedToken();
       await postScreenshot(token, id, username);
    
        if(currentUri == ' ') {
          currentUri = "data:image/png;base64," + base64Icon;
          setImage(currentUri);
        }
        else {
          currentUri = ' ';
          buttonPressed = false;
          setImage(currentUri);
        }
      }}>
      <Text style={styles.loadScreenshotText}>Load Screenshot</Text></TouchableOpacity>
    </View>
    <View style={{alignItems: 'center'}}>
      <Image  source={{ uri: image }}
        style={styles.imageView}
      />
    </View>
   <View>
     { buttonPressed && <TouchableOpacity onPress={async () => {
       await saveToExpoFileSystem()
       await openShareDialogAsync()
       }}>
        <Text style={styles.loadScreenshotText}>Share Screenshot</Text>
      </TouchableOpacity> }
   </View>
    
  </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    flex: 1,
  },
  listView: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    color: '#0D47A1',
    fontWeight: 'bold'
    
  },
  loadScreenshotText: {
    backgroundColor: "#0D47A1",
    color: 'white',
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center"
  },
  imageView: {
    marginTop: 20,
    width: 350,
    height: 200,
    borderRadius: 150 / 9,
    borderWidth: 3,
    borderColor: "#0D47A1",
  },

});
