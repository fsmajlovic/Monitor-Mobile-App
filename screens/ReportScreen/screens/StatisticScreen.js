import React from 'react';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import StatisticsView from '../components/StatisticsView';


const StatisticScreen = () => {
    const { devices } = useContext(DeviceContext);
    return (
        <View>
            <StatisticsView dataSet={devices} />
        </View>
    )
}


export default StatisticScreen;