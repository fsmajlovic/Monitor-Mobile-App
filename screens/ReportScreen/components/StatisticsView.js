import React, { useEffect, useState} from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {AuthContext} from "../../../contexts/authContext";


function getStatisticalData(dataSet){
    if(dataSet===undefined) return [];
    let uniqueNames=[];
    for(let i=0;i<dataSet.length;i++){
        let object=dataSet[i];
        uniqueNames.push(object.device.name);
    }
    uniqueNames = [...new Set(uniqueNames)];
    let numberOfOccurrences=[]
    for(let i=0;i<uniqueNames.length;i++){
        let count=dataSet.filter(object=>object.device.name===uniqueNames[i]).length;
        numberOfOccurrences.push([uniqueNames[i],count]);
    }
    return numberOfOccurrences;
}

const StatisticsView = (props) => {
    const { getSavedToken } = React.useContext(AuthContext);
    const [logs ,setLogs ] = useState([]);

    useEffect(() => {
        async function getData(getSavedToken) {
            let token = await getSavedToken();
            fetch("https://si-2021.167.99.244.168.nip.io/api/device/GetAllDeviceLogs", {
                method: 'GET',
                headers: { "Authorization": "Bearer " + token },
            }).then((response) => {
                return response.json();
            }).then((responseJson) => {
                setLogs(responseJson.data);
            }).catch((error) => {
                console.error(error);
            });
        }
        getData(getSavedToken);
    }, []);

    const tableHead=["Računar", "Broj javljanja"];
    const data=getStatisticalData(logs);
    return (
        <ScrollView horizontal={false}>
            <View style={styles.container}>
                <Text style={{textAlign:"center"}}>
                    Statistika
                </Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Row
                    data={tableHead}
                    style={styles.head}
                    textStyle={styles.text}
                    />
                    <Rows data={data} textStyle={styles.text} />
                </Table>
            </View>
        </ScrollView>
    )
 }

export default StatisticsView;

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: {height: 40, backgroundColor: '#f1f8ff',alignItems:"center"},
    text: {margin: 6},
});
