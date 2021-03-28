import { prepareDataForValidation } from "formik";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { AuthContext } from "../../../contexts/authContext";
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
fileData = "SGVsbG8sIFdvcmxkIQ==";
fileName = "HelloWorld.txt";

async function getFile(token) {
  try {
    let response = await fetch(serverURL + "api/web/file/get", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "text/html",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: "test",
        location: "test",
        ip: "77.78.232.142",
        fileName: "HelloWorld.pdf",
        user:"monitor"
      }),
    });

     var jsonResponse = await response.json();
     fileData = jsonResponse["base64Data"];
     fileName = jsonResponse["fileName"];

  } catch (error) {
    console.log(error);
  }
}

async function saveToExpoFileSystem() {
  expoFileLocation = FileSystem.documentDirectory + fileName;
  FileSystem.writeAsStringAsync(expoFileLocation, fileData, {
     encoding: FileSystem.EncodingType.Base64
  });
}

async function copyFromExpoFSToLocalFS() {
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(expoFileLocation);
      alert("Download finished");
      await MediaLibrary.createAlbumAsync("Monitor-Downloads", asset, false);
  }
}

export default function ListItemVertical({ name, image_url }) {
  var {getSavedToken} = React.useContext(AuthContext);
  return(
    <TouchableOpacity
      onPress = {async () => {
        let token = await getSavedToken();
        console.log(token);
        await getFile(token);
        await saveToExpoFileSystem();
        await copyFromExpoFSToLocalFS();
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