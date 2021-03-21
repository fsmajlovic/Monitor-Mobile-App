import React from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import {AuthContext} from '../../contexts/authContext';

export default function LoginScreen() {
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  
  const {signIn} = React.useContext(AuthContext);
  
  return(
        <View style={styles.container}>
        <TextInput
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={() => {
            signIn(username,password)}}
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
      input: {
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
      },
   });


