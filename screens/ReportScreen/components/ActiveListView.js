import React from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import ActiveListItem from './ActiveListItem';
import ListItem from './ListItem';


const ActiveListView = ({ itemList, navigation }) => (
    <View style={styles.container}>
        <FlatList
            keyExtractor={(item) => item.deviceId.toString()}
            data={itemList}
            renderItem={({ item }) => <ActiveListItem
                item={item}
                navigation={navigation}
            />}
        />

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        color: 'red',
        padding: 5
    }
});

export default ActiveListView;