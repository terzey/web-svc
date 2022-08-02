{{- define "name" -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 }}
{{- end }}

{{- define "alert-rule-common-annotations" }}
instance: '{{ `{{ $labels.instance }}` }}'
pod: '{{ `{{ $labels.pod }}` }}'
value: '{{ `{{ $value }}` }}'
{{- end }}

