{
  getPanel(ctx)::
    {
      title: 'Success Rate',
      type: 'timeseries',
      targets: [{
        expr: ctx.httpSuccessRateMetric,
        format: 'timeseries',
        legendFormat: '{{ `{{pod}}` }}',
        datasource: ctx.datasource,
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Rate',
            fillOpacity: 10,
          },
          unit: 'percentunit',
        },
      },
    },
}
