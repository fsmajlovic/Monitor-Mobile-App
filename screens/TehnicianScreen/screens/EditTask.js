import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'; 
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from 'formik';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {AuthContext} from '../../../contexts/authContext';
import DropDownPicker from 'react-native-dropdown-picker';


async function postScreenshot({token, location, description, date, taskId}) {
  try {
    console.log("Dosao");
    console.log({location, description, date, taskId});
    let response = await fetch("https://si-2021.167.99.244.168.nip.io/api/UserTasks/" + taskId, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({deviceId: null,
        startTime: date,
        endTime: date,
        location: location,
        description: description,
        statusId: 1})
    });
    var json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error);
  }
};


export default function EditTask({route, navigation}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  var {getSavedToken} = React.useContext(AuthContext);

  const {task} = route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={styles.container}>
        <Formik
          initialValues={{ location: task.location, description: task.description}}
        >
          {props => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Location'
                onChangeText={props.handleChange('location')}
                value={props.values.location}
                //value={task.location}
              />

              <TextInput
                style={styles.input2}
                multiline
                placeholder='Description...'
                onChangeText={props.handleChange('description')}
                value={props.values.description}
                // value={task.description}
              />


              <View style={styles.conainerIcon}>
                <Text style={styles.text}>Select date: </Text>
                <Fontisto name="date" onPress={showDatepicker} size={24} color="black" />
              </View>
              <View style={styles.conainerIcon}>
                <Text style={styles.text}>Select time: </Text>
                <Ionicons name="ios-time-outline" onPress={showTimepicker} size={24} color="black" />
              </View>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                      minimumDate={new Date()}
                    />
                  )}
              <Button title="Save"  style={{display: 'flex', justifyContent: 'right'}} onPress={
                async () => {
                  let token = await getSavedToken();
                  await postScreenshot({token, description: props.values.description, location: props.values.location, date, taskId: task.taskId});
                  navigation.popToTop()
              }} />
              <Button title="Cancel"  onPress={
                  (props) => { navigation.goBack(null) }    // srediti buttone
              } />
              
            </View>
            
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  input2: {
    width: 250,
    height: 150,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10,
    textAlignVertical: 'top',
    fontSize: 16
  },
  conainerIcon: {
    flexDirection: "row",
    marginVertical: 15,
  },
  text: {
    fontSize: 16
  }
});



