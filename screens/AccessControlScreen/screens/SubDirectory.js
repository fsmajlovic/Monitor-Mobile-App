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
  var [folderName, setFolderName] = useState([]);
  var { getSavedToken } = React.useContext(AuthContext);
  var username = React.useContext(userContext);

  useEffect(() => {
    var data = [];
    const { children } = route.params;
    const { path } = route.params;
    setFolderName(path)
    var pathFragments = path.split("/");
    setDirName(pathFragments[pathFragments.length - 1]);

    for (let i = 0; i < children.length; i++) {
        let file = children[i];
        let birthtime = file['birthtime'].split("T");
        let dateTime = birthtime[0] + "\n" + birthtime[1];
        data.push({ name: file['name'], id: (i + 1).toString(), image_url: image_url, type: file['type'], path: file['path'], oldPath: null, birthtime: dateTime, dateTimeFormat: file['birthtime'] });
        if(file['type'] == 'directory') {
          data[data.length - 1]['children'] = file['children'];
        }
    }
    setFiles(data);
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: dirName
    });
  }, [navigation, dirName]);
  
  return (
    <View style={styles.container}>
      <ListViewVertical
        itemList={files}
        folderPath = {folderName}
      />
    </View>
  );
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
  }

});
