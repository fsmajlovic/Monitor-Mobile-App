import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'; 
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from 'formik';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../contexts/authContext';
import ModalDropdown from 'react-native-modal-dropdown';
import NumericInput from 'react-native-numeric-input';


async function postTask({token, location, description, date, deviceId, duration}) {
  try {
    const endTime = new Date(date);
    endTime.setHours(date.getHours() + duration.durationHr);
    endTime.setMinutes(date.getMinutes() + duration.durationMin);

    let response = await fetch("https://si-2021.167.99.244.168.nip.io/api/UserTasks", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({deviceId: deviceId,
      startTime: date,
      endTime: endTime,
      location: location,
      description: description,
      statusId: 1})
    });
    var json = await response.json();
  } catch (error) {
    console.error(error);
  }
};


export default function AddTask({navigation}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [durationHr, setDurationHr] = useState(0);
  const [durationMin, setDurationMin] = useState(0);
  const [deviceSelected, setDeviceSelected] = useState(false);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState({});
  const [devicesName, setDevicesName] = useState([]);
  const [locationName, setLocationName] = useState("");
  var { getSavedToken } = useContext(AuthContext);
  let deviceArray = ['No device selected'];

  useEffect(()=>{
    async function getData(getSavedToken){
        try {
            const token = await getSavedToken();
            const response = await fetch("https://si-2021.167.99.244.168.nip.io/api/device/AllDevices", {
                method: 'GET',
                headers: {"Authorization" : "Bearer "+ token},
              });
              var data = await response.json();
              var data = data.data;
               for(let device of data) {
                 deviceArray.push(device.name);
               }
              setDevices(data);
              setDevicesName(deviceArray);
        } catch (error) {
            console.error(error);
        }
    }
    getData(getSavedToken);
  }, []);

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

  const onSelectDropDown = (index) => {
    if(index == 0) {
      setDeviceSelected(false);
    }
    else {
      setDeviceSelected(true);
      setDevice(devices[index-1]);
      setLocationName(devices[index-1].location)
    }
  };


  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={styles.container}>
        <Formik
          initialValues={{description: ''}}
        >
          {props => (
            <View>
              <ModalDropdown
                style={styles.input}
                dropdownStyle={styles.dropdown}
                options={devicesName}
                onSelect = {onSelectDropDown}
                defaultValue = { "Pick device..." }
                textStyle = {{fontSize: 16, color:"#aaa"}}
                />

              <TextInput
                style={styles.input}
                multiline
                placeholder='Pick device to show location...'
                onChangeText={text => setLocationName(text)}
                value={locationName}
                editable={!deviceSelected}  
              />

              <TextInput
                style={styles.input2}
                multiline
                placeholder='Description...'
                onChangeText={props.handleChange('description')}
                value={props.values.description}
              />
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
              </View>
              <View style={{marginBottom: 20}}>
              <Text style={styles.text}>Set duration: </Text>
                    <View style={styles.labels}>
                    <Text style={styles.text2}>HOUR: </Text>
                    <NumericInput 
                              value={durationHr} 
                              onChange={value => setDurationHr(value)} 
                              totalWidth={140} 
                              totalHeight={35} 
                              iconSize={25}
                              step={1}
                              maxValue={24}
                              minValue={0}
                              valueType='real'
                              rounded 
                              textColor='#0D47A1' 
                              iconStyle={{ color: 'white' }} 
                              rightButtonBackgroundColor='#0074e8' 
                              leftButtonBackgroundColor='#0074e8'/>
                    </View>
                        <View style={styles.labels}>
                        <Text style={styles.text2}>MINUTES: </Text>
                    <NumericInput 
                              value={durationMin} 
                              onChange={value => setDurationMin(value)} 
                              totalWidth={140} 
                              totalHeight={35} 
                              iconSize={25}
                              step={5}
                              maxValue={60}
                              minValue={0}
                              valueType='real'
                              rounded 
                              textColor='#0D47A1' 
                              iconStyle={{ color: 'white' }} 
                              rightButtonBackgroundColor='#0074e8' 
                              leftButtonBackgroundColor='#0074e8'/>
                          </View>
              </View>     
                           
              <Button title="Add in calendar" onPress={
                async () => {
                  let token = await getSavedToken();
                  deviceSelected ?
                  await postTask({token, description: props.values.description, location: null, date, deviceId: device.deviceId, duration: {durationHr, durationMin}})
                  : await postTask({token, description: props.values.description, location: locationName, date, deviceId: null, duration: {durationHr, durationMin}}); 
                  navigation.goBack();
                }
              }/>
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
    width: 250,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  input2: {
    width: 250,
    height: 130,
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
  },
  labels: {
    flexDirection: 'row',
    alignItems:'center',
    marginVertical: 4,
    justifyContent: 'space-between'
  },
  dropdown: {
    width: 230,
    height: 240,
    padding: 10,
  }
});

