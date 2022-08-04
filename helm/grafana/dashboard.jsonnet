local build = import 'build.jsonnet';
local cpuCfsThrottled = import 'cpu-cfs-throttled.libsonnet';
local cpuLimits = import 'cpu-limits.libsonnet';
local cpuUsage = import 'cpu-usage.libsonnet';
local httpRequestDuration = import 'http-request-duration.libsonnet';
local memoryLimits = import 'memory-limits.libsonnet';
local memoryUsage = import 'memory-usage.libsonnet';
local nodejsEventloopLag = import 'nodejs-eventloop-lag.libsonnet';
local httpRequestRate2xx = import 'http-request-rate-2xx.libsonnet';
local httpRequestRate5xx = import 'http-request-rate-5xx.libsonnet';

local job = '{{ .name }}';
local component = '{{ .component }}';
local datasource = {
  type: '{{ .datasourceType }}',
};
local timepicker = {
  refresh_intervals: [
    '5s',
    '10s',
    '30s',
    '1m',
    '5m',
    '15m',
    '30m',
    '1h',
    '2h',
    '1d',
  ],
  time_options: [
    '5m',
    '15m',
    '1h',
    '6h',
    '12h',
    '24h',
    '2d',
    '7d',
    '30d',
  ],
};

{
  title: job,
  editable: true,
  style: 'dark',
  tags: [component, job],
  time_from: 'now-15m',
  time_to: 'now',
  timezone: 'browser',
  refresh: '5s',
  timepicker: timepicker,
  hideControls: false,
  schemaVersion: 14,
  panels: [
    // row 1, y: 0
    build.getPanel(job, component, datasource) + { gridPos: { x: 0, y: 0, w: 24, h: 4 } },

    // row 2, y: 4
    memoryLimits.getPanel(job, component, datasource) + { gridPos: { x: 0, y: 4, w: 6, h: 8 } },
    cpuLimits.getPanel(job, component, datasource) + { gridPos: { x: 6, y: 4, w: 6, h: 8 } },
    memoryUsage.getPanel(job, component, datasource) + { gridPos: { x: 12, y: 4, w: 12, h: 8 } },

    // row 3, y: 12
    cpuUsage.getPanel(job, component, datasource) + { gridPos: { x: 0, y: 12, w: 12, h: 8 } },
    cpuCfsThrottled.getPanel(job, component, datasource) + { gridPos: { x: 12, y: 12, w: 12, h: 8 } },

    // row 4, y: 20
    httpRequestDuration.getPanel(job, component, datasource) + { gridPos: { x: 0, y: 20, w: 12, h: 8 } },
    nodejsEventloopLag.getPanel(job, component, datasource) + { gridPos: { x: 12, y: 20, w: 12, h: 8 } },

    // row 5, y: 28
    httpRequestRate2xx.getPanel(job, component, datasource) + { gridPos: { x: 0, y: 28, w: 12, h: 8 } },
    httpRequestRate5xx.getPanel(job, component, datasource) + { gridPos: { x: 12, y: 28, w: 12, h: 8 } },

    // row 5, y: 36
    // xyz.getPanel(..., ...)
  ],
}
