import React, {useState} from 'react'
import {Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ConsoleRow from './ConsoleRow'
import {styles} from './Styles' 

export default function ConsoleScreen({navigation}) {
  const [rows, setRows] = useState([]);

  const [history,setHistory] = useState("console > ");
  const [current,setCurrent] = useState("");

  const addRows = (tekst) => {
    setRows((prevRows) => {
      return (
        [...prevRows, tekst]
      )
    })
  }

  return(
    <View style={styles.container}>
      <ScrollView>
        <ConsoleRow rows={rows} />
        <View style={styles.row}>
          <Text style={styles.textArea}> IWM console > </Text>
          <TextInput 
            style={styles.inputArea} 
            value={current}
            onChangeText={(e)=>setCurrent(e)}
            placeholder="Enter your commands here"
            placeholderTextColor="#bbbbbb" 
            onSubmitEditing={(event) => {
              addRows(event.nativeEvent.text);
              setCurrent("");
          }}></TextInput>
        </View>
      </ScrollView>
    </View>
  );
}