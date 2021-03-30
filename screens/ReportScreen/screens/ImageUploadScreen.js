import React from 'react';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { DeviceContext } from '../../../contexts/DeviceContext';


const ImageUploadScreen = ({navigation}) => {
    return (
        <View>
            <ImageBrowser
                max={4}
                onChange={(num, onSubmit)  => {
          
                      }}
             
                callback={(callback) => {
      
                      }}
            />
        </View>
    )
}


export default ImageUploadScreen;