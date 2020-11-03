import path from 'path';
import { MessageProviderPact } from '@pact-foundation/pact';
import Role from '../../interfaces/Role';

const roleApiClient = {
    createRole: (): Promise<Role> => {
        return new Promise((resolve, _reject) => {
            resolve({
                _id: 'any_id',
                alias: 'ADM',
                description: 'Permissão para administradores',
                title: 'any_role',
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: null,
            });
        });
    },
};

describe('Message provider tests', () => {
    const p = new MessageProviderPact({
        messageProviders: {
            update: () => roleApiClient.createRole(),
        },
        provider: 'RoleProvider',
        providerVersion: '1.0.0',
        pactUrls: [
            path.resolve(
                process.cwd(),
                'pacts',
                'roleconsumer-roleproducer.json',
            ),
        ],
    });

    describe('Role API Client', () => {
        it('sends some roles', () => {
            return p.verify();
        });
    });
});
