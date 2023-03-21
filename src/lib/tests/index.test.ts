import Whal3s from "../index";

it('Runs without crashing', () => {
    const Whal3sInstance = new Whal3s();
    Whal3sInstance.createValidationUtility('ca550f21-f70a-48fe-820b-e3b993bfd151')
});
