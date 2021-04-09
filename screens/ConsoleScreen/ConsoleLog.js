import React, { useState } from 'react'
import { Text, View} from 'react-native';
import { styles } from './Styles'

export default function ConsoleLog({ navigation }) {


    const TableHead = [["User", "Date", "Command", "Response"]];

    const [TableData, setTableData] = useState([["User1", "Date1", "Command1", "Response1"], ["User2", "Date2", "Command2", "Response2"]]);

    return (
        <View style={styles.componentContainer}>
            {TableHead.map((row, index) => {
                return (
                    <View key={index} style={[styles.row, styles.logRow]}>
                        <Text style={styles.tableHead}>{row[0]}</Text>
                        <Text style={styles.tableHead}>{row[1]}</Text>
                        <Text style={styles.tableHead}>{row[2]}</Text>
                        <Text style={styles.tableHead}>{row[3]}</Text>
                    </View>
                )
            })}
            {TableData.map((row, index) => {
                return (
                    <View key={index} style={[styles.row, styles.logRow]}>
                        <Text>{row[0]}</Text>
                        <Text>{row[1]}</Text>
                        <Text>{row[2]}</Text>
                        <Text>{row[3]}</Text>
                    </View>
                )
            })}
        </View>
    );
};
