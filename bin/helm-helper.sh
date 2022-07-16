#!/usr/bin/env bash
set -ex

. bin/.env.sh

# helm plugin install https://github.com/hypnoglow/helm-s3.git

REPOSITORY_NAME="hello-nest-dev"
REPOSITORY_URL="s3://k9s-helm-repository-bucket-dev/hello-nest/charts"

helm s3 init "${REPOSITORY_URL}"
helm repo add "${REPOSITORY_NAME}" "${REPOSITORY_URL}"


function create-repo() {
  helm s3 init "${REPOSITORY_URL}"
  helm repo add "${REPOSITORY_NAME}" "${REPOSITORY_URL}"
}

function push-chart() {
  local OUTPUT;
  OUTPUT="$(helm package helm/)"
  local RELEASE;
  RELEASE="$(echo "${OUTPUT}" | sed -E 's/Successfully packaged chart and saved it to: (.+)/\1/')"
  helm s3 push --relative "${RELEASE}" "${REPOSITORY_NAME}"
}

case $1 in
    "create-repo" )
      create-repo
      ;;
    "push-chart" )
      push-chart
      ;;
    *)
      cat <<EOF
Usage: bash bin/helm-app.sh CMD
CMD:
  - create-repo
  - push-chart
EOF
      ;;
esac
