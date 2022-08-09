{
  getPanel(ctx)::
    {
      type: 'gauge',
      title: 'Memory Limits',
      datasource: ctx.datasource,
      reducerFunction: 'min',
      unit: 'bytes',
      targets: [{
        expr: 'web_svc_memory_limit_bytes{job="' + ctx.job + '"}',
        format: 'table',
        legendFormat: '{{ `{{job}}` }}',
        datasource: ctx.datasource,
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
