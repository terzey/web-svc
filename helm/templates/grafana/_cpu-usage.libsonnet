local grafana = import 'grafonnet/grafana.libsonnet';
local prometheus = grafana.prometheus;
local graph = grafana.graphPanel;

{
  getPanel(job, component, datasource)::
    {
      title: 'CPU Usage',
      type: 'timeseries',
      targets: [{
        expr: 'web_svc_process_cpu_usage_ratio{job="' + job + '"}',
        format: 'timeseries',
        legendFormat: '{{`{{`}}pod{{`}}`}}',
        datasource: datasource
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Usage',
            fillOpacity: 10
          },
          unit: 'percentunit'
        }
      }
    }
}
