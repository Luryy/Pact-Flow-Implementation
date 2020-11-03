import FakeRolesRepository from '../../repositories/FakeRolesRepository';

import FakeFactoryPublisher from '../infra/fakes/FakePublisher';
import RoleProducer from './RolesProducer';

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

        const id = 'any_id';

        const role = {
            _id: id,
            alias: 'ADM',
            description: 'Permissão para administradores',
            title: 'Admin',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };

        const publishSpy = jest.spyOn(fakeFactoryPublisher, 'publish');

        await fakeRolesRepository.create(role);

        await roleProducer.update(id);

        expect(publishSpy).toBeCalledWith('update', { role });
    });
});
