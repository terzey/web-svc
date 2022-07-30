{{- define "name" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 }}
{{- end }}
