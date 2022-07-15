#!/usr/bin/env bash
set -ex

. bin/.env.sh

# helm plugin install https://github.com/hypnoglow/helm-s3.git
helm s3 init "${REPOSITORY_URL}"
helm repo add "${REPOSITORY_NAME}" "${REPOSITORY_URL}"
