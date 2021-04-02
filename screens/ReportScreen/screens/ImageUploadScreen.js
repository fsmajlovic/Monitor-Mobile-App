import React, { useEffect, useState} from 'react';
import { useContext } from 'react';
import { Text, View, Button, Image, ScrollView, StyleSheet,FlatList,TextInput} from 'react-native';

import { DeviceContext } from '../../../contexts/DeviceContext';
import {AuthContext} from '../../../contexts/authContext';
import axios from 'axios';
import {machineURL} from '../../../appConfig'




const ImageUploadScreen = (props) => {
    const [photos, setPhotos] = useState([]);
    const [selected,setSelected] = useState(false);
    const [task,setTask] = useState('');
    const {currentDevice} = useContext(DeviceContext);
    const {getSavedToken} = useContext(AuthContext);
    
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

        try {
            let token = await getSavedToken();
            let response = await axios.get(machineURL + `UserTasks/${active}`, { // Lista taskova
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            )
            console.log(response.data.data)
        } catch (e) {
            console.log("Greška")
        }

    
      let token;
      let response;
      try {
        token = await getSavedToken();
        response = await axios.post(machineURL+'upload/UploadFile',createFormData(photos, task),{
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

    return (
        <View>
           <TextInput
             style={styles.input}
             onChangeText={setTask}
             placeholder="Task"
             value={task}
           />
            <Button 
              title='Select photos'
              color='blue'
              onPress={()=>props.navigation.push('ImageBrowserScreen')}
            />
            

            {selected==true ?
             <View>
             <FlatList 
              data={photos}
              renderItem={renderImage}
              keyExtractor={(item)=>item.name}
              numColumns={3}
              columnWrapperStyle={{  flex: 1,justifyContent: 'center'}}
            >
            </FlatList>

               <Button 
                  title='Upload'
                  color='red'
                  onPress={async ()=> await uploadImages()}
               />
            </View>
            : null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      paddingLeft: 12,
    },
  });

export default ImageUploadScreen;