<h1 align="center">PactFlow Implementation :scroll: </h1>

_This project have the implementation of_ [contract tests (click to know more about)](https://martinfowler.com/bliki/ContractTest.html) _with_ [PactFlow](https://docs.pact.io/) _and a [PactBroker](https://docs.pact.io/pact_broker/docker_images) for sharing Pact contracts and verification results._

### Starting

You should have [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/install/) instaled

- Clone the project:
```
git clone https://github.com/Luryy/Pact-Flow-Implementation.git
cd Pact-Flow-Implementation
```

- Start the environment:

```
docker-compose -f docker-compose.pact.yml up
* you should change the host number to your postgres container hash
PACT_BROKER_DATABASE_URL: "postgres://pactuser:docker@**930105e84c8a**/pactpostgres"
```

### Usage


- Run the contract tests:

```
yarn test consumer
yarn test publisher
```

- Publish your test to your pact broker

```
yarn pact:publish
```


Using pact broker:

- Access **```http://localhost:9292/```** - And you could see your published contract and their verified.


If want to change yours contract tests, see next topic **structure**.

### Structure

Here is the project structure:

```
.
├── node_modules
├── src
│   ├── config
│   │   └── pact.ts
│   ├── consumer
│   │   └── Consumer.pact.ts
│   ├── interfaces
│   │   └── Role.ts
│   ├── pact-doc-example
│   │   ├── ConsumerExample.pact.ts
│   │   └── PublisherExample.pact.ts
│   ├── producer
│   │   └── Producer.pact.ts
│   ├── routes
│   │   └── index.ts
│   ├── scripts
│   │   └── pact-publisher.ts
│   ├── app.ts
│   └── server.ts
├── docker-compose.pact.yml
├── jest.config.ts
├── package.json
├── prettier.config.js
├── README.md
├── tsconfig.json
└── yarn.lock

```
At **pact-doc-example** folder we have the contract test implementation as [Pacj docs](https://github.com/pact-foundation/pact-js#asynchronous-api-testing) recommend.

At **consumer** folder contain a more sophisticated consumer pact test, you could only duplicate **Consumer.pact.ts** to do new tests.
If you want to alter the test behavior, you should change ```withContent``` at test to require your expect data and change the api function to verify if this data is correct.

At **producer** folder contain a more sophisticated provider pact test, you could only duplicate **Provider.pact.ts** to do new tests.
If you want to alter the test behavior, you should change the api function to send the data expected.


To a better understanding you should open the files and see yours responsabilities - try to modificate then and don't forget to [read the docs](https://github.com/pact-foundation/pact-js#asynchronous-api-testing))!.


### PactBroker

![Screenshot from 2020-11-19 16-19-16](https://user-images.githubusercontent.com/59494158/99716751-40243b80-2a87-11eb-9e77-9a639e88cce1.png)



## Autor

👤 **Lucas Yuri**

- Github: [Luryy](https://github.com/luryy)
- LinkedIn: [Lucas Yuri](https://linkedin.com/in/lucas-yuri)


## 📝 License

Copyright © 2020 [Lucas Yuri](https://github.com/luryy).
This project is [MIT](LICENSE) licensed.


