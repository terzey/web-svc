cat <<EOF
{
  "branch": "${GITHUB_REF_NAME:-local}",
  "timestamp": "$(date +"%Y-%m-%dT%H:%M:%S")",
  "commit": "${GITHUB_SHA:-0000000}"
}
EOF
