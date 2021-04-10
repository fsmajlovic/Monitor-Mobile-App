import React, { useEffect, useState} from 'react';
import {FlatList, Image, View} from "react-native";
import {AuthContext} from "../../../contexts/authContext";

const ShowImagesScreen = ({ route, navigation }) => {
    const { machineId ,taskId } = route.params;
    const { getSavedToken } = React.useContext(AuthContext);
    const [photos, setPhotos] = useState([]);
    const getImagesURL="https://si-2021.167.99.244.168.nip.io/api/upload/GetFile"


    useEffect(() => {
        async function getData(getSavedToken) {
            let token = await getSavedToken();
            fetch(getImagesURL, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                //todo ovdje staviti machineUid:machineId, taskId:taskId
                body: JSON.stringify({
                    machineUid:'Desktop PC 2',
                    taskId:''
                })
            }).then((response) => {
                return response.json();
            }).then((responseJson) => {
                let data=[]
                for(let i=0;i<responseJson.data.length;i++){
                    let item=responseJson.data[i]
                    data.push({id:i,data:item.data})
                }
                setPhotos(data);
            }).catch((error) => {
                console.error(error);
            });
        }
        getData(getSavedToken);
    }, [])

    const renderImage = (item) => {
        return (
            <Image
                style={{ height: 100, width: 100, margin:10}}
                source={{uri: `data:image/gif;base64,${item.data}`}}
            />
        )
    }

    return (
        <View>
            {/*Problem je u ovoj listi*/}
            <FlatList
                data={photos}
                renderItem={renderImage}
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{flex: 1, justifyContent: 'flex-start'}}
            >
            </FlatList>
            {/*Ovo radi npr*/}
            {/*{photos[0] && renderImage(photos[0])}*/}
        </View>
    )
}

export default ShowImagesScreen;
