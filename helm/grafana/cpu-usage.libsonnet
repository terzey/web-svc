{
  getPanel(ctx)::
    {
      title: 'CPU Usage',
      type: 'timeseries',
      targets: [{
        expr: 'web_svc_process_cpu_usage_ratio{job="' + ctx.job + '"}',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}} `}}',
        datasource: ctx.datasource,
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Usage',
            fillOpacity: 10,
          },
          unit: 'percentunit',
        },
      },
    },
}
