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
    const { machine,task } = params;

    return (
        <View style={styles.container}>
            <Text style={styles.description}> {task.description} </Text>
            <Text>Start: {moment(task.startTime).format('MMMM Do YYYY, h:mm:ss a')} </Text>
            <Text>End: {moment(task.endTime).format('MMMM Do YYYY, h:mm:ss a')} </Text>
            <Text> {task.location} </Text>

            <TouchableOpacity onPress={() => props.navigation.push('ImageUploadScreen', { task: task })}>
                <View style={styles.containerButton}>
                    <Text style={styles.button}>Upload pictures</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.push('ShowImagesScreen', {
                //ovi parametri svakako ne trebaju, a bacaju izuzetak ako mašina nije definisana
                // machineId: machine.deviceId,
                // taskId: task.taskId,
                // machine: machine,
                task: task
            })}>
                <View style={styles.containerButton}>
                    <Text style={styles.button}>Show pictures</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.push('ComponentView', { task: task })}>
                <View style={styles.containerButton}>
                    <Text style={styles.button}>Parts</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    editButton: {
        paddingRight: 12,
        fontFamily: 'sans-serif',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    containerButton: {
        justifyContent: 'center',
        backgroundColor: "#0D47A1",
        height: 40,
        width: 250,
        margin: 10,
        borderRadius: 30,
        paddingHorizontal: 30,
        marginTop: 30,
        alignItems: 'center'
    },
    button: {
        fontSize: 20,
        color: "#FFF",
        fontWeight: "bold",

    },
    description: {
        textAlign: 'center',
        fontFamily: 'sans-serif',
        fontSize: 25,
        fontWeight: 'bold'
    },
})

export default TaskView;
