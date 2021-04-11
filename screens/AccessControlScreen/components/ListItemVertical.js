import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";
import { AuthContext } from "../../../contexts/authContext";
import { userContext } from "../../../contexts/userContext";
import { serverURL } from "../../../appConfig";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

expoFileLocation = "";
fileData = "";
fileName = "";
navigationChoice = null;

async function getFile(name, token, username, path) {
  try {
    let response = await fetch(serverURL + "api/web/user/file/get", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        fileName: name,
        user: username,
        path: path,
      }),
    });
    if (response.status == 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error")) {
        alert("Datoteka ne postoji!");
      } else if (jsonResponse.hasOwnProperty("fileName")) {
        fileData = jsonResponse["base64"];
        fileName = jsonResponse["fileName"];
        await saveToExpoFileSystem();
        await copyFromExpoFSToLocalFS();
      }
    } else if (response.status == 503) {
      alert("Servis nedostupan");
    } else if (response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status == 404) {
      alert("Datoteka vise ne postoji");
    } else {
      console.log("Promijenjen JSON zahtjeva?");
      alert("Greska pri preuzimanju datoteke");
    }
  } catch (error) {
    console.log(error);
  }
}

async function rename(token, username, path, name, newName) {
  try {
    let response = await fetch(serverURL + "api/web/user/rename", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldName: name,
        newName: newName,
        user: username,
        path: path,
      }),
    });
    if (response.status == 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        //alert("Datoteka/Folder ne postoji!");
        console.log("Datoteka/Folder ne postoji!");
      }
    } else if (response.status == 503) {
      alert("Servis nedostupan");
    } else if (response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status == 404) {
      alert("Datoteka vise ne postoji");
    } else {
      console.log("Promijenjen JSON zahtjeva?");
      alert("Greska pri preuzimanju datoteke");
    }
  } catch (error) {
    console.log(error);
  }
}

async function move(token, username, name, oldPath, newPath) {
  try {
    let response = await fetch(serverURL + "api/web/user/move", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPath: oldPath,
        newPath: newPath,
        name: name,
        user: username,
      }),
    });
    if (response.status == 400) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        //alert("Datoteka/Folder ne postoji!");
        console.log("Zahtjev nije uredu");
      }
    } else if (response.status == 200) {
      alert("Uspjesno kopirano");
    } else if (response.status == 403) {
      alert("Invalid JWT token");
    } else if (response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status == 404) {
      alert("Datoteka ne postoji");
    } else {
      console.log("Promijenjen JSON zahtjeva?");
    }
  } catch (error) {
    console.log(error);
  }
}

async function copy(token, username, name, oldPath, newPath) {
  try {
    let response = await fetch(serverURL + "api/web/agent/copy", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPath: oldPath,
        newPath: newPath,
        name: name,
        user: username,
      }),
    });
    if (response.status == 400) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        //alert("Datoteka/Folder ne postoji!");
        console.log("Zahtjev nije uredu");
      }
    } else if (response.status == 200) {
      alert("Uspjesno kopirano");
    } else if (response.status == 403) {
      alert("Invalid JWT token");
    } else if (response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status == 404) {
      alert("Datoteka ne postoji");
    } else {
      console.log("Promijenjen JSON zahtjeva?");
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteFile(name, token, username, path) {
  console.log("brise se file")
  try {

    let response = await fetch(serverURL + "api/web/user/file/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        path: path,
        fileName: name,
        user: username,
      }),
    });
    if (response.status == 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        //alert("Datoteka/Folder ne postoji!");
        console.log("Datoteka ne postoji!");
      }
    } else if (response.status == 503) {
      alert("Servis nedostupan");
    } else if (response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status == 404) {
      alert("Datoteka vise ne postoji");
    } else {
      console.log("Promijenjen JSON zahtjeva?");
      alert("Greska pri brisanju datoteke");
    }
  } catch (error) {
    console.log(error);
  }
}


async function deleteFolder(name, token, username, path) {
  console.log("brise se folder")
  try {
    let response = await fetch(serverURL + "api/web/user/folder/delete", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        path: path,
        folderName: name,
        user: username,
      }),
    });
    if (response.status == 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        //alert("Datoteka/Folder ne postoji!");
        console.log("Folder ne postoji!");
      }
    } else if (response.status == 503) {
      alert("Servis nedostupan");
    } else if (response.status == 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status == 404) {
      alert("Datoteka vise ne postoji");
    } else {
      console.log("Promijenjen JSON zahtjeva?");
      alert("Greska pri brisanju foldera");
    }
  } catch (error) {
    console.log(error);
  }
}



async function saveToExpoFileSystem() {
  expoFileLocation = FileSystem.documentDirectory + fileName;
  FileSystem.writeAsStringAsync(expoFileLocation, fileData, {
    encoding: FileSystem.EncodingType.Base64,
  }).catch((error) => {
    console.log(error);
  });
}

async function copyFromExpoFSToLocalFS() {
  try {
    if (Platform.OS === "ios") {
      await Sharing.shareAsync(expoFileLocation);
    } else {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(expoFileLocation);
        await MediaLibrary.createAlbumAsync("Monitor-Downloads", asset, false);
        alert("Download finished");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
export async function downloadFile(token, username, path,name,type,children,oldPath,isDirectory,navigation){
  console.log(path)
  
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if(extractedPath == "") extractedPath = "/";
  if(type == 'file') {
    await getFile(name,token,username,extractedPath);
  }
  else if(type == 'directory') {
    if(oldPath == null)
      navigation.push("SubDirectory", {name: name, type: type, path: path, children: children, oldPath: oldPath});
    else
      navigation.push("ChoiceSubDirectory", {name: name, type: type, path: path, children: children, oldPath: oldPath, isDirectory: isDirectory});
  }
}

export async function renameFileFolder(token, username, path, name, newName) {
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if (extractedPath == "") extractedPath = "/";
  await rename(token, username, extractedPath, name, newName);
}

export async function deleteFileFolder(username, token, path, name, type) {
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if (extractedPath == "") extractedPath = "/";
  if (type == "file") {
    await deleteFile(name, token, username, extractedPath);
  } else if (type == "directory") {
    await deleteFolder(name, token, username, extractedPath);
  }
}

export async function copyFileFolder(token, username, name, oldPath, newPath) {
  console.log(oldPath + name + newPath);
  var extractedOldPath = oldPath.split("allFiles/" + username)[1];
  extractedOldPath = extractedOldPath.split(name)[0];
  if (extractedOldPath == "") extractedOldPath = "/";

  var extractedNewPath = newPath.split("allFiles/" + username)[1];
  extractedNewPath = extractedOldPath.split(name)[0];
  if (extractedNewPath == "") extractedNewPath = "/";

  await copy(token, username, name, extractedOldPath, extractedNewPath);
}

export async function moveFileFolder(token, username, name, oldPath, newPath) {
  console.log(oldPath + name + newPath);
  var extractedOldPath = oldPath.split("allFiles/" + username)[1];
  extractedOldPath = extractedOldPath.split(name)[0];
  if (extractedOldPath == "") extractedOldPath = "/";

  var extractedNewPath = newPath.split("allFiles/" + username)[1];
  extractedNewPath = extractedOldPath.split(name)[0];
  if (extractedNewPath == "") extractedNewPath = "/";

  await move(token, username, name, extractedOldPath, extractedNewPath);
}

export default function ListItemVertical({
  name,
  image_url,
  type,
  path,
  children,
}) {
  var { getSavedToken } = React.useContext(AuthContext);
  var username = React.useContext(userContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={async () => {
        let token = await getSavedToken();
        await downloadFile(
          token,
          username,
          path,
          name,
          type,
          children,
          navigation
        );
      }}
    >
      <View style={styles.container}>
        <Image
          source={require("../../../assets/file-icon.jpg")}
          style={styles.photo}
        />
        <View style={styles.container_text}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "#FFF",
    elevation: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: "#0D47A1",
    fontWeight: "bold",
  },
  container_text: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center",
  },
  description: {
    fontSize: 11,
    fontStyle: "italic",
  },
  photo: {
    height: 50,
    width: 50,
  },
});
