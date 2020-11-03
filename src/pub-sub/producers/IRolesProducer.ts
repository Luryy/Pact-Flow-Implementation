export default interface IRolesProducer {
    addRoleToGroup(role_id: string, group_id: string): Promise<void>;
    removeRoleFromGroup(role_id: string, group_id: string): Promise<void>;
    update(role_id: string): Promise<void>;
    delete(role_id: string): Promise<void>;
}
