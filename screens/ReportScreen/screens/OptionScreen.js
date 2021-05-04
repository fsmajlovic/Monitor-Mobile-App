import React, { useContext, useState, Component } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import Console from '../../ConsoleScreen/Console';
import ConsoleLog from '../../ConsoleScreen/ConsoleLog';
import AccessControlScreen from '../../AccessControlScreen/AccessControlScreen';
import StatisticScreen from './StatisticScreen';


const OptionScreen = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Console' },
        { key: 'second', title: 'Console Log' },
        { key: 'third', title: 'Access Control' },
        { key: 'fourth',  title: 'Statistic'}
    ]);

    const renderScene = SceneMap({
        first: Console,
        second: ConsoleLog,
        third: AccessControlScreen,
        fourth: StatisticScreen
    });

    const { activeDevice } = useContext(DeviceContext);

    return (
        <View style={styles.container} testID="view">
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    )
}

export default OptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: 'black',
        textAlign: 'center',
        marginBottom:20
    },
    button: {

    }
});
