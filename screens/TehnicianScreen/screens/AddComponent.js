import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import {Text, View, StyleSheet, Button, TextInput, TouchableOpacity} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { AuthContext } from '../../../contexts/authContext';


async function submit({ token, type, name, quantity, taskId, task }) {
    try {
        let response = await fetch("https://si-2021.167.99.244.168.nip.io/api/Components", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify([{
                name: name,
                quantity: quantity,
                taskId: taskId,
                type: type
            }])
        });
        var json = await response.json();
    } catch (error) {
        console.error(error);
    }
};


const AddComponent = (props) => {
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { task } = props.route.params;
    const { getSavedToken } = useContext(AuthContext);



    return (
        <Formik
            initialValues={{ type: '', name: '', quantity: 1 }}
            style={styles.container}
            onSubmit={
                async (values) => {
                    let token = await getSavedToken();
                    await submit({ token, type: values.type, name: values.name, quantity: quantity, taskId: task.taskId, task: task })
                    alert("Successfully added!")
                    props.navigation.navigate('TaskView')
                }
            }
        >
            {({ handleChange, handleSubmit, values }) => (
                <View testID="views">
                    <View>
                        <Text style={styles.title}>Type</Text>
                        <TextInput style={styles.input} value={values.type}
                            onChangeText={handleChange('type')}
                            placeholder={"Tastatura"} 
                            testID="TypeInput" />
                        <Text style={styles.title}>Name</Text>
                        <TextInput style={styles.input} value={values.name}
                            onChangeText={handleChange('name')} testID="NameInput" />
                    </View>
                    <Text style={styles.title}>Quantity</Text>
                    <View style={styles.numeric}>
                        <NumericInput
                            value={quantity}
                            onChange={value => setQuantity(value)}
                            totalWidth={140}
                            totalHeight={40}
                            iconSize={25}
                            step={1}
                            minValue={1}
                            maxValue={100}
                            valueType='real'
                            rounded
                            textColor='#0D47A1'
                            iconStyle={{ color: 'white' }}
                            rightButtonBackgroundColor='#0074e8'
                            leftButtonBackgroundColor='#0074e8'
                        />
                    </View>
                    {/*<Button onPress={handleSubmit} title="Submit" />*/}
                    <View style={styles.submitView}>
                        <TouchableOpacity testID="submit" onPress={() => {handleSubmit()}}>
                            <View style={styles.containerButton}>
                                <Text style={styles.button}>Submit</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
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
    input: {
        marginBottom:20,
        marginLeft:20,
        marginRight:20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        paddingLeft: 10
    },
    title: {
        // alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 16,
        marginLeft: 15,
        marginTop: 10,
    },
    numeric: {
        marginLeft: 15,
        marginTop: 10,
        padding: 10
    },
    submitView: {
        alignItems: 'center'
    }
})


export default AddComponent;