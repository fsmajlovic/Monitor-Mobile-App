import AddTask, {postTask} from '../../../screens/TehnicianScreen/screens/AddTask';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthProvider} from "../../../contexts/authContext";
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
        data:
        {
            "taskId": 141,
            "userId": 1,
            "deviceId": null,
            "startTime": "2021-05-02T20:43:06.042Z",
            "location": "lokacija",
            "description": "testni opis",
            "endTime": "2021-05-02T21:43:06.042Z",
            "statusId": 1,
            "photoUploaded": false,
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

it("description of new task", async () => {
    let token = "";
    let date = new Date();
    date.setHours(20, 43, 6, 42);
    date.setFullYear(2021, 5, 2);
    let description = "testni opis";
    const data = await postTask({token, description: description, location: "lokacija", date, deviceId: null, duration: {durationHr:1, durationMin:0}});

    expect(data.description).toEqual(description);
    expect(data.location).toEqual("lokacija");
    expect(data.startTime).toEqual("2021-05-02T20:43:06.042Z");
    expect(data.endTime).toEqual("2021-05-02T21:43:06.042Z");
    expect(fetch).toHaveBeenCalledTimes(1);
});

it('renders text input components ', () => {
  let d = new Date();
  const mockRoute = {
    params: { task: {
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
    }
  }

  const mockNavigation = {
    push: jest.fn()
}

   const {getAllByPlaceholderText} = render(<AuthProvider children={<AddTask navigation={mockNavigation} />}/>);
   
  expect(getAllByPlaceholderText("Pick device to show location...").length).toBe(1);
  expect(getAllByPlaceholderText("Description...").length).toBe(1); 
}) 
