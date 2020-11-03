import Role from '../interfaces/Role';

export default interface IRolesRepository {
    create(data: Role): Promise<Role>;
    findById(role_id: string, populate?: boolean): Promise<Role | null>;
    save(role: Role): Promise<Role>;
    delete(role_id: string): Promise<void>;
}
