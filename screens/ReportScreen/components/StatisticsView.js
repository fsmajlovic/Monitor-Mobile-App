import React, { useContext, useEffect, useState} from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import {AuthContext} from "../../../contexts/authContext";
import { DeviceContext } from '../../../contexts/DeviceContext';


function getStatisticalData(name,dataSet){
    if(dataSet===undefined || dataSet.length==0) return [];
    let numberOfOccurrences=[];
    numberOfOccurrences.push([name,dataSet.deviceStatusLogs.length]);
    return numberOfOccurrences;
}

const StatisticsView = (props) => {
    const { getSavedToken } = React.useContext(AuthContext);
    const { activeDevice } = useContext(DeviceContext);
    const [logs ,setLogs ] = useState([]);

    useEffect(() => {
        async function getData(getSavedToken) {
            let token = await getSavedToken();
            //dobavljanje logova u zadnjih mjesec dana
            let startDate=new Date();
            startDate.setMonth(startDate.getMonth()-1);
            let endDate=new Date();
            let s1=startDate.toString();
            let s2=endDate.toString();
            let deviceId=22;
            // +"&startDate="+startDate.toISOString()+"&endDate="+endDate.toISOString()
            fetch("https://si-2021.167.99.244.168.nip.io/api/device/GetDeviceLogs"+
                "?deviceId="+activeDevice.deviceId, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer " + token
                },
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
    const data=getStatisticalData(props.dataSet.name,logs);
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
