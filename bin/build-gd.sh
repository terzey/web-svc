#!/usr/bin/env bash
set -ex

cat << EOF > helm/templates/grafana/_dashboard.json.tpl
{{ define "dashboard.json" }}
{{ \$Name := include "name" . }}
$(export JSONNET_PATH=grafonnet-lib/grafonnet; jsonnet -J grafonnet-lib helm/templates/grafana/_dashboard.jsonnet)
{{ end }}
EOF