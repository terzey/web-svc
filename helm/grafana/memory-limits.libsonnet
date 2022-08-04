{
  getPanel(job, component, datasource)::
    {
      type: 'gauge',
      title: 'Memory Limits',
      datasource: datasource,
      reducerFunction: 'min',
      unit: 'bytes',
      targets: [{
        expr: 'web_svc_memory_limit_bytes{job="' + job + '"}',
        format: 'table',
        legendFormat: '{{ `{{job}}` }}',
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
          unit: 'bytes',
        },
      },
    },
}
