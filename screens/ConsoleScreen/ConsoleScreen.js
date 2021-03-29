import React, { useState } from 'react'
import { Text, View, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { DeviceContext } from '../../contexts/DeviceContext';
import ConsoleRow from './ConsoleRow'
import { styles } from './Styles'
import { AuthContext } from '../../contexts/authContext';
import { serverURL } from '../../appConfig';
import { useContext } from 'react';

export default function ConsoleScreen({ navigation }) {
  //console.log(naziv);
  const group1 = ["?", "clear", "ls"];
  const group2 = ["cd", "echo", "erase", "kill", "move", "rd", "set"];

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [ip, setIp] = useState("");
  const [path, setPath] = useState("");


  const [rows, setRows] = useState([]);
  const [current, setCurrent] = useState("");
  const { activeDevice } = useContext(DeviceContext);
  //  console.log(activeDevice);

  const { getSavedToken } = React.useContext(AuthContext);

  const addRows = (tekst) => {
    setRows((prevRows) => {
      return (
        [...prevRows, tekst]
      )
    })
  };

  

  const getActiveDevice = async ()  => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
    let token = await getSavedToken();
    await getActiveDevices(token);

  }

  getActiveDevice();

  const getActiveDevices = async (token) => {

 //   console.log("Dosao neki zahtjev");

    fetch('https://si-grupa5.herokuapp.com/api/agent/online', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        "Authorization": "Bearer " + token,
      }
    })
      .then(res => res.json()).then(res => {

        const masina = [{
          "name": "ime2",
          "location": "lokacija",
          "ip": "1.1.1.1",
          "path": "PATH",
          "status": "status"
        }]

    //    console.log(res[0].name + " " + activeDevice.name);

        let i;
        for (i = 0; i < res.length; i++) {
          if (res[i].name === activeDevice.name) {
            setName(res[i].name);
            setLocation(res[i].location);
            setIp(res[i].ip);
            setPath(res[i].path);
          }
        }

        console.log("masina: " + name + " " + " " + location + " " + ip + " " + path);
      });

  }

  const sendRequest = async (command, token) => {

   // console.log("Token je " + token);

    //serverURL+ 'api/command'

    fetch('https://si-grupa5.herokuapp.com/api/command', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({
        'name': name,
        'location': location,
        'ip': ip,
        command: command,
        parameters: [],
        user: 'whoso@whoso.com'
      })
    })
      .then(res => res.json())
      .then(res => {
        //  Token = res.token;

        if (typeof res.message === 'undefined') {
        //  console.log(res.error);
          addRows(res.error)
       //   addRows("Not responding!");

        } else {
          addRows(res.message);
        }
      });
  }

  return (
    <View style={styles.container}>

      <ScrollView>
        <ConsoleRow rows={rows} />
        <View style={styles.row}>
         <Text style={styles.textArea}> {path}>  </Text>
          <TextInput
            style={styles.inputArea}
            value={current}
            onChangeText={(e) => setCurrent(e)}
            placeholder="..."
            placeholderTextColor="#bbbbbb"
            onSubmitEditing={async (event) => {
              let input = event.nativeEvent.text.replace(/ +/g, ' ').trim();
              let args = input.split(" ");
              let command = "";
              command = args[0].toLowerCase();


              addRows(path + "> " + event.nativeEvent.text);

              if ((group1.includes(command) && args.length == 1) || (group2.includes(command) && args.length == 2)) {
                //validna komanda
                if (group2.includes(command)) {
                  command += " " + args[1];
                }

                let token = await getSavedToken();
                sendRequest(command, token);
              } else {
                //nevalidna komanda
                addRows("Invalid command!");
              }

              setCurrent("");
            }}></TextInput>
        </View>
      </ScrollView>
    </View>
  );
}