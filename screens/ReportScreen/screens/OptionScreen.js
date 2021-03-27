import React, { useContext, useState } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import ConsoleScreen from '../../ConsoleScreen/ConsoleScreen';
import AccessControlScreen from '../../AccessControlScreen/AccessControlScreen';
import StatisticScreen from './StatisticScreen';


const OptionScreen = ({ navigation }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Console' },
        { key: 'second', title: 'Access Control' },
        { key: 'third',  title: 'Statistic'}
    ]);

    const renderScene = SceneMap({
        first: ConsoleScreen,
        second: AccessControlScreen,
        third: StatisticScreen
    });

    const { activeDevice } = useContext(DeviceContext);
    return (
        <View style={styles.container}>
            {/*
            {
                console.log(activeDevice.name + " " + activeDevice.location) // Ovako se pristupa lokaciji i imenu kliknutog uredjaja
            }*/}
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
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
        marginBottom:20
    },
    button: {

    }
});
