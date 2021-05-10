import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';


const styles = StyleSheet.create({
    container: {
        flex: 1,      
    },
});


const ListView = ({ itemList }) => (
    <View style={styles.container}>
        <FlatList horizontal={true}
            data={itemList}
            renderItem={({ item }) => {
                return <ListItem 
                    item={item} 
                    name={item.name}
                    image_url={item.image_url}
                /> 
 
            }}
        />

    </View>
);

export default ListView;