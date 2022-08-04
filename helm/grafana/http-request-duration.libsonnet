{
  getPanel(job, component, datasource)::
    {
      title: 'Http Request Duration, 0.95 Quantile',
      type: 'timeseries',
      targets: [{
        expr: 'web_svc_http_request_duration_seconds{job="' + job + '", quantile="0.95"}',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}}{{handler}}` }}',
        datasource: datasource,
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Duration',
            fillOpacity: 10,
          },
          unit: 's',
        },
      },
    },
}
