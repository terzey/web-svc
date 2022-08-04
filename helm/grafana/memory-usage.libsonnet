{
  getPanel(job, component, datasource)::
    {
      title: 'Memory Usage',
      type: 'timeseries',
      targets: [{
        expr: 'web_svc_memory_usage_ratio{job="' + job + '"}',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}}` }}',
        datasource: datasource,
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
