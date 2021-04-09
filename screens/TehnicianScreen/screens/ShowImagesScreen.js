import React, { useEffect, useState} from 'react';
import {FlatList, Image, View} from "react-native";
import {AuthContext} from "../../../contexts/authContext";

const ShowImagesScreen = ({ route, navigation }) => {
    const { taskId } = route.params;
    const { getSavedToken } = React.useContext(AuthContext);
    const [photos, setPhotos] = useState([]);
    const getImagesURL=""

    async function getData() {
        let token = await getSavedToken();
        fetch(getImagesURL+"&taskId="+ taskId, {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            return response.json();
        }).then((responseJson) => {
            setPhotos(responseJson.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        //ovo treba otkomentirati i postaviti url kada se završi endpoint
        // getData();
    })

    const renderImage = (item) => {
        return (
            <Image
                style={{ height: 100, width: 100, margin:10}}
                source={{uri: `data:image/gif;base64,${item}`}}
            />
        )
    }

    return (
        <View>
            <FlatList
                data={photos}
                renderItem={renderImage}
                keyExtractor={(item) => item.name}
                numColumns={3}
                columnWrapperStyle={{flex: 1, justifyContent: 'flex-start'}}
            >
            </FlatList>
        </View>
    )
}

export default ShowImagesScreen;
