import {putTask} from '../../../screens/TehnicianScreen/screens/ImageUploadScreen';

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
            "photoUploaded": true,
            "device": null,
            "status": null,
            "user": null,
            "components": [],
            "userTrackers": []
        }
    }),
  })
);


beforeEach(() => {
  fetch.mockClear();
});

it("updating user task", async () => {

    let token = "";
    let startDate = new Date(), endDate = new Date();
    startDate.setHours(10, 3, 6, 42);
    startDate.setFullYear(2021, 5, 2);
    endDate.setHours(10, 3, 6, 42);
    endDate.setFullYear(2021, 5, 2);
    let description = "novi opis";
    const data = await putTask({ token, taskId: null, deviceId: null, startTime: startDate, endTime: endDate, location: "nova lokacija", description:description, statusId: 2 });
    
    expect(data.description).toEqual(description);
    expect(data.location).toEqual("nova lokacija");
    expect(data.startTime).toEqual("2021-05-02T10:03:06.042Z");
    expect(data.endTime).toEqual("2021-05-02T11:03:06.042Z");
    expect(data.statusId).toEqual(2);
    expect(fetch).toHaveBeenCalledTimes(1);
});