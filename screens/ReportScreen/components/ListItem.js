import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
        color: '#000',
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

const ListItem = ({ name, lastTimeOnline }) => (
    <View style={styles.container}>
        <Image source={require('../../../assets/pc-icon.jpg')} style={styles.photo} />
        <View style={styles.container_text}>
            <Text style={styles.title}>
                {name}
            </Text>
            <Text style={styles.description}>
                {lastTimeOnline}
            </Text>
        </View>

    </View>
);

export default ListItem;