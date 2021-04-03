import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Alert, TouchableOpacity, Card, Button } from 'react-native';
import { useEffect, useState } from 'react'
import ListViewVertical from '../components/ListViewVertical';
import { serverURL } from "../../../appConfig";
import { AuthContext } from '../../../contexts/authContext';

var image_url = "https://static.thenounproject.com/png/59103-200.png";

export default function App({ navigation }) {
  
  var [files, setFiles] = useState([]);
  var { getSavedToken } = React.useContext(AuthContext);
  useEffect(() => {
    async function getFiles() {
      let token = await getSavedToken();
      console.log('Token je: ' + token);
      const response = await fetch(serverURL + "api/web/user/fileList", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "text/html",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          user: "osoba4@email.com"
        }),
      });
      var jsonResponse = await response.json();
  
      var jsonResponseArray = jsonResponse['children'];
      var newDataSet = [];
      for (let i = 0; i < jsonResponseArray.length; i++) {
        let file = jsonResponseArray[i];
        newDataSet.push({ name: file['name'], id: (i + 1).toString(), image_url: image_url });
      }
      setFiles(newDataSet);
    }
    try{
      getFiles();
    }catch(e){
      console.log(e);
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Files</Text>
      </View>
      <ListViewVertical
        itemList={files}
      />
    </View>
  );
}

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
