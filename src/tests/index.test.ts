/**
 * @jest-environment jsdom
 */
import Whal3s from "../index";

test('Runs without crashing', async () => {
    const Whal3sInstance = new Whal3s();
    await Whal3sInstance.createValidationUtility('ca550f21-f70a-48fe-820b-e3b993bfd151')
}, 20000);
