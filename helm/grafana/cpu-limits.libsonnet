{
  getPanel(job, component, datasource)::
    {
      type: 'gauge',
      title: 'CPU Limits',
      datasource: datasource,
      reducerFunction: 'min',
      unit: 's',
      targets: [{
        expr: 'web_svc_process_cpu_limit_seconds{job="' + job + '"}',
        format: 'table',
        legendFormat: '{{ `{{job}} `}}',
        datasource: datasource,
      }],
      fieldConfig: {
        defaults: {
          color: {
            fixedColor: 'green',
          },
          thresholds: {
            mode: 'absolute',
            steps: [{
              color: 'green',
              value: null,
            }],
          },
          unit: 's',
        },
      },
    },
}
