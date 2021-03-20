import React, { useState, useEffect } from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { format } from 'date-fns';

// const timeToString = (time) => {
//     const date = new Date(time);
//     console.log("sati");
//     console.log(date.getHours() + ":" + date.getMinutes());
//     const splitDate = date.toISOString().split('T');
//     console.log(date.toISOString());
//     return date.toISOString().split('T')[0];
//   }

const renderItem = (item) => {
    return <TouchableOpacity style={{marginRight: 17, marginTop: 17}}>
        <Card>
            <Card.Content>
                <View style={styles.item}>
                    <Text>{format(item.Time, 'HH:mm ')}</Text>
                    <Text>{item.Location}</Text>
                </View>
                <View>
                    <Text>{item.Description}</Text>
                </View>
            </Card.Content>
        </Card>
    </TouchableOpacity>
  }


function Schedule(props) {
    const [items, setItems] = useState({});


    // useEffect(() => {
    //     (async () => {
    //         const response = await fetch("http://10.0.2.2:3001/tasks");
    //         const data = await response.json();

    //         const mappedData = data.map((post) => {
    //             const date = new Date(post.Time);

    //             return {
    //                 ...post,
    //                 date: format(date, 'yyyy-MM-dd'),
    //             }
    //         })

    //         const reduced = mappedData.reduce((acc, currentItem) => {
    //             const { date, ...item } = currentItem;
    //             {acc[date] ? acc[date].push({...item}) : acc[date] = [item] }
    //             return acc;
    //         }, {});

    //          setItems(reduced);
    //         // console.log(timeToString(items[0].Time));
    //     })();
    // }, []);

    

    return (
        <View style={{flex: 1}}>
            <Agenda
                // items={items}
                // selected={'2021-3-20'}
                // renderItem={renderItem}
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