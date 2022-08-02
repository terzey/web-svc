local grafana = import 'grafonnet/grafana.libsonnet';
local prometheus = grafana.prometheus;
local gauge = grafana.gaugePanel;

{
  getPanel(job, component, datasource)::
    gauge.new(
      title='Memory Limits',
      datasource = datasource,
      reducerFunction = 'min',
      unit = 'bytes'
    )
    .addTarget(
      prometheus.target(
        expr = 'web_svc_memory_limit_bytes{job="' + job + '"}',
        format = 'table',
        legendFormat='{{ `{{job}}` }}',
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
          unit: 'bytes'
        }
      }
    }
    
}
