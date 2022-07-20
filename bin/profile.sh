#!/usr/bin/env bash
set -ex

DOT_ENV="./bin/.env.sh"
if [ -f "${DOT_ENV}" ]; then
  # shellcheck disable=SC1090
  . "${DOT_ENV}"
fi

export REPOSITORY_NAME="web-app-dev"
export REPOSITORY_URL="s3://k8s-helm-repository-bucket-dev/web-app/charts"
