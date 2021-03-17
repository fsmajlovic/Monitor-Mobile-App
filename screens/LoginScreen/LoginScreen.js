import React from 'react'
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function LoginScreen() {
    return(
        <View style={styles.container}>
        <TextInput
          //value={this.state.username}
          //onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          //value={this.state.password}
          //onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          //onPress={this.onLogin.bind(this)}
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


