import React from 'react';
import { View, FlatList, StyleSheet, Button } from 'react-native';
import ActiveListItem from './ActiveListItem';


const ActiveListView = ({ itemList, navigation }) => (
    <View style={styles.container} testID="view">
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
    }
});

export default ActiveListView;