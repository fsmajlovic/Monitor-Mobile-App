import {submit} from '../../../screens/TehnicianScreen/screens/AddComponent';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
        data:
        {
            "componentId": 40,
            "type": "tip",
            "name": "ime",
            "quantity": 1,
            "taskId": 99,
            "task": null
        }
    }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it("submitting new component", async () => {
    let token = "";
    const data = await submit({ token, type: "tip", name: "ime", quantity: 1, taskId: 99, task: null });

    expect(data.type).toEqual("tip");
    expect(data.name).toEqual("ime");
    expect(data.quantity).toEqual(1);
    expect(data.taskId).toEqual(99);
    expect(fetch).toHaveBeenCalledTimes(1);
});
