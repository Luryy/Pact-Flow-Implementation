import path from 'path';

interface IPact {
    pactsDir: string;
    brokerUrl: string;
    consumerVersion: string;
    localPactUrl: (provider: string, consumer: string) => string;
    brokerPactUrl: (provider: string, consumer: string) => string;
}

const pactConfig: IPact = {
    pactsDir: path.resolve(process.cwd(), 'pacts'),
    brokerUrl: 'http://localhost:9292',
    consumerVersion: '1.0.0',
    localPactUrl(provider: string, consumer: string) {
        const providerLower = provider.toLocaleLowerCase();
        const consumerLower = consumer.toLocaleLowerCase();
        return path.resolve(
            process.cwd(),
            'pacts',
            `${consumerLower}-${providerLower}.json`,
        );
    },
    brokerPactUrl(provider: string, consumer: string) {
        return `${this.brokerUrl}/pacts/provider/${provider}/consumer/${consumer}/latest`;
    },
};

export default pactConfig;
