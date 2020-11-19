import path from 'path';

import {
    MessageConsumerPact,
    synchronousBodyHandler,
} from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/dsl/matchers';
import IRole from '../interfaces/Role';

const roleLike = {
    _id: 'any_id',
    alias: 'ADM',
    description: 'Permissão para administradores',
    title: 'Admin',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
};

const roleApiHandler = {
    create: ({ role }: { role: IRole }): void => {
        const roleKeys = Object.keys(roleLike);
        const recivedKeys = Object.keys(role);
        if (!roleKeys.every(key => recivedKeys.includes(key))) {
            throw new Error('missing fields');
        }
    },
};

const messagePact = new MessageConsumerPact({
    consumer: 'RoleConsumer',
    dir: path.resolve(process.cwd(), 'pacts'),
    pactfileWriteMode: 'update',
    provider: 'RoleProducer',
});

describe('RoleConsumer', () => {
    it('should have the correct params when recive update role message', () => {
        return messagePact
            .expectsToReceive('create')
            .withContent({
                role: like(roleLike),
            })
            .withMetadata({
                'content-type': 'application/json',
            })
            .verify(synchronousBodyHandler(roleApiHandler.create));
    });
});
