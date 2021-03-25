import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, Image, ScrollView, TouchableOpacity } from 'react-native';
import {AuthContext} from '../../contexts/authContext';
import {serverURL} from '../../appConfig';
import axios from 'axios'
import ListView from './components/ListView';
var loadedImageUri = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350'; 
var currentUri = ' ';
var base64Icon = 'data:image/png;base64,';
var image_url = "https://cdn3.iconfinder.com/data/icons/brands-applications/512/File-512.png";

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
  const dataSet = [
    { name: 'Prvi fajl tutorijal', id: '1', image_url: image_url },
    { name: 'Drugi fajl', id: '2', image_url: image_url },
    { name: 'Treci fajl pdf', id: '3', image_url: image_url },
    { name: 'Cetvrti fajl', id: '4', image_url: image_url },
    { name: 'Peti fajl', id: '5', image_url: image_url },
    
  ];

  return(
  //   <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //     <Text>AccessControl screen</Text>
  //     <Button title="Load Screenshot" onPress = {async () => {
  //       let token = await getSavedToken();
  //       //console.log(token);
  //       await postScreenshot(token);
    
  //       if(currentUri == ' ') {
  //         /* TODO: Load and set image uri/source from actual API - Group 4 */ 
  //         currentUri = base64Icon;
  //         setImage(currentUri);
  //       }
  //       else {
  //         currentUri = ' ';
  //         setImage(currentUri);
  //       }
  //     }}/>
  //     <Image source={{ uri: image }}
  //       style={{ width: 400, height: 200 }}
  //     />
  //   </View>
  // );

  <View style={styles.container}>
      <View  style={styles.listView}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={() => navigation.push('FileManager')}>
          <Text style={styles.text}>Files</Text>
          </TouchableOpacity>

          <ListView 
            itemList={dataSet}
          />

        </ScrollView>

      </View>

      <View>
        <TouchableOpacity onPress={async () => {
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
      }}>
          
          
        <Text style={styles.loadScreenshotText}>Load Screenshot</Text></TouchableOpacity>
      </View>
      <View>
        <Image  source={{ uri: image }}
          style={styles.imageView}
        />
      </View>
      </View>
  ); 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    //alignItems: 'center',
    justifyContent: 'center',
   // marginTop: 30,
    padding: 10,
    marginTop: 40

  },
  listView: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
    
  },
  scrollView: {
    marginLeft: 6
  },
  loadScreenshotText: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center"
  },
  imageView: {
    width: 400, 
    height: 400,
    borderRadius: 16,
    alignSelf: "center",
    marginTop: 20
  }

});


