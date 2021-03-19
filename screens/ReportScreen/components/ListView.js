import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ListItem from './ListItem';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const ListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => <ListItem
                title={item.title}
                description={item.description}
                image_url={item.image_url}
            />}
        />

    </View>
);

export default ListView;