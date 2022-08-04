{
  getPanel(job, component, datasource)::
    {
      title: 'Nodejs Eventloop Lag, 0.9 Quantile',
      type: 'timeseries',
      targets: [{
        expr: 'nodejs_eventloop_lag_p90_seconds{pod=~"' + job + '.*"}',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}}` }}',
        datasource: datasource,
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Lag',
            fillOpacity: 10,
          },
          unit: 's',
        },
      },
    },
}
