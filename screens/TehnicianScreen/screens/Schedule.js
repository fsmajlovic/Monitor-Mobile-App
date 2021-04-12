import React, { useState, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { format } from 'date-fns';
import {AuthContext} from '../../../contexts/authContext';


function Schedule(props) {
    const [items, setItems] = useState({});
    const {getSavedToken} = React.useContext(AuthContext);

    const getColor = (item) => {
        //console.log("Status je " + item.statusId)
        switch(item.statusId) {
            case 1:
              return "#fc6b5b"
            case 2:
              return "#7eddf7"
            case 3:
              return "#f8ff7d"
            case 4:
              return "#73ff98"

        }
      }

    const renderItem = (item) => {

        return <TouchableOpacity style={{marginRight: 17, marginTop: 17}} onPress={() => props.navigation.navigate("TaskView", {machine:item.device,task: item})}>
            <Card style={{ backgroundColor: getColor(item)}}>
                <Card.Content>
                    <View style={styles.item}>
                        <Text>{format(Date.parse(item.startTime), 'HH:mm ')} - {format(Date.parse(item.endTime), ' HH:mm')}</Text>
                        { item.device ? <Text>{item.device.location}</Text> : <Text>{item.location}</Text> }
                    </View>
                    <View>
                        <Text>{item.description}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
      }



      useEffect(()=>{
        async function getData(getSavedToken){
            try {
                const token = await getSavedToken();
                const response = await fetch("https://si-2021.167.99.244.168.nip.io/api/UserTasks", {
                    method: 'GET',
                    headers: {"Authorization" : "Bearer "+ token},
                  });
                  var data = await response.json();
                  var data = data.data;
                const mappedData = data.map((post) => {
                      const date = new Date(post.startTime);
                      return {
                          ...post,
                          date: format(date, 'yyyy-MM-dd'),
                        }
                    })

                const reduced = mappedData.reduce((acc, currentItem) => {
                    const { date, ...item } = currentItem;
                    {acc[date] ? acc[date].push({...item}) : acc[date] = [item] }
                    return acc;
                }, {});
                setItems(reduced);
            } catch (error) {
                console.error(error);
            }
        }
        getData(getSavedToken);
      }, []);



    return (
        <View style={{flex: 1}}>
            <Agenda
                items={items}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default Schedule;
