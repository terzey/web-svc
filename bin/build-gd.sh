#!/usr/bin/env bash
set -ex

cat << EOF > helm/templates/mon/_dashboard.json.tpl
{{ define "dashboard.json" }}
$(jsonnet helm/grafana/dashboard.jsonnet)
{{ end }}
EOF