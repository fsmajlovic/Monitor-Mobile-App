import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ListViewVertical from '../components/ListViewVertical';

var image_url = "https://static.thenounproject.com/png/59103-200.png";

export default function App({ route, navigation }) {
  var [files, setFiles] = useState([]);
  var [dirName, setDirName] = useState([]);
  var [folderName, setFolderName] = useState([]);

  useEffect(() => {
    var data = [];
    const { children } = route.params;
    const { path } = route.params;
    setFolderName(path)
    var pathFragments = path.split("/");
    setDirName(pathFragments[pathFragments.length - 1]);

    for (let i = 0; i < children.length; i++) {
        let file = children[i];
        let correctZoneBirthtime = new Date(file['birthtime']);
        data.push({ name: file['name'], id: (i + 1).toString(), image_url: image_url, type: file['type'], path: file['path'], oldPath: null, birthtime: correctZoneBirthtime, extension: file['extension'] });
        if(file['type'] === 'directory') {
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
        showAdditionalOptions = {true}
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
