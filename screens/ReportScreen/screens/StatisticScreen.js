import React, { useContext } from 'react';
import { View } from 'react-native';
import { DeviceContext } from '../../../contexts/DeviceContext';
import StatisticsView from '../components/StatisticsView';


const StatisticScreen = () => {
    const { activeDevice } = useContext(DeviceContext);
    return (
        <View testID={'StatiscticView'}>
            <StatisticsView dataSet={activeDevice} />
        </View>
    )
}


export default StatisticScreen;
