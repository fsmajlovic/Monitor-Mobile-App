import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, Image, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../contexts/authContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  
  const {signIn} = React.useContext(AuthContext);
  
  return(

        <View style={styles.container}>
            <LinearGradient
              colors={['#0D47A1', 'transparent']}
              style={styles.container}
            >

            <View style={styles.form}>
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
                <TouchableOpacity
                  style={styles.login}
                  onPress={() => {
                    signIn(username,password)}}>
                  <Text style={{color: 'white', }}>LOGIN</Text>
                </TouchableOpacity>
            </View>  
                
            </LinearGradient>
      </View>
      );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
  form:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    backgroundColor: 'white',

    borderRadius: 15,
  },
  monitor: {
    width: 100,
    height: 80,
    marginBottom: 10,
  },
  login: {
    backgroundColor: '#0D47A1',
    width: 150, 
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  }
});


