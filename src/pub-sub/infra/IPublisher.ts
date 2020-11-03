export default interface IPublisher {
    publish(operation: string, data: any): Promise<void>;
}
