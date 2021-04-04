import React, { useEffect, useState} from 'react';
import { useContext } from 'react';
import { Text, View, Button, Image, ScrollView, StyleSheet,FlatList,TextInput, TouchableOpacity} from 'react-native';

import { DeviceContext } from '../../../contexts/DeviceContext';
import {AuthContext} from '../../../contexts/authContext';
import axios from 'axios';
import {machineURL} from '../../../appConfig'




const ImageUploadScreen = (props) => {
    const [photos, setPhotos] = useState([]);
    const [selected,setSelected] = useState(false);
    const [task,setTask] = useState('');
    const { currentDevice, taskList } = useContext(DeviceContext);
    const {getSavedToken} = useContext(AuthContext);
    const [selectedTask, setSelectedTask] = useState("nesto");
    
    const currentDate = () =>{
        let current = new Date();
        let cDate = current.getFullYear() + ':' + (current.getMonth() + 1) + ':' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        return cDate + ':' + cTime;
    }
    const createFormData = (photo,task) =>{
        const data = new FormData();

        for(let i=0;i<photo.length;i++){

          data.append(currentDevice.name+'-'+currentDate()+'-'+task, {
           name: photo[i].name,
           type: photo[i].type,
           uri: Platform.OS === "android" ? photo[i].uri : photo[i].uri.replace("file://", "")
         });
       }
       return data;
    }

    useEffect(() => {
        updateComponent();
    })

    

    const updateComponent = () => {
      const { params } = props.route;
      if (params) {
        const { photos } = params;
        if (photos) {
            setPhotos(photos)
            setSelected(true)
        }
        delete params.photos;
      }
    }

    const renderImage = (item) => {
      return (
        <Image
          style={{ height: 100, width: 100, margin:10}}
          source={{ uri: item.item.uri }}
        />
      )
    }

    const uploadImages = async () => {

    
      let token;
      let response;
      try {
        token = await getSavedToken();
        response = await axios.post(machineURL+'upload/UploadFile', createFormData(photos, task),{
          headers:{
            'Authorization': `Bearer ${token}`
             }
          }
        )

        setPhotos([]);
        setSelected(false);
        setTask('');
        alert("Succesfull upload!")
         
      } catch (e) {
        console.log('GREŠKAAAAA '+e);
        
        setPhotos([]);
        setSelected(false);
        setTask('');
        alert("Failed to upload!")
      
      }
    }
  
  const _renderItemss = () => {
    return taskList.items.map((item, index) => {
      return <Item key={index + 1} label={item.description} value={item.description} />
    });
  }

    return (
        <View style={styles.container}>
           <TextInput
             style={styles.input}
             onChangeText={setTask}
             placeholder="Task"
             value={task}
           />
           
            <TouchableOpacity onPress={() => props.navigation.push('ImageBrowserScreen')}>
              <View style={styles.containerButton}>
                <Text style={styles.button}>Select photos</Text>
              </View>
            </TouchableOpacity>
            

            {selected==true ?
            <View style={styles.selectedContainer}>
              <FlatList 
                data={photos}
                renderItem={renderImage}
                keyExtractor={(item)=>item.name}
                numColumns={3}
                columnWrapperStyle={{  flex: 1, justifyContent: 'center'}}
              >
              </FlatList>
              <TouchableOpacity onPress={async () => await uploadImages()}>
                <View style={styles.containerButton}>
                  <Text style={styles.button}>Upload</Text>
                </View>
              </TouchableOpacity>
            </View>
            : null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    selectedContainer: {
      flex: 1
    },  
    input: {
      width: 250,
      height: 40,
      margin: 12,
      borderWidth: 1,
      paddingLeft: 12,
      borderRadius: 30,
    },
    containerButton: {
      justifyContent: 'center',
      backgroundColor: "#0D47A1",
      height: 40,
      width: 250,
      margin: 10,
      borderRadius: 30,
      paddingHorizontal: 30,
      marginTop: 30,
      alignItems: 'center'
    },
    button: {
      fontSize: 20,
      color: "#FFF",
      fontWeight: "bold",

    },
  });

export default ImageUploadScreen;