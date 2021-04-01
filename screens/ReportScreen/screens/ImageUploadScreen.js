import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Text, View, Button, Image, ScrollView, StyleSheet,FlatList} from 'react-native';

const ImageUploadScreen = (props) => {
    const [photos, setPhotos] = useState([]);
    const [selected,setSelected] = useState(false);

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

    return (
        <View>
            <Button 
              title='Select photos'
              color='blue'
              onPress={()=>props.navigation.push('ImageBrowserScreen')}
            ></Button>
            

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
                  onPress={()=>{setPhotos([]);setSelected(false);alert("Succesfull upload!")}}
               ></Button>
            </View>
            : null
            }

        </View>
    )
}


export default ImageUploadScreen;