{
  getPanel(job, component, datasource)::
    {
      type: 'table',
      title: 'Build',
      datasource: datasource,
      targets: [{
        expr: 'web_svc_build{job="' + job + '"}',
        format: 'table',
        datasource: datasource,
      }],
      transformations: [{
        id: 'filterFieldsByName',
        options: {
          include: {
            names: [
              'branch',
              'chartVersion',
              'commit',
              'job',
              'version',
            ],
          },
        },
      }, {
        id: 'groupBy',
        options: {
          fields: {
            branch: {
              aggregations: ['uniqueValues'],
              operation: 'aggregate',
            },
            chartVersion: {
              aggregations: ['uniqueValues'],
              operation: 'aggregate',
            },
            commit: {
              aggregations: ['uniqueValues'],
              operation: 'aggregate',
            },
            job: {
              aggregations: [],
              operation: 'groupby',
            },
            version: {
              aggregations: ['uniqueValues'],
              operation: 'aggregate',
            },
          },
        },
      }, {
        id: 'filterFieldsByName',
        options: {
          include: {
            names: [
              'branch (uniqueValues)',
              'chartVersion (uniqueValues)',
              'commit (uniqueValues)',
              'version (uniqueValues)',
            ],
          },
        },
      }, {
        id: 'organize',
        options: {
          indexByName: {
            'branch (uniqueValues)': 2,
            'chartVersion (uniqueValues)': 0,
            'commit (uniqueValues)': 3,
            'version (uniqueValues)': 1,
          },
          renameByName: {
            'branch (uniqueValues)': 'branch',
            'chartVersion (uniqueValues)': 'chartVersion',
            'commit (uniqueValues)': 'commit',
            'version (uniqueValues)': 'version',
          },
        },
      }],
    },
}
