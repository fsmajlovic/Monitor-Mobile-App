import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './Styles'
import Console from './Console'
import ConsoleLog from './ConsoleLog'

export default function ConsoleScreen({ navigation }) {
  const [state, setState] = useState('console');

  return (
    <View>
      {state === 'console' && (
        <View style={[styles.container, styles.container1]}>
          <Console navigation={navigation} />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { setState('consoleLog') }}>
              <Text style={styles.buttonText}>Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => { setState('console') }}>
              <Text style={styles.buttonText}>Tab</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {state === 'consoleLog' && (
        <View style={[styles.container, styles.container2]}>
          <ConsoleLog navigation={navigation} />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.consoleButton]}
              onPress={() => { setState('console') }}>
              <Text style={styles.consoleButtonText}>Console</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}