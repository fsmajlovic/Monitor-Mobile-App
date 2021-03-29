import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 1,
        marginRight: 1,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 2,
        backgroundColor: '#FFF',
        elevation: 2,
        alignContent: 'center',
    },
    name: {
        fontSize: 13,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#d0d5db",
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        width: '100%',
        opacity: 0.9
    },
    photo: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const ListItem = ({ name,image_url }) => (
    <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.photo} />
        <View style={styles.container_text}>
            <Text numberOfLines={1} style={styles.name} >
                {name}
            </Text>
        </View>

    </View>
);

export default ListItem;