# {{ $Name := include "name" . }}
local grafana = import 'grafonnet/grafana.libsonnet';
local dashboard = grafana.dashboard;
local build = import '_build.jsonnet';
local memoryLimits = import '_memory-limits.libsonnet';
local cpuLimits = import '_cpu-limits.libsonnet';
local memoryUsage = import '_memory-usage.libsonnet';
local cpuUsage = import '_cpu-usage.libsonnet';
local cpuCfsThrottled = import '_cpu-cfs-throttled.libsonnet';
local httpRequestDuration = import '_http-request-duration.libsonnet';
local nodejsEventloopLag = import '_nodejs-eventloop-lag.libsonnet';

local job =  '{{ $Name }}';
local component = '{{ .Chart.Name }}';
local datasource = {
  type: 'Prometheus',
  uid: '{{ .Values.mon.grafana.datasourceUid }}'
};

dashboard.new(
  title = job,
  tags=[component, job],
  editable = true,
)
# row 1, y = 0
.addPanel(build.getPanel(job, component, datasource), gridPos = { x: 0, y: 0, w: 24, h: 4 })
# row 2, y = 4
.addPanel(memoryLimits.getPanel(job, component, datasource), gridPos = { x: 0, y: 4, w: 6, h: 8 })
.addPanel(cpuLimits.getPanel(job, component, datasource), gridPos = { x: 6, y: 4, w: 6, h: 8 })
.addPanel(memoryUsage.getPanel(job, component, datasource), gridPos = { x: 12, y: 4, w: 12, h: 8 })
# row 3, y = 12
.addPanel(cpuUsage.getPanel(job, component, datasource), gridPos = { x: 0, y: 12, w: 12, h: 8 })
.addPanel(cpuCfsThrottled.getPanel(job, component, datasource), gridPos = { x: 12, y: 12, w: 12, h: 8 })
# row 4, y = 20
.addPanel(httpRequestDuration.getPanel(job, component, datasource), gridPos = { x: 0, y: 20, w: 12, h: 8 })
.addPanel(nodejsEventloopLag.getPanel(job, component, datasource), gridPos = { x: 12, y: 20, w: 12, h: 8 })
