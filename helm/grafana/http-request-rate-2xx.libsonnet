{
  getPanel(ctx)::
    {
      title: '2xx Http Request Rate, rps',
      type: 'timeseries',
      targets: [{
        expr: 'sum by(pod) (rate(web_svc_http_request_count_total{job="' + ctx.job + '", status_code=~\"2\\\\d\\\\d\"}[120s]))',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}} `}}',
        datasource: ctx.datasource,
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'RPS',
            fillOpacity: 10,
          },
          unit: 'reqps',
        },
      },
    },
}
