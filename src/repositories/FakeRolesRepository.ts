import Role from '../interfaces/Role';
import IRolesRepository from './IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
    private roles: Role[] = [];

    async create(data: Role): Promise<Role> {
        this.roles.push(data);

        return data;
    }

    async findById(role_id: string, populate?: boolean): Promise<Role | null> {
        const role = this.roles.find(foundRole => foundRole._id === role_id);

        if (!role) {
            return null;
        }

        if (populate) {
            return role;
        }

        return role;
    }

    async save(role: Role): Promise<Role> {
        const findIndex = this.roles.findIndex(
            findRole => findRole._id === role._id,
        );

        this.roles[findIndex] = role;

        return role;
    }

    async delete(role_id: string): Promise<void> {
        this.roles = this.roles.filter(role => role._id !== role_id);
    }
}

export default FakeRolesRepository;
