// import React from 'react';
// import { View, ScrollView, Text, StyleSheet } from 'react-native';
// import {Table, Row, Rows} from 'react-native-table-component';


// function getStatisticalData(dataSet){
//     let uniqueNames=[];
//     for(let i=0;i<dataSet.length;i++){
//         let object=dataSet[i];
//         uniqueNames.push(object.title);
//     }
//     uniqueNames = [...new Set(uniqueNames)];
//     let numberOfOccurrences=[]
//     for(let i=0;i<uniqueNames.length;i++){
//         let count=dataSet.filter(object=>object.title===uniqueNames[i]).length;
//         numberOfOccurrences.push([uniqueNames[i],count]);
//     }
//     return numberOfOccurrences;
// }

// const StatisticsView = (props) => {
//     const tableHead=["Računar", "Broj javljanja"];
//     const data=getStatisticalData(props.dataSet);
//     return (
//         <ScrollView horizontal={false}>
//             <View style={styles.container}>
//                 <Text style={{textAlign:"center"}}>
//                     Statistika
//                 </Text>
//                 <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
//                     <Row
//                     data={tableHead}
//                     style={styles.head}
//                     textStyle={styles.text}
//                     />
//                     <Rows data={data} textStyle={styles.text} />
//                 </Table>
//             </View>
//         </ScrollView>
//     )
//  }

// export default StatisticsView;

// const styles = StyleSheet.create({
//     container: {flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
//     head: {height: 40, backgroundColor: '#f1f8ff',alignItems:"center"},
//     text: {margin: 6},
// });