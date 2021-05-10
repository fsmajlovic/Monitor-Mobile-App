import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";
import {serverURL} from "../../../appConfig";
import React from "react";

var expoFileLocation = "";
var fileData = "";
var fileName = "";

async function getFile(name, token, username, path, downloadLocally) {
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
    if (response.status === 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error")) {
        alert("Datoteka ne postoji!");
      } else if (jsonResponse.hasOwnProperty("fileName")) {
        fileData = jsonResponse["base64"];
        fileName = jsonResponse["fileName"];
        await saveToExpoFileSystem();
        if (downloadLocally) await copyFromExpoFSToLocalFS();
      }
    } else if (response.status === 503) {
      alert("Servis nedostupan");
    } else if (response.status === 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status === 404) {
      alert("Datoteka vise ne postoji");
    } else {
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
    if (response.status === 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        console.log("Datoteka/Folder ne postoji!");
      }
    } else if (response.status === 503) {
      alert("Servis nedostupan");
    } else if (response.status === 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status === 404) {
      alert("Datoteka vise ne postoji");
    } else {
      alert("Greska pri preuzimanju datoteke");
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteFile(name, token, username, path) {
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
    if (response.status === 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        console.log("Datoteka ne postoji!");
      }
    } else if (response.status === 503) {
      alert("Servis nedostupan");
    } else if (response.status === 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status === 404) {
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
    if (response.status === 200) {
      var jsonResponse = await response.json();
      if (jsonResponse.hasOwnProperty("error_id")) {
        console.log("Folder ne postoji!");
      }
    } else if (response.status === 503) {
      alert("Servis nedostupan");
    } else if (response.status === 403) {
      //invalid token, trebalo bi dobaviti novi
    } else if (response.status === 404) {
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
export async function downloadFile(token, username, path, name, type, children, oldPath, isDirectory, action, navigation, extension, downloadLocally = true) {
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if (extractedPath === "") extractedPath = "/";
  if (type === 'file') {
    await getFile(name, token, username, extractedPath, downloadLocally);
  }
  else if (type === 'directory') {
    if (oldPath == null)
      navigation.push("SubDirectory", { name: name, type: type, path: path, children: children, oldPath: oldPath, extension: extension });
    else
      navigation.push("ChoiceSubDirectory", { name: name, type: type, path: path, children: children, oldPath: oldPath, isDirectory: isDirectory, action: action });
  }
}


//SHARE FAJLA
export async function shareFile(token, username, path, name, type, children, oldPath, isDirectory, action, navigation, extension, downloadLocally = true) {
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if (extractedPath === "") extractedPath = "/";
  if (type === 'file') {
    await getFile(name, token, username, extractedPath, downloadLocally);
  }
  else if (type === 'directory') {
    if (oldPath == null)
      navigation.push("SubDirectory", { name: name, type: type, path: path, children: children, oldPath: oldPath, extension: extension });
    else
      navigation.push("ChoiceSubDirectory", { name: name, type: type, path: path, children: children, oldPath: oldPath, isDirectory: isDirectory, action: action });
  }
}

export async function renameFileFolder(token, username, path, name, newName) {
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if (extractedPath === "") extractedPath = "/";
  await rename(token, username, extractedPath, name, newName);
}

export async function deleteFileFolder(username, token, path, name, type) {
  var extractedPath = path.split("allFiles/" + username)[1];
  extractedPath = extractedPath.split(name)[0];
  if (extractedPath === "") extractedPath = "/";
  if (type === "file") {
    await deleteFile(name, token, username, extractedPath);
  } else if (type === "directory") {
    await deleteFolder(name, token, username, extractedPath);
  }
}
