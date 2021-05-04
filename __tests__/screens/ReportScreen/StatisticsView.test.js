import {render} from "@testing-library/react-native";
import {AuthProvider} from "../../../contexts/authContext";
import StatisticsView, {getStatisticalData} from "../../../screens/ReportScreen/components/StatisticsView";
import * as React from "react";

describe('StatisticsView', () => {
    it('Test ispravnog prikazivanja StatisticView-a', () => {
        const dataSet={
            deviceId: 22,
            name: "Desktop PC 1",
            location: "Mostar - Braće Fejić"
        };
        const screen=render(
            <AuthProvider children={<StatisticsView dataSet={dataSet} />}/>
        );
        //StatisticView ima jedan naslov sa nazivom "Statistika" i jednu tabelu
        const view=screen.getByTestId( 'tabela');
        expect(view.children.length).toBe(2);

        //treba biti jedan red, jer se prikazuje statistika za jednu mašinu
        const table=view.children[1];
        const rows=table.children[0];
        expect(rows.children.length).toBe(1);
    });
    it('Test funkcije getStatisticalData', () => {
        const dataSet={
            "deviceStatusLogs": [
                {
                    "timeStamp": "2021-03-24T20:00:06.672809+00:00",
                    "deviceId": 22,
                    "message": "I'm alive",
                    "cpuUsage": 0.3,
                    "ramUsage": 0.4,
                    "hddusage": 0.2,
                    "gpuusage": 0.2,
                    "device": null
                },
                {
                    "timeStamp": "2021-03-24T20:00:11.672809+00:00",
                    "deviceId": 22,
                    "message": "I'm alive",
                    "cpuUsage": 0.2,
                    "ramUsage": 0.3,
                    "hddusage": 0.2,
                    "gpuusage": 0.1,
                    "device": null
                },
                {
                    "timeStamp": "2021-03-24T20:00:16.672809+00:00",
                    "deviceId": 22,
                    "message": "I'm alive",
                    "cpuUsage": 0.3,
                    "ramUsage": 0.3,
                    "hddusage": 0.2,
                    "gpuusage": 0.1,
                    "device": null
                },
                {
                    "timeStamp": "2021-03-24T20:00:21.672809+00:00",
                    "deviceId": 22,
                    "message": "I'm alive",
                    "cpuUsage": 0.4,
                    "ramUsage": 0.3,
                    "hddusage": 0.2,
                    "gpuusage": 0.2,
                    "device": null
                },
                {
                    "timeStamp": "2021-03-24T20:00:26.672809+00:00",
                    "deviceId": 22,
                    "message": "I'm alive",
                    "cpuUsage": 0.3,
                    "ramUsage": 0.3,
                    "hddusage": 0.2,
                    "gpuusage": 0.2,
                    "device": null
                }
            ],
            "averageGPUUsage": 0.16,
            "averageCPUUsage": 0.30000000000000004,
            "averageRamUsage": 0.32,
            "averageHDDUsage": 0.2
        };
        let niz=getStatisticalData("Desktop PC 1",dataSet)[0];
        expect(niz[0]).toEqual("Desktop PC 1");
        expect(niz[1]).toEqual(5);
    });
});
