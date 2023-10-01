## Helm
[Helm s3](https://github.com/hypnoglow/helm-s3) plugin is used.
## Helm
### Helm Repo Commands
#### Init repo
```shell
. bin/profile.sh && helm s3 init "${REPOSITORY_URL}"
```
#### Add repo
```shell
. bin/profile.sh && helm repo add "${REPOSITORY_NAME}" "${REPOSITORY_URL}"
```
#### Push chart to repo
```shell
bash bin/push-chart.sh
```
### Helm Chart Commands
Deploy
```shell
helm install --create-namespace --set mon.prometheus.install=true app ./helm
```
Update
```shell
helm upgrade app ./helm
```

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
Fix transitive dependencies: [stackoverflow](https://stackoverflow.com/questions/56634474/npm-how-to-update-upgrade-transitive-dependencies)
package.json
```json
"resolutions": {
"terser": ">=5.14.2"
}
```
```shell
npx npm-force-resolutions 
```
