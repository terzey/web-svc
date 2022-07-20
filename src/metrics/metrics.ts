import { MetricConfiguration } from 'prom-client';

export const APP_NAME = 'hello-nest';
export const PREFIX = 'hello_nest';

export const HttpRequestDurationSeconds: MetricConfiguration<string> = {
  name: `${PREFIX}_http_request_duration_seconds`,
  help: `Http request duration in seconds for ${APP_NAME}`,
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

export const MemoryPercents: MetricConfiguration<string> = {
  name: `${PREFIX}_memory_percents`,
  help: `Memory usage in percents for ${APP_NAME}`,
};

export const ProcessCpuSecondsTotal: MetricConfiguration<string> = {
  name: `${PREFIX}_process_cpu_seconds_total`,
  help: `Total user and system CPU usage in seconds for ${APP_NAME}`,
};

export const ProcessCpuLimitSeconds: MetricConfiguration<string> = {
  name: `${PREFIX}_process_cpu_limit_seconds`,
  help: `Limit for user and system CPU usage in seconds for ${APP_NAME}`,
};

export const ProcessCpuPercents: MetricConfiguration<string> = {
  name: `${PREFIX}_process_cpu_percents`,
  help: `User and system CPU usage in percents for ${APP_NAME}`,
};
