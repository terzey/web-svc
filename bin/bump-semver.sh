#!/usr/bin/env bash
set -ex

# Usage:
# bash bin/bump-semver.sh helm/Chart.yaml MAJOR|MINOR|PATCH [package.json] [MAJOR|MINOR|PATCH]

. bin/profile.sh

CHART_PATH="${1}"
BUMP_CHART_VERSION="${2}"
PACKAGE_JSON_PATH="${3}"
BUMP_APP_VERSION="${4}"

function bump_semver() {
  local SEMVER="${1}"
  local BUMP="${2}" 
  local VERSIONS;
  read -ra VERSIONS <<< "$(echo "${SEMVER}" | tr "." " ")"
  local MAJOR="${VERSIONS[0]}"
  local MINOR="${VERSIONS[1]}"
  local PATCH="${VERSIONS[2]}"
  case ${BUMP} in
  MAJOR)
    MAJOR=$(( MAJOR + 1 ))
    ;;
  MINOR)
    MINOR=$(( MINOR + 1 ))
    ;;
  *)
    PATCH=$(( PATCH + 1 ))
    ;;
  esac
  retval="${MAJOR}.${MINOR}.${PATCH}"
}

CHART_NAME=$(yq '.name' "${CHART_PATH}")
helm repo update
SEARCH="$(helm search repo "${CHART_NAME}" | grep "${CHART_NAME}")"
read -ra TOKENS <<<"${SEARCH}"
CHART_VERSION="${TOKENS[1]}"
APP_VERSION="${TOKENS[2]}"

if [ -n "${BUMP_CHART_VERSION}" ]; then
  bump_semver "${CHART_VERSION}" "${BUMP_CHART_VERSION}"
  yq ".version = \"${retval}\"" "${CHART_PATH}" > "${CHART_PATH}.tmp"
  mv "${CHART_PATH}.tmp" "${CHART_PATH}"
fi

if [ -n "${BUMP_APP_VERSION}" ]; then
  bump_semver "${APP_VERSION}" "${BUMP_APP_VERSION}"
  yq ".appVersion = \"${retval}\"" "${CHART_PATH}" > "${CHART_PATH}.tmp"
  mv "${CHART_PATH}.tmp" "${CHART_PATH}"
  jq ".version =\"${retval}\"" "${PACKAGE_JSON_PATH}" > "${PACKAGE_JSON_PATH}.tmp"
  mv "${PACKAGE_JSON_PATH}.tmp" "${PACKAGE_JSON_PATH}"
fi
