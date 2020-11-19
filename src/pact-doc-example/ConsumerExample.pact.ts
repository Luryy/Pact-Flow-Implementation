import path from 'path';

import {
    MessageConsumerPact,
    asynchronousBodyHandler,
} from '@pact-foundation/pact';
import { like, term } from '@pact-foundation/pact/dsl/matchers';

// 1 Dog API Handler
const dogApiHandler = async (dog: any): Promise<any> => {
    if (!dog.id && !dog.name && !dog.type) {
        throw new Error('missing fields');
    }
    return new Promise((resolve, _reject) => {
        console.log(dog);
        resolve({
            id: 1,
            name: 'fido',
            type: 'bulldog',
        });
    });

    // do some other things to dog...
    // e.g. dogRepository.save(dog)
};

// 2 Pact Message Consumer
const messagePact = new MessageConsumerPact({
    consumer: 'MyJSMessageConsumer',
    dir: path.resolve(process.cwd(), 'pacts'),
    pactfileWriteMode: 'update',
    provider: 'MyJSMessageProvider',
});

describe('receive dog event', () => {
    it('accepts a valid dog', () => {
        // 3 Consumer expectations
        return (
            messagePact
                .given('some state')
                .expectsToReceive('a request for a dog')
                .withContent({
                    id: like(1),
                    name: like('rover'),
                    type: term({
                        generate: 'bulldog',
                        matcher: '^(bulldog|sheepdog)$',
                    }),
                })
                .withMetadata({
                    'content-type': 'application/json',
                })

                // 4 Verify consumers' ability to handle messages
                .verify(asynchronousBodyHandler(dogApiHandler))
        );
    });
});
