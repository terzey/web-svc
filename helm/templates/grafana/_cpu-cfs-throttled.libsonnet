local grafana = import 'grafonnet/grafana.libsonnet';
local prometheus = grafana.prometheus;
local graph = grafana.graphPanel;

{
  getPanel(job, component, datasource)::
    {
      title: 'CPU CFS throttled',
      type: 'timeseries',
      targets: [{
        expr: 'increase(container_cpu_cfs_throttled_periods_total{pod=~"' + job + '.*"}[120s]) / increase(container_cpu_cfs_periods_total{pod=~"' + job + '.*"}[120s])',
        format: 'timeseries',
        legendFormat: '{{`{{`}}pod{{`}}`}}',
        datasource: datasource
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Throttled, %',
            fillOpacity: 10
          },
          unit: 'percentunit'
        }
      }
    }
}
