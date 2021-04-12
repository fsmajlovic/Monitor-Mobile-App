import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, Alert, TouchableOpacity, Card, Button } from 'react-native';
import { useEffect, useState } from 'react'
import ListViewVertical from '../components/ListViewVertical';
import { serverURL } from "../../../appConfig";
import { AuthContext } from '../../../contexts/authContext';
import {userContext} from '../../../contexts/userContext';

var image_url = "https://static.thenounproject.com/png/59103-200.png";

export default function App({ route, navigation }) {
  var [files, setFiles] = useState([]);
  var [dirName, setDirName] = useState([]);
  var [copyFrom, setCopyFrom] = useState([]);
  var [currentDirPath, setCurrentDirPath] = useState([]);
  var [isDirectory, setIsDirectory] = useState([]);
  var [actionCopyMove, setActionCopyMove] = useState([]);
  var { getSavedToken } = React.useContext(AuthContext);
  var username = React.useContext(userContext);

  useEffect(() => {
    var data = [];
    const { children } = route.params;
    const { path } = route.params;
    const { oldPath } = route.params;
    const { isDirectory } = route.params;
    const { action } = route.params;

    var pathFragments = path.split("/");
    setDirName(pathFragments[pathFragments.length - 1]);
    setCopyFrom(oldPath);
    var currentDir = path.split("allFiles/" + username + "/")[1];
    setCurrentDirPath(currentDir);
    setIsDirectory(isDirectory);
    setActionCopyMove(action);

    for (let i = 0; i < children.length; i++) {
        let file = children[i];
        data.push({ name: file['name'], id: (i + 1).toString(), image_url: image_url, type: file['type'], path: file['path'], oldPath: oldPath });
        if(file['type'] == 'directory') {
          data[data.length - 1]['children'] = file['children'];
        }
    }
    setFiles(data);
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Nova lokacija"
    });
  }, [navigation, dirName]);
  
  return (
    <View style={styles.container}>
      <ListViewVertical
          itemList={files}
          folderPath={null}
          isDirectory={isDirectory}
          action={actionCopyMove}
      />
      {<TouchableOpacity onPress={async () => {
              let token = await getSavedToken();
              let pathFragments = copyFrom.split("/");
              let fileName = pathFragments[pathFragments.length - 1];
              let extractedOldPath = copyFrom;
              let newDirPath = currentDirPath;
              if(!isDirectory)
                  extractedOldPath = pathFragments.slice(0, pathFragments.length - 1).join("/");
              else {
                  newDirPath += "/" + fileName;
                  fileName = "";
              }
              extractedOldPath = extractedOldPath.split("allFiles/" + username + "/")[1];
              if(extractedOldPath == undefined) extractedOldPath = "";
              await copyOrMove(token, username, fileName, extractedOldPath, newDirPath, navigation, actionCopyMove);
          }}>
          <Text style={styles.confirmNewLocation}>Odaberi</Text>
        </TouchableOpacity> }
    </View>
  );
}

async function copyOrMove(token,username,name,oldPath,newPath,navigation,action) {
  console.log("ACTION: " + action);
  console.log("NAME: " + name);
  console.log("OLDPATH: " + oldPath);
  console.log("NEWPATH: " + newPath);
  try {
    let response = await fetch(serverURL + "api/web/user/" + action, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPath: oldPath,
        newPath: newPath,
        name : name,
        user: username,
      }),
    });
    if(response.status == 400) {
        var jsonResponse = await response.json();
        if(jsonResponse.hasOwnProperty('error_id')) {
          //alert("Datoteka/Folder ne postoji!");
          console.log("Zahtjev nije uredu");
        }
       
    }
    else if(response.status == 200) {
      alert("Uspjesan copy/move");
      navigation.navigate("FileManager");
    }
    else if(response.status == 403) {
      alert("Invalid JWT token");
    }
    else if(response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    }
    else if(response.status == 404) {
      alert("Datoteka ne postoji");
    }
    else {
      console.log("Promijenjen JSON zahtjeva?");
    }
    
  } catch (error) {
    console.log(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  },

  confirmNewLocation: {
    backgroundColor: "#0D47A1",
    color: 'white',
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    fontSize: 20,
    textAlign: "center"
  }

});
