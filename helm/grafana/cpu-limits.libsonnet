{
  getPanel(ctx)::
    {
      type: 'gauge',
      title: 'CPU Limits',
      datasource: ctx.datasource,
      reducerFunction: 'min',
      unit: 's',
      targets: [{
        expr: 'web_svc_process_cpu_limit_seconds{job="' + ctx.job + '"}',
        format: 'table',
        legendFormat: '{{ `{{job}} `}}',
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
          unit: 's',
        },
      },
    },
}
