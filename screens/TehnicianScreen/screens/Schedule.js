import React, { useState, useEffect } from 'react';
import { Agenda} from 'react-native-calendars';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

function Schedule() {
    const [items, setItems] = useState({});

    const loadItems = (day) => {
        setTimeout(() => {
          for (let i = -10; i < 35; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = timeToString(time);
            if (!items[strTime]) {
              items[strTime] = [];
              const numItems = Math.floor(Math.random() * 3 + 1);
              for (let j = 0; j < numItems; j++) {
                items[strTime].push({
                  name: 'Item for ' + strTime + ' #' + j,
                  height: Math.max(50, Math.floor(Math.random() * 150))
                });
              }
            }
          }
          const newItems = {};
          Object.keys(items).forEach(key => {
            newItems[key] = items[key];
          });
          setItems(newItems);
        }, 1000);
      }

      const renderItem = (item) => {
        return <TouchableOpacity style={{marginRight: 17, marginTop: 17}}>
            <Card>
                <Card.Content>
                    <View style={styles.item}>
                        <Text>Task</Text>
                        <Text>{item.name}</Text>
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
      }

    return (
        <View style={{flex: 1}}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={'2021-05-16'}
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