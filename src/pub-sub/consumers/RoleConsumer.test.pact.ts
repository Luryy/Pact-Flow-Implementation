import path from 'path';

import {
    MessageConsumerPact,
    asynchronousBodyHandler,
} from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import Role from '../../interfaces/Role';

const roleApiHandler = async (role: Role): Promise<Role> => {
    if (!role._id) {
        throw new Error('missing fields');
    }
    return new Promise((resolve, _reject) => {
        resolve({
            _id: 'any_id',
            alias: 'ADM',
            description: 'Permissão para administradores',
            title: 'Admin',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        });
    });
};

const messagePact = new MessageConsumerPact({
    consumer: 'RoleConsumer',
    dir: path.resolve(process.cwd(), 'pacts'),
    pactfileWriteMode: 'update',
    provider: 'RoleProducer',
});

describe('receive role event', () => {
    it('accepts a valid role', () => {
        return messagePact
            .given('some state')
            .expectsToReceive('update')
            .withContent({
                _id: like('any_id'),
                alias: like('ADM'),
                description: like('Permissão para administradores'),
                title: like('Admin'),
                created_at: like(new Date()),
                updated_at: like(new Date()),
            })
            .withMetadata({
                'content-type': 'application/json',
            })
            .verify(asynchronousBodyHandler(roleApiHandler));
    });
});
