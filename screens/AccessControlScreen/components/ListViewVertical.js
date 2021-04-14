import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Button,
  Alert,
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
  deleteFileFolder,
} from "./ListItemVertical";
import Dialog from "react-native-dialog";

import { List, Content, Container, Root } from "native-base";

var image_source_folder = require("../../../assets/file-icon.jpg");
var image_source_data = require("../../../assets/paper-icon.png");
var nameAscending = true;
var dateAscending = true;

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

export default function ListViewVertical({ itemList, folderPath, isDirectory, action }) {
    var { getSavedToken } = React.useContext(AuthContext);
    var username = React.useContext(userContext);
    const navigation = useNavigation();
    const [visibleFolder, setVisibleFolder] = React.useState(false);
    const [folderName, setFolderName] = useState("New Folder");
    const [items, setItems] = useState([]);
    const selectionMode = useSelectionChange(items);
    const [visible, setVisible] = useState(false);
    const [pathFolder, setPathFolder] = useState("");
    //varijable za copy/move
    const [isCopyDirectory, setIsCopyDirectory] = useState(false);
    const [actionCopyMove, setActionCopyMove] = useState(false);
    //varijable potrebne za rename
    const [fileName, setFileName] = useState("");
    const [newFilename, setNewFileName] = useState(fileName);
    const [path, setPath] = useState("");

    useEffect(() => { 
        setItems(itemList);
        setPathFolder(folderPath);
        setIsCopyDirectory(isDirectory);
        setActionCopyMove(action);
    });

    const showFolderDialog = () => {
        setVisibleFolder(true);
      };
    
    const handleCancelFolder = () => {
        setVisibleFolder(false);
    };

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
    };

    const onPress = async item => {
        if (selectionMode) {
            toggleSelect(item);
        } else {
            console.log("newpath: " + item.oldPath);
            //ovo je za download
            let token = await getSavedToken();
            console.log("ACTION IZ ONPRESS: " + actionCopyMove);
            downloadFile(token, username, item.path, item.name, item.type, item.children, item.oldPath, isCopyDirectory, actionCopyMove, navigation, item.extension);
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
        clearSelection();
        navigation.pop();
        navigation.navigate("FileManager");
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
            navigation.pop();
            navigation.navigate("FileManager");
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
        let selectedItem;
        let selectedItemsNumber=0;
        for (let i=0;i <items.length; i++) {
            if (items[i].selected) {
                selectedItem = items[i];
                selectedItemsNumber++;
            }
        }
        //Za pocetak copy moze za samo jedan selektovani item
        //Poslije ce trebati podrzati i vise oznacenih
        if (selectedItemsNumber==1){
            //console.log("Selektovani item: " + selectedItem.name + " path: " + selectedItem.path);
            navigation.navigate("ChoiceManager", {oldPath: selectedItem.path, isDirectory: selectedItem.hasOwnProperty('children'), action: "copy"});
        }
      }

      const preview = async () => {
        let selectedItem;
        let selectedItemsNumber=0;
        for (let i=0;i <items.length; i++) {
            if (items[i].selected) {
                selectedItem = items[i];
                selectedItemsNumber++;
            }
        }

        if (selectedItemsNumber==1 && selectedItem.type === 'file') {
          let supportedExtensions = ['.log', '.txt', '.html', '.png', '.jpg', '.xml'];
          if(!supportedExtensions.includes(selectedItem.extension)){
            alert('Unsupported Format!');
          }
          else{
            let token = await getSavedToken();
            await downloadFile(token, username, selectedItem.path, selectedItem.name, selectedItem.type, selectedItem.children, selectedItem.oldPath, isCopyDirectory, actionCopyMove, navigation, selectedItem.extension, false);
            let expoFileLocation = FileSystem.documentDirectory + selectedItem.name;
            let dirInfo = await FileSystem.getInfoAsync(expoFileLocation);
            if(dirInfo.exists){
              navigation.push('WebViewScreen', {location: expoFileLocation});
            }
            else{
              alert('Datoteka nedostupna');
            }  
          }
        }
      }



      const move = async () => {
        let selectedItem;
        let selectedItemsNumber=0;
        for (let i=0;i <items.length; i++) {
            if (items[i].selected) {
                selectedItem = items[i];
                selectedItemsNumber++;
            }
        }
        //Za pocetak move moze za samo jedan selektovani item
        //Poslije ce trebati podrzati i vise oznacenih
        if (selectedItemsNumber==1){
            //console.log("Selektovani item: " + selectedItem.name + " path: " + selectedItem.path);
            navigation.navigate("ChoiceManager", {oldPath: selectedItem.path, isDirectory: selectedItem.hasOwnProperty('children'), action: "move"});
        }
      }

    const deleteFromServer = async () => {
      let selectedItem;
      
      let token = await getSavedToken();
      for (let i = 0; i < items.length; i++) {
        if (items[i].selected) {
          selectedItem = items[i];
          if (selectedItem.type=="directory" && selectedItem.children.length!=0) {
            
            //console.log("nije prazan folder")
            Alert.alert(
              'Alert',
              'Folder '+selectedItem.name+' is not empty. Are you sure you want to delete it?',
              [   
                {       
                  text: 'NO',       
                  onPress: () => console.log("pressed no"),       
                  style: 'cancel',     
                },     
                {
                  text: 'YES', 
                  onPress: async () => await deleteFileFolder(username, token, selectedItem.path, selectedItem.name,selectedItem.type),
                },   
              ],   
              { cancelable: false }, 
            )
            
          }
          else await deleteFileFolder(username, token, selectedItem.path, selectedItem.name,selectedItem.type);
        }
      }
        clearSelection();
        navigation.pop();
        navigation.navigate("FileManager");
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
                source={item["type"] == "file" ? image_source_data : image_source_folder}
                style={styles.photo}
              />
              <View style={styles.container_text}>
                <Text style={styles.title}>{item.name}</Text>
              </View>
              <View style={styles.container_text}>
                <Text style={styles.title}>{item.birthtime}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      };
      
      async function sortByName() {
        items.sort((a, b) => {
          if (a.name.toLowerCase() == b.name.toLowerCase()) {
            return 0;
          } else {
              return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
          }
        });

        // ascending/descending radi po on/off principu
        if(nameAscending) {
          items.reverse();
          nameAscending = false;
        }
        else {
          nameAscending = true;
        }

        setItems(
          items.map((i) => {
            return i;
          })
        );
      }

      async function sortByDate() {
        items.sort((a, b) => {
          var d1 = new Date(a.dateTimeFormat);
          var d2 = new Date(b.dateTimeFormat);
          if (d1 == d2) {
            return 0;
          } else {
              return d1 > d2 ? -1 : 1;
          }
        });

        // ascending/descending radi po on/off principu
        if(dateAscending) {
          items.reverse();
          dateAscending = false;
        }
        else {
          dateAscending = true;
        }

        setItems(
          items.map((i) => {
            return i;
          })
        );
      }

      return (
        <>
          <Root>
            <Container>
              <View style={styles.header}>
                <View style={styles.sort}>                
                  <Text style={{color: 'white', fontSize: 15, marginLeft: 10, marginBottom: 10, marginRight: 10}}>Sort by:</Text>
                  <TouchableOpacity 
                    onPress={sortByName}
                    style={styles.TO}
                  >
                    <Text style={{color: 'white', fontSize: 15}}>Name</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={sortByDate}
                    style={styles.TO}
                  >
                    <Text style={{color: 'white', fontSize: 15}}>Date</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={showFolderDialog}
                    style={styles.TO}
                >   
                    <Text style={{color: 'white', fontSize: 15}}>+ New Folder</Text>
                </TouchableOpacity>
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
                      await copy();
                      clearSelection();
                    },
                  },
                  {
                    name: "Move",
                    method: async function () {
                      await move();
                      clearSelection();
                    },
                  },
                  {
                    name: "Delete",
                    method: async function () {
                      await deleteFromServer();
                    },
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
                    name: "Preview",
                    method: async function () {
                      await preview();
                    },
                  }
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
      header: {
        flexDirection: "row",
        backgroundColor: "#0D47A1",
        alignItems: "center",
        justifyContent: "space-between",
      },
      sort: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
      },
      //TouchableOpacity
      TO: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }
    });
    