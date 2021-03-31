import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Text, View, Button, Image, ScrollView, StyleSheet} from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';


const MachineScreen = (props) => {
    const { currentDevice,addActiveDevice } = useContext(DeviceContext);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
      updateComponent();
    })

    const updateComponent = () => {
      const { params } = props.route;
      if (params) {
        const { photos } = params;
        if (photos) setPhotos(photos)
        delete params.photos;
      }
    }

    const renderImage = (item, i) => {
      return (
        <Image
          style={{ height: 100, width: 100 }}
          source={{ uri: item.uri }}
          key={i}
        />
      )
    }

    return (
        <View>
            <Button 
              title='Upload slika'
              color='blue'
              onPress={()=>props.navigation.push('ImageUploadScreen')}
            ></Button>
            <Button
              title='Aktiviraj mašinu'
              color='red'
              onPress={()=>addActiveDevice(currentDevice)}
            >
            </Button>
            <ScrollView style={styles.imageList}>
              {photos.map((item, i) => renderImage(item, i))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  imageList: {
    
  }
})


export default MachineScreen;