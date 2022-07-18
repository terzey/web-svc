#!/usr/bin/env bash
set -ex

. bin/profile.sh

OUTPUT="$(helm package helm/)"
RELEASE="$(echo "${OUTPUT}" | sed -E 's/Successfully packaged chart and saved it to: (.+)/\1/')"
helm s3 push --relative "${RELEASE}" "${REPOSITORY_NAME}"
