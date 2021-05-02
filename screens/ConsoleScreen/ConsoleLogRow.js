import React from 'react'
import { Text, View } from 'react-native';
import { styles } from './Styles'

export default function ConsoleLogRow({ rows }) {

    const tableHead = ["User: ", "Date: ", "Command: ", "Response: "];

    return (
        <View>
            {rows.map((row, index) => {
                return (
                    <View key={index} style={styles.log} >
                        <View style={[styles.row, styles.logRow]}>
                            <Text style={styles.tableHead}>{tableHead[0]}</Text>
                            <Text style={styles.tableRow}>{row[0]}</Text>
                        </View>
                        <View style={[styles.row, styles.logRow]}>
                            <Text style={styles.tableHead}>{tableHead[1]}</Text>
                            <Text style={styles.tableRow}>{row[1].slice(0,19).replace("T", " ")}</Text>
                        </View>
                        <View style={[styles.row, styles.logRow]}>
                            <Text style={styles.tableHead}>{tableHead[2]}</Text>
                            <Text style={styles.tableRow}>{row[2]}</Text>
                        </View>
                        <View style={[styles.row, styles.logRow]}>
                            <Text style={styles.tableHead}>{tableHead[3]}</Text>
                            <Text style={styles.tableRow}>{row[3]}</Text>

                        </View>
                    </View>
                )
            })}
        </View>
    )
};