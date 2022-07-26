import { MetricConfiguration, SummaryConfiguration } from 'prom-client';

export const APP_NAME = 'web-svc';
export const PREFIX = 'web_svc';
const maxAgeSeconds = 5;
const ageBuckets = 5;
const percentiles = [0.01, 0.5, 0.95, 0.99];

export const HttpRequestDurationSeconds: SummaryConfiguration<string> = {
  name: `${PREFIX}_http_request_duration_seconds`,
  help: `Http request duration in seconds for ${APP_NAME}`,
  labelNames: ['handler', 'method', 'status_code'],
  maxAgeSeconds,
  ageBuckets,
  percentiles,
};

export const HttpRequestCountTotal: MetricConfiguration<string> = {
  name: `${PREFIX}_http_request_count_total`,
  help: `Total count of http requests for ${APP_NAME}`,
  labelNames: ['handler', 'method', 'status_code'],
};

export const UptimeSeconds: MetricConfiguration<string> = {
  name: `${PREFIX}_uptime_seconds`,
  help: `Uptime in seconds for ${APP_NAME}`,
};

export const Build: MetricConfiguration<string> = {
  name: `${PREFIX}_build`,
  help: `Build for ${APP_NAME}`,
  labelNames: ['branch', 'timestamp', 'commit', 'version', 'chartVersion'],
};

export const MemoryBytes: MetricConfiguration<string> = {
  name: `${PREFIX}_memory_bytes`,
  help: `Memory usage in bytes for ${APP_NAME}`,
};

export const MemoryLimitBytes: MetricConfiguration<string> = {
  name: `${PREFIX}_memory_limit_bytes`,
  help: `Memory limit in bytes for ${APP_NAME}`,
};

export const MemoryUsageRatio: MetricConfiguration<string> = {
  name: `${PREFIX}_memory_usage_ratio`,
  help: `Memory usage in [0-1] for ${APP_NAME}`,
};

export const ProcessCpuSecondsTotal: MetricConfiguration<string> = {
  name: `${PREFIX}_process_cpu_seconds_total`,
  help: `Total user and system CPU usage in seconds for ${APP_NAME}`,
};

export const ProcessCpuLimitSeconds: MetricConfiguration<string> = {
  name: `${PREFIX}_process_cpu_limit_seconds`,
  help: `Limit for user and system CPU usage in seconds for ${APP_NAME}`,
};

export const ProcessCpuUsageRatio: MetricConfiguration<string> = {
  name: `${PREFIX}_process_cpu_usage_ratio`,
  help: `User and system CPU usage in [0-1] for ${APP_NAME}`,
};

export const Watchdog: MetricConfiguration<string> = {
  name: `${PREFIX}_watchdog`,
  help: `This is an alert meant to ensure that the entire alerting pipeline is functional for ${APP_NAME}`,
};
