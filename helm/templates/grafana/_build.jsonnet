local grafana = import 'grafonnet/grafana.libsonnet';
local prometheus = grafana.prometheus;
local table = grafana.tablePanel;
local transformation = grafana.transformation;
{
  getPanel(job, component, datasource)::
    table.new(title='Build', datasource = datasource)
      .addTarget(
        prometheus.target(
          expr = 'web_svc_build{job="' + job + '"}',
          format = 'table',
          datasource = datasource
        )
      )
      .addTransformations([
          transformation.new(
            id = 'filterFieldsByName',
            options = {
              include: {
                names: [
                  'branch',
                  'chartVersion',
                  'commit',
                  'job',
                  'version'
                ]
              }
            }
          ),
          transformation.new(
            id = 'groupBy',
            options = {
              fields: {
                branch: {
                  aggregations: ['uniqueValues'],
                  operation: 'aggregate'
                },
                chartVersion: {
                  aggregations: ['uniqueValues'],
                  operation: 'aggregate'
                },
                commit: {
                  aggregations: ['uniqueValues'],
                  operation: 'aggregate'
                },
                job: {
                  aggregations: [],
                  operation: 'groupby'
                },
                version: {
                  aggregations: ['uniqueValues'],
                  operation: 'aggregate'
                }
              }
            }
          ),
          transformation.new(
            id = 'filterFieldsByName',
            options = {
              include: {
                names: [
                  'branch (uniqueValues)',
                  'chartVersion (uniqueValues)',
                  'commit (uniqueValues)',
                  'version (uniqueValues)'
                ]
              }
            }
          ),
          transformation.new(
            id = 'organize',
            options = {
              indexByName: {
                'branch (uniqueValues)': 2,
                'chartVersion (uniqueValues)': 0,
                'commit (uniqueValues)': 3,
                'version (uniqueValues)': 1
              },
              renameByName: {
                'branch (uniqueValues)': 'branch',
                'chartVersion (uniqueValues)': 'chartVersion',
                'commit (uniqueValues)': 'commit',
                'version (uniqueValues)': 'version'
              }
            }
          )
        ])
}
