import path from 'path';
import { MessageProviderPact } from '@pact-foundation/pact';

import FakeRolesRepository from '../../repositories/FakeRolesRepository';

import FakeFactoryPublisher from '../infra/fakes/FakePublisher';
import RoleProducer from '../producers/RolesProducer';

let fakeRolesRepository: FakeRolesRepository;
let fakeFactoryPublisher: FakeFactoryPublisher;
let roleProducer: RoleProducer;

describe('Message provider tests', () => {
    it('should respect the pact', async () => {
        fakeRolesRepository = new FakeRolesRepository();
        fakeFactoryPublisher = new FakeFactoryPublisher();
        roleProducer = new RoleProducer(
            fakeRolesRepository,
            fakeFactoryPublisher,
        );

        const id = 'any';

        await fakeRolesRepository.create({
            _id: id,
            alias: 'ADM',
            description: 'Permissão para administradores',
            title: 'Admin',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        });

        const p = new MessageProviderPact({
            messageProviders: {
                'a request for a dog': () => roleProducer.update(id),
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

        return p.verify();
    });
});
