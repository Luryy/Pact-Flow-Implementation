/* eslint-disable @typescript-eslint/no-unused-vars */
import IPublisher from '../IPublisher';

class FakePublisher implements IPublisher {
    publish(operation: string, data: any): Promise<void> {
        return Promise.resolve();
    }
}

export default FakePublisher;
