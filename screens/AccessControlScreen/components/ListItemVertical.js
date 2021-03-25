import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';

const onPress = () => {
    console.log("Hello");
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    title: {
        fontSize: 16,
        color: '#0D47A1',
        fontWeight: 'bold'
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 50,
        width: 50,
    },
});

const ListItemVertical = ({ name, image_url }) => (
    <TouchableOpacity>
    <View style={styles.container}>
        <Image source={require('../../../assets/file-icon.jpg')} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {name}
            </Text>        
        </View>
    </View>
    </TouchableOpacity>
);

export default ListItemVertical;