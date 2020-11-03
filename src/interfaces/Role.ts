export default interface Role {
    _id: string;
    title: string;
    description: string;
    alias: string;
    deleted_at: Date | null;
    created_at: Date;
    updated_at: Date;
}
