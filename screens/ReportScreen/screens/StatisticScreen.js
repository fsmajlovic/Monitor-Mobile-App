import React from 'react';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import StatisticsView from '../components/StatisticsView';


const StatisticScreen = () => {
    const { activeDevice } = useContext(DeviceContext);
    return (
        <View>
            {<StatisticsView dataSet={activeDevice} />}
        </View>
    )
}


export default StatisticScreen;
