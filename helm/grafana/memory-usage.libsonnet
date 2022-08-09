{
  getPanel(ctx)::
    {
      title: 'Memory Usage',
      type: 'timeseries',
      targets: [{
        expr: 'web_svc_memory_usage_ratio{job="' + ctx.job + '"}',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}}` }}',
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
