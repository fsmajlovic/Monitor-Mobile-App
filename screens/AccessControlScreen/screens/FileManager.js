import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react'
import ListViewVertical from '../components/ListViewVertical';
import { serverURL } from "../../../appConfig";
import { AuthContext } from '../../../contexts/authContext';
import {userContext} from '../../../contexts/userContext';
import { Provider } from 'react-native-paper';
 
var image_url = "https://static.thenounproject.com/png/59103-200.png";
 
export default function App({ navigation }) {
 
  var [files, setFiles] = useState([]);
  var { getSavedToken } = React.useContext(AuthContext);
  var username = React.useContext(userContext);
 
  React.useEffect(() => {
    const loadFiles = navigation.addListener('focus', () => {
      getFiles();
    });
 
    return loadFiles;
  }, [navigation])
 
  async function getFiles() {
    let token = await getSavedToken();
    console.log('Token je: ' + token);
    const response = await fetch(serverURL + "api/web/user/file-tree", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        user: username
      }),
    });
    if(response.status == 200) {
      var jsonResponse = await response.json();
 
      var jsonResponseArray = jsonResponse['children'];
      var newDataSet = [];
      for (let i = 0; i < jsonResponseArray.length; i++) {
        let file = jsonResponseArray[i];
        let correctZoneBirthtime = new Date(file['birthtime']);
        newDataSet.push({ name: file['name'], id: (i + 1).toString(), image_url: image_url, type: file['type'], path: file['path'], oldPath: null, birthtime: correctZoneBirthtime, extension: file['extension'] });
        if(file['type'] == 'directory') {
          newDataSet[newDataSet.length - 1]['children'] = file['children'];
        }
      }
      setFiles(newDataSet);
    }
    else if(response.status == 503) {
      alert("Servis nedostupan");
    }
    else if(response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    }
    else {
      //console.log("Promijenjen JSON zahtjeva?");
      alert("Greska pri dobavljanju liste datoteka");
    }
  }
 
  return (
    <Provider>
      <View style={styles.container} testID="FM_ID">
        <ListViewVertical
          itemList={files}
          folderPath = {"allFiles/"+username + "/"}
          showAdditionalOptions = {true}
        />
      </View>
    </Provider>
 
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