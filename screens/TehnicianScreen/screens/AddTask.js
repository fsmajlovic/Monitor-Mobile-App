import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native'; 


export default function AddTask() {

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={'Lokacija'}
        style={styles.input}
      />

      <Button
        title={'Odaberi vrijeme'}
        //onPress={() => this.props.navigation.navigate('datepicker.js')}
      />

      <TextInput
        placeholder={'Opis problema...'}
        secureTextEntry={true}
        style={styles.input2}
      />

      <Button
        title={'Dodaj u kalendar'}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  time1: {
    width: 300,
    height: 200,
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },
  input2: {
    width: 200,
    height: 200,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },

});

