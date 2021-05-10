import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ListViewVertical from '../components/ListViewVertical';
import {serverURL} from "../../../appConfig";
import {AuthContext} from '../../../contexts/authContext';
import {userContext} from '../../../contexts/userContext';
import {Provider} from 'react-native-paper';

var image_url = "https://static.thenounproject.com/png/59103-200.png";

export default function App({route, navigation }) {
  
  const [oldPath, setOldPath] = React.useState(false);
  const [isDirectory, setIsDirectory] = React.useState(false);
  const [action, setAction] = React.useState(false);
  var [files, setFiles] = useState([]);
  var { getSavedToken } = React.useContext(AuthContext);
  var username = React.useContext(userContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Nova lokacija"
    });
  }, [navigation]);
  
  useEffect(() => {
    const { oldPath } = route.params;
    const { isDirectory } = route.params;
    const { action } = route.params;
    setOldPath(oldPath);
    setIsDirectory(isDirectory);
    setAction(action);

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
      if(response.status === 200) {
        var jsonResponse = await response.json();

        var jsonResponseArray = jsonResponse['children'];
        var newDataSet = [];
        for (let i = 0; i < jsonResponseArray.length; i++) {
          let file = jsonResponseArray[i];
          let correctZoneBirthtime = new Date(file['birthtime']);
          newDataSet.push({ name: file['name'], id: (i + 1).toString(), image_url: image_url, type: file['type'], path: file['path'], oldPath: oldPath, birthtime: correctZoneBirthtime });
          if(file['type'] === 'directory') {
            newDataSet[newDataSet.length - 1]['children'] = file['children'];
          }
        }
        setFiles(newDataSet);
      }
      else if(response.status === 503) {
        alert("Servis nedostupan");
      }
      else if(response.status === 403) {
        //invalid token, trebalo bi dobaviti novi
      }
      else {
        console.log("Status" + response.status)
        console.log("Promijenjen JSON zahtjeva?");
        alert("Greska pri dobavljanju liste datoteka");
      }
    }

    try{
      getFiles();
    }catch(e){
      console.log(e);
    }
  }, [])

  return (
    <Provider>
      <View style={styles.container}>
        <ListViewVertical
          itemList={files}
          folderPath={null}
          isDirectory={isDirectory}
          action={action}
          showAdditionalOptions = {false}
        />
        {<TouchableOpacity onPress={async () => {
              let token = await getSavedToken();
              let pathFragments = oldPath.split("/");
              let fileName = pathFragments[pathFragments.length - 1];
              let extractedOldPath = oldPath;
              let newDirPath = "";
              if(!isDirectory)
                  extractedOldPath = pathFragments.slice(0, pathFragments.length - 1).join("/");
              else {
                  newDirPath = fileName;
                  fileName = "";
              }  
              extractedOldPath = extractedOldPath.split("allFiles/" + username + "/")[1];
              if(extractedOldPath == undefined) 
                extractedOldPath = "";

              await copyOrMove(token, username, fileName, extractedOldPath, newDirPath, navigation, action);
          }}>
          <Text style={styles.confirmNewLocation}>Odaberi</Text>
        </TouchableOpacity> }
      </View>
    </Provider>
    
  );
}

async function copyOrMove(token,username,name,oldPath,newPath,navigation,action) {
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
    if(response.status === 400) {
        var jsonResponse = await response.json();
        if(jsonResponse.hasOwnProperty('error_id')) {
          //alert("Datoteka/Folder ne postoji!");
          console.log("Zahtjev nije uredu");
        }
       
    }
    else if(response.status === 200) {
      alert("Uspjesan copy/move");
      navigation.navigate("FileManager");
    }
    else if(response.status === 403) {
      alert("Invalid JWT token");
    }
    else if(response.status === 403) {
      //invalid token, trebalo bi dobaviti novi
    }
    else if(response.status === 404) {
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
