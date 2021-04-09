import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ListItemVertical from './ListItemVertical';

const styles = StyleSheet.create({
    container: {
        flex: 1,      
    },
});


const ListViewVertical = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList
            data={itemList}
            renderItem={({ item }) => {
                return <ListItemVertical
                    item={item} 
                    name={item.name}
                    image_url={item.image_url}
                    type={item.type}
                    path={item.path}
                    children={item.children}
                /> 
            }}
        />
    </View>
);

export default ListViewVertical;