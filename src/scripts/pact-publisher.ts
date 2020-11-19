import { Publisher } from '@pact-foundation/pact';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PublisherOptions } from '@pact-foundation/pact-node';

import pactConfig from '../config/pact';

const opts: PublisherOptions = {
    pactFilesOrDirs: [pactConfig.pactsDir],
    pactBroker: pactConfig.brokerUrl,
    consumerVersion: pactConfig.consumerVersion,
};

new Publisher(opts)
    .publishPacts()
    .then(() => console.log('Pacts successfully published'));
