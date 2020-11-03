import IRolesRepository from '../../repositories/IRolesRepository';
import IPublisher from '../infra/IPublisher';
import IRolesProducer from './IRolesProducer';

class RolesProducer implements IRolesProducer {
    constructor(
        private rolesRepository: IRolesRepository,
        private rolesPublisher: IPublisher,
    ) {}

    async addRoleToGroup(role_id: string, group_id: string): Promise<void> {
        const role = await this.rolesRepository.findById(role_id);

        if (!role) {
            // TODO: give feedback?
        }

        this.rolesPublisher.publish('addRoleToGroup', { role, group_id });
    }

    async removeRoleFromGroup(
        role_id: string,
        group_id: string,
    ): Promise<void> {
        this.rolesPublisher.publish('removeRoleFromGroup', {
            role_id,
            group_id,
        });
    }

    async delete(role_id: string): Promise<void> {
        this.rolesPublisher.publish('delete', { role_id });
    }

    async update(role_id: string): Promise<void> {
        const role = await this.rolesRepository.findById(role_id);

        if (!role) {
            // TODO: give feedback?
        }

        this.rolesPublisher.publish('update', { role });
    }
}

export default RolesProducer;
