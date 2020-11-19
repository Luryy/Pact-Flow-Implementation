import path from 'path';
import { Publisher } from '@pact-foundation/pact';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PublisherOptions } from '@pact-foundation/pact-node';

const opts: PublisherOptions = {
    pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
    pactBroker: 'http://localhost:929/',
    consumerVersion: '1.0.0',
};

new Publisher(opts)
    .publishPacts()
    .then(() => console.log('Pacts successfully published'));
