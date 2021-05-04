import React, { Component, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

const ImageBrowserScreen = (props) => {
    

    const _getHeaderLoader = () => (
        <ActivityIndicator size='small' color={'#0580FF'} />
    );

    const imagesCallback = (callback) => {
        const { navigation } = props;
        props.navigation.setOptions({
            headerRight: () => _getHeaderLoader()
        });

        callback.then(async (photos) => {
            const cPhotos = [];
            for (let photo of photos) {
                const pPhoto = await _processImageAsync(photo.uri);
                cPhotos.push({
                    uri: pPhoto.uri,
                    name: photo.filename,
                    type: 'image/jpg'
                })
            }
            navigation.navigate('ImageUploadScreen', { photos: cPhotos });
        })
            .catch((e) => console.log(e));
    };

    const _processImageAsync = async (uri) => {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1000 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    };

    const _renderDoneButton = (count, onSubmit) => {
        if (!count) return null;
        return <TouchableOpacity title={'Done'} onPress={onSubmit}>
            <Text style={styles.doneButton} onPress={onSubmit}>Done</Text>
        </TouchableOpacity>
    }

    const updateHandler = (count, onSubmit) => {
        props.navigation.setOptions({
            title: `Selected ${count} files`,
            headerRight: () => _renderDoneButton(count, onSubmit)
        });
    };

    const renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );

    
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
        <View style={[styles.flex, styles.container]} testID={"browserscreen"}>
            <ImageBrowser  testID={"browserclick"}
                max={4}
                onChange={updateHandler}
                callback={imagesCallback}
                renderSelectedComponent={renderSelectedComponent}
                emptyStayComponent={emptyStayComponent}
            />
        </View>
    );
    
}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        position: 'relative'
    },
    emptyStay: {
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff'
    },
    doneButton: {
        paddingRight: 12,
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
});

export default ImageBrowserScreen;
