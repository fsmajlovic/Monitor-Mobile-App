import React from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import ListItem from './ListItem';


const ListView = ({ itemList, navigation }) => (
    <View style={styles.container} testID = {"listview"}>
        <FlatList
            keyExtractor={(item) => item.deviceId.toString()}
            data={itemList}
            renderItem={({ item }) => <ListItem
                item = {item}
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

export default ListView;