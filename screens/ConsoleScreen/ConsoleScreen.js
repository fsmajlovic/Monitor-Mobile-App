import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const styles = StyleSheet.create({
  textArea: {
    textAlignVertical: "top",
    height: "93%",
    justifyContent: "flex-start",
    backgroundColor:"#012456",
    color: "#D6FFFF"
  },
  inputArea:{
    height: "7%",
    justifyContent: "flex-start",
    backgroundColor:"#415c77",
    color: "#e5eaea",
  }
})

export default function ConsoleScreen({navigation}) {
  const [history,setHistory] = useState("");
  const [current,setCurrent] = useState("");
  return(
    <View>
      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Console >"
        placeholderTextColor="grey"
        multiline={true}
        editable = {false}
        value = {history}
      />
      <TextInput
        style={styles.inputArea}
        underlineColorAndroid="transparent"
        placeholder="Enter your commands here"
        placeholderTextColor="#e5eaea"
        value={current}
        onChangeText={(e)=>setCurrent(e)}
        onSubmitEditing={(event) => {
          setHistory(history+"\nconsole >"+event.nativeEvent.text);
          setCurrent("");
        }}
      ></TextInput>
    </View>
  );
}