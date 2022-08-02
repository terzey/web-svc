{
  getPanel(job, component, datasource)::
    {
      title: 'CPU CFS Throttled',
      type: 'timeseries',
      targets: [{
        expr: 'max by(pod) increase(container_cpu_cfs_throttled_periods_total{pod=~"' + job + '.*"}[120s]) / max by(pod) increase(container_cpu_cfs_periods_total{pod=~"' + job + '.*"}[120s])',
        format: 'timeseries',
        legendFormat: '{{ `{{pod}}` }}',
        datasource: datasource
      }],
      fieldConfig: {
        defaults: {
          custom: {
            axisLabel: 'Throttled',
            fillOpacity: 10
          },
          unit: 'percentunit'
        }
      }
    }
}
