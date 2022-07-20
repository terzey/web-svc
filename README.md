## Helm
[Helm s3](https://github.com/hypnoglow/helm-s3) plugin is used.
### Commands
#### Init repo
```shell
. bin/profile.sh && helm s3 init "${REPOSITORY_URL}" && 
```
#### Add repo
```shell
. bin/profile.sh && helm repo add "${REPOSITORY_NAME}" "${REPOSITORY_URL}"
```
#### Push chart to repo
```shell
bash bin/push-chart.sh
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
