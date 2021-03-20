import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'; 
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from 'formik';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function AddTask() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

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
    <View style={styles.container}>
      <Formik
        initialValues={{ location: '', description: ''}}
        onSubmit={(values) => {
          console.log({...values, time: Date.parse(date)});
        }}
      >
        {props => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Location'
              onChangeText={props.handleChange('location')}
              value={props.values.title}
            />

            <TextInput
              style={styles.input2}
              multiline
              placeholder='Description...'
              onChangeText={props.handleChange('description')}
              value={props.values.body}
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
                  />
                )}
            
            <Button title="Add in calendar" onPress={props.handleSubmit} /> 
          </View>
        )}
      </Formik>
    </View>
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

