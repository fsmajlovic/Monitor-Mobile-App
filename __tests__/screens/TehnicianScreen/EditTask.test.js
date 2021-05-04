import {putTask, postTracker, timeDiffCalc} from '../../../screens/TehnicianScreen/screens/EditTask';

describe('EditTask', () => {
    it('time difference', () => {
        
        let date1 = new Date(), date2 = new Date();
        date1.setHours(20, 43, 6, 42);
        date1.setFullYear(2021, 5, 2);

        date2.setHours(22, 34, 8, 32);
        date2.setFullYear(2021, 5, 2);

        let difference = timeDiffCalc(date1, date2);
        expect(difference.diffHours).toEqual(1);
        expect(difference.diffMinutes).toEqual(51);
    });
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
        data:
        {
            "taskId": 141,
            "userId": 1,
            "deviceId": null,
            "startTime": "2021-05-02T10:03:06.042Z",
            "location": "nova lokacija",
            "description": "novi opis",
            "endTime": "2021-05-02T11:03:06.042Z",
            "statusId": 2,
            "photoUploaded": false,
            "device": null,
            "status": null,
            "user": null,
            "components": [],
            "userTrackers": [],
            "userTaskId": 141,
            "locationLongitutde": 43.87965827732308,
            "locationLatitude": 18.397856907797973,
            "time": "2021-05-02T10:03:06.042Z"
        }
    }),
  })
);


beforeEach(() => {
  fetch.mockClear();
});

it("updating user task", async () => {

    let token = "";
    let date = new Date();
    date.setHours(10, 3, 6, 42);
    date.setFullYear(2021, 5, 2);
    let description = "novi opis";
    const data = await putTask({ token, description: description, location: "nova lokacija", date, taskId: null, deviceId: null, duration: { durationHr:1, durationMin:0 }, status: 2 });
    
    expect(data.description).toEqual(description);
    expect(data.location).toEqual("nova lokacija");
    expect(data.startTime).toEqual("2021-05-02T10:03:06.042Z");
    expect(data.endTime).toEqual("2021-05-02T11:03:06.042Z");
    expect(data.statusId).toEqual(2);
    expect(fetch).toHaveBeenCalledTimes(1);
});

it("posting new tracker", async () => {
    let token = "";
    let date = new Date();
    date.setHours(10, 3, 6, 42);
    date.setFullYear(2021, 5, 2);
    let longitude = 43.87965827732308;
    let latitude = 18.397856907797973;
    const data = await postTracker({token, userTaskId: 141, locationLongitude:longitude, locationLatitude:latitude, time: date});
    
    expect(data.userTaskId).toEqual(141);
    expect(data.locationLongitutde).toEqual(longitude);
    expect(data.locationLatitude).toEqual(latitude);
    expect(data.time).toEqual("2021-05-02T10:03:06.042Z");
    expect(fetch).toHaveBeenCalledTimes(1);
});