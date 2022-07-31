local grafana = import 'grafonnet/grafana.libsonnet';
local prometheus = grafana.prometheus;
local gauge = grafana.gaugePanel;

{
  getPanel(job, component, datasource)::
    gauge.new(
      title='CPU Limits',
      datasource = datasource,
      reducerFunction = 'min',
      unit = 's'
    )
    .addTarget(
      prometheus.target(
        expr = 'web_svc_process_cpu_limit_seconds{job="' + job + '"}',
        format = 'table',
        legendFormat='{{`{{`}}job{{`}}`}}',
        datasource = datasource
      )
    )
    + 
    {
      fieldConfig: {
        defaults: {
          color: {
            fixedColor: 'green'
          },
          thresholds: {
            mode: 'absolute',
            steps: [{
              color: 'green',
              value: null
            }]
          },
          unit: 's'
        }
      }
    }
}
