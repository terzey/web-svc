cat <<EOF
{
  "branch": "${GITHUB_REF:-local}",
  "timestamp": "$(date +"%Y-%m-%dT%H:%M:%S")",
  "commit": "${GITHUB_SHA:-0000000}"
}
EOF
