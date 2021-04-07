import React, { useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Moment from 'react-moment';
import moment from 'moment';



const TaskView = (props) => {

    const getHeaderButton = () => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate("EditTask", { task: props.route.params.task })}>
                <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => getHeaderButton()
        });
    })

    const { params } = props.route;
    const { task } = params;
    const dateToFormat = '1976-04-19T12:59-0500';
    return (
        <View>
            
            <Text>Start: {moment(task.startTime).format('MMMM Do YYYY, h:mm:ss a')} </Text>
            <Text>End: {moment(task.endTime).format('MMMM Do YYYY, h:mm:ss a')} </Text>
            <Text> {task.description} </Text>
            <Text> {task.location} </Text>
            <Text> { task.startTime } </Text>
            <Text> { task.endTime } </Text>
            <Text> { task.statusId.name } </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    editButton: {
        paddingRight: 12,
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})

export default TaskView;