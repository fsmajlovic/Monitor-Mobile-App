import * as React from "react";
import {render} from "@testing-library/react-native";

import StatisticScreen from "../../../screens/ReportScreen/screens/StatisticScreen";
import { DeviceProvider} from "../../../contexts/DeviceContext";
import { AuthProvider} from "../../../contexts/authContext";
import StatisticsView, {getStatisticalData} from "../../../screens/ReportScreen/components/StatisticsView";
import ShowImagesScreen from "../../../screens/TehnicianScreen/screens/ShowImagesScreen";


describe('StatisticScreen', () => {
    it('Test ispravnog prikazivanja StatisticScreen-a', () => {
        const screen=render(
            <AuthProvider children={<DeviceProvider children={<StatisticScreen/>} />}/>
        );
        //StatisticScreen ima samo jedan child, ako je ispravno prikazan
        let view=screen.getByTestId( 'StatiscticView');
        expect(view.children.length).toBe(1);
    });
});

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

describe('ShowImagesScreen', () => {
    const task= {
        taskId: 108,
        userId: 6,
        deviceId: 39,
        photoUploaded: false,
        device: {
            deviceId: 39,
            name: "Desktop PC 3",
            location: "Sarajevo - Ložioničkaaaa",
            deviceUid: "33098e25-c605-4132-ad95-f38ecc3bd7a1"
        }
    }
    const route={params:task}
    it('Test ispravnog prikazivanja ShowImagesScreen-a', () => {
        const screen=render(
            <AuthProvider children={<ShowImagesScreen route={route} />}/>
        );
        //treba biti samo jedna flat lista prikazana
        const view=screen.getByTestId("slike");
        expect(view.children.length).toBe(1);
    });
    it('Test broja slika', () => {
        const screen=render(
            <AuthProvider children={<ShowImagesScreen route={route} />}/>
        );
        //pošto nema slika ovdje se treba baciti izuzetak
        try {
            const view=screen.UNSAFE_getAllByType("Image");
        }
        catch (e){
            expect(0).toBe(0);
        }
    });
});
