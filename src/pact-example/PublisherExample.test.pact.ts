import path from 'path';
import { MessageProviderPact } from '@pact-foundation/pact';

// 1 Messaging integration client
const dogApiClient = {
    createDog: () => {
        return new Promise((resolve, _reject) => {
            resolve({
                id: 1,
                name: 'fido',
                type: 'bulldog',
            });
        });
    },
};

describe('Message provider tests', () => {
    // 2 Pact setup
    const p = new MessageProviderPact({
        messageProviders: {
            'a request for a dog': () => dogApiClient.createDog(),
        },
        provider: 'MyJSMessageProvider',
        providerVersion: '1.0.0',
        pactUrls: [
            path.resolve(
                process.cwd(),
                'pacts',
                'myjsmessageconsumer-myjsmessageprovider.json',
            ),
        ],
    });

    // 3 Verify the interactions
    describe('Dog API Client', () => {
        it('sends some dogs', () => {
            return p.verify();
        });
    });
});
