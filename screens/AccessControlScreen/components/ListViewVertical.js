import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Button,
} from "react-native";
import ListItemVertical from "./ListItemVertical";
import { serverURL } from "../../../appConfig";
import { AuthContext } from "../../../contexts/authContext";
import { userContext } from "../../../contexts/userContext";
import SelectionListHeader from "./SelectionListHeader";
import {
  downloadFile,
  renameFileFolder,
  copyFileFolder,
  moveFileFolder,
  deleteFile,
} from "./ListItemVertical";
import Dialog from "react-native-dialog";

import { List, Content, Container, Root } from "native-base";

var image_source_folder = "../../../assets/file-icon.jpg";
var image_source_data = "../../../assets/paper-icon.png";
var image_icon = "";

function useSelectionChange(items) {
  const [selectionMode, setSelectionMode] = useState(null);
  useEffect(() => {
    if (items.filter((i) => i.selected).length > 0) {
      setSelectionMode(true);
    } else {
      setSelectionMode(false);
    }
  });
  return selectionMode;
}
export default function ListViewVertical({ itemList, folderPath }) {
  const [visibleFolder, setVisibleFolder] = React.useState(false);
  const [folderName, setFolderName] = useState("New Folder");
  var { getSavedToken } = React.useContext(AuthContext);
  var username = React.useContext(userContext);
  const navigation = useNavigation();
  const [items, setItems] = useState(itemList);
  const selectionMode = useSelectionChange(items);
  const [visible, setVisible] = useState(false);
  const [pathFolder, setPathFolder] = useState("");

  //varijable potrebne za rename
  const [fileName, setFileName] = useState("");
  const [newFilename, setNewFileName] = useState(fileName);
  const [path, setPath] = useState("");

  //console.log(items);
  const showFolderDialog = () => {
    setVisibleFolder(true);
  };

  const handleCancelFolder = () => {
    setVisibleFolder(false);
  };

  useEffect(() => {
    setItems(itemList);
    setPathFolder(folderPath);
  });

  const toggleSelect = (item) => {
    setItems(
      items.map((i) => {
        if (item === i) {
          i.selected = !i.selected;
        }
        return i;
      })
    );
  };

  const clearSelection = () => {
    setItems(
      items.map((i) => {
        i.selected = false;
        return i;
      })
    );
    x;
  };

  const onPress = async (item) => {
    if (selectionMode) {
      toggleSelect(item);
    } else {
      //ovo je za download
      let token = await getSavedToken();
      downloadFile(
        token,
        username,
        item.path,
        item.name,
        item.type,
        item.children,
        navigation
      );
    }
  };

  const onLongPress = (item) => {
    if (selectionMode === false) {
      toggleSelect(item);
    }
  };

  //3 funkcije za rename Dialog
  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOK = async () => {
    let token = await getSavedToken();
    renameFileFolder(token, username, path, fileName, newFilename);
    setVisible(false);
  };

  const rename = async () => {
    let selectedItem;
    let selectedItemsNumber = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].selected) {
        selectedItem = items[i];
        selectedItemsNumber++;
      }
    }
    //rename moze jedino ako je samo jedan selektovan
    if (selectedItemsNumber == 1) {
      setFileName(selectedItem.name);
      setNewFileName(selectedItem.name);
      setPath(selectedItem.path);
      showDialog();
    }
  };
  async function makeFolder() {
    console.log(folderName);
    console.log(pathFolder);

    let exists = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i]["type"] == "directory" && items[i]["name"] == folderName) {
        exists = true;
      }
    }
    if (exists) {
      Alert.alert("Folder already exists!");
    } else {
      setVisibleFolder(false);
      let newPath = pathFolder.split("allFiles/" + username + "/")[1];
      let token = await getSavedToken();
      console.log("Token je: " + token);
      const response = await fetch(serverURL + "api/web/user/folder/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "text/html",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          path: newPath,
          folderName: folderName,
          user: username,
        }),
      });
      if (response.status == 200) {
        Alert.alert("Uspješno dodan folder");
        /*var newItems = items;
                newItems.push({ name: folderName, id: '', image_url: image_url, type: 'directory', path: pathFolder })
                newItems[newItems.length - 1]['children'] = [];
                setItems(newItems)*/
      } else if (response.status == 503) {
        alert("Servis nedostupan");
      } else if (response.status == 403) {
        //invalid token, trebalo bi dobaviti novi
      } else {
        console.log("Status" + response.status);
        console.log("Promijenjen JSON zahtjev?");
        alert("Greska pri pravljenju foldera");
      }
    }
  }
  const copy = async () => {
    navigation.navigate("ChoiceManager");
  };

  const deleteFileFromFolder = async () => {
    let selectedItem;
    let selectedItemsNumber = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].selected) {
        selectedItem = items[i];
        selectedItemsNumber++;
      }
    }
    if (selectedItemsNumber == 1) {
      let token = await getSavedToken();
      try {
        deleteFile(username, token, selectedItem.path, selectedItem.name);
        clearSelection();
      } catch {}
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        onLongPress={() => onLongPress(item)}
        key={item.id}
        style={[item.selected ? styles.selected : styles.normal]}
      >
        <View style={styles.container}>
          <Image
            source={require("../../../assets/file-icon.jpg")}
            style={styles.photo}
          />
          <View style={styles.container_text}>
            <Text style={styles.title}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Root>
        <Container>
          <View>
            <Button title="+ New Folder" onPress={showFolderDialog} />
            <Dialog.Container visible={visibleFolder}>
              <Dialog.Title>Create folder</Dialog.Title>
              <Dialog.Input onChangeText={(value) => setFolderName(value)}>
                New Folder
              </Dialog.Input>
              <Dialog.Button label="Cancel" onPress={handleCancelFolder} />
              <Dialog.Button
                label="Submit"
                onPress={async () => {
                  await makeFolder();
                }}
              />
            </Dialog.Container>
          </View>
          <SelectionListHeader
            selectionMode={selectionMode}
            title="Files"
            selectedItemsCount={items.filter((i) => i.selected).length}
            clearSelection={clearSelection}
            selectActions={[
              {
                name: "Copy",
                method: async function () {
                  //  navigation.navigate("ChoiceManager");

                  await copy();

                  //let token = await getSavedToken();

                  //ovdje treba ponuditi listu foldera za  odabir
                  // u koji cemo folder kopirati i tu cemo uzeti new path
                  //tako isto i za move

                  //  if (selectedItemsCount==1){
                  // await copyFileFolder(token,username,items[0].name,items[0].path,newPath)
                  //  }

                  clearSelection();
                },
              },
              {
                name: "Move",
                method: function () {
                  // let token = await getSavedToken();

                  //await moveFileFolder(token,username,naziv,oldPath,newPath)

                  clearSelection();
                },
              },
              {
                name: "Delete",
                method: async function () {
                  console.log("NOVI POZIV");
                  try {
                    await deleteFileFromFolder();
                  } catch {}
                },
              },
              {
                name: "Download",
              },
              {
                name: "Send",
              },
              {
                name: "Rename",
                method: async function () {
                  await rename();
                },
              },
              {
                name: "Cancel",
              },
            ]}
          />
          <Content>
            <List>
              {items.map((item) => {
                return renderItem(item);
              })}
            </List>
          </Content>
        </Container>
      </Root>

      <Dialog.Container visible={visible}>
        <Dialog.Title>Rename</Dialog.Title>
        <Dialog.Description>Enter new name</Dialog.Description>
        <Dialog.Input
          value={newFilename}
          onChangeText={(text) => setNewFileName(text)}
        ></Dialog.Input>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="OK" onPress={handleOK} />
      </Dialog.Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selected: {
    backgroundColor: "lightblue",
    marginLeft: 0,
    paddingLeft: 18,
  },
  normal: {},
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
  containerDialog: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
