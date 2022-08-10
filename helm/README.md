<!--- app-name: web-svc -->

# Template Web Service 
## Installing the Chart

To install the chart with the release name `my-release`:
```console
$ helm repo add web-svc-dev https://k8s-helm-repository-bucket-dev.s3.eu-west-1.amazonaws.com/web-svc/charts
$ helm install my-release web-svc-dev/web-svc
```

> **Tip**: List all releases using `helm list`

## Uninstalling the Chart

To uninstall/delete the `my-release` deployment:

```console
  helm delete my-release
```

## Parameters

### Common

| Name                                         | Description                                                                    | Value               |
| -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------- |
| `app.replicaCount`                           | Number of replicas to deploy. not used if `autoscaling. enabled` set to `true` | `1`                 |
| `app.image.registry`                         | web-svc image registry                                                         |  `docker.io`        |
| `app.image.name`                             | web-svc image name                                                             |  `terzey/web-svc`   |
| `app.image.tag`                              | web-svc image tag                                                              | `main-2022-08-09T18-24-17` |
| `app.service.port`                           | web-svc service port                                                           |  `3000`             |
| `app.limits.cpu`                             | CPU limits for containers                                                      |  `200m`             |
| `app.memory.memory`                          | Memory limits for containers                                                   |  `200Mi`            |
| `app.check.readiness.memoryPercentThreshold` | Container Memory usage in percents to stop accepting traffic                   |  `90`               |
| `infra.imagePullSecrets`                     | Docker registry secret names as an array                                       |  `["regcred"]`      |
| `ingress.install`                            | Enable ingress record generation for web-svc                                   |  `true`             |
| `ingress.className`                          | IngressClass that will be be used to implement the Ingress (Kubernetes 1.18+)  |  `nginx-ingress`    |
| `ingress.path`                               | Default path for the ingress record                                            |  `/api/v1(/|$)(.*)` |
| `ingress.target`                             | Target path for the ingress record                                             |  `/api/$2`          |

> **Tip**: For more information please refer to [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) and [Resource Management for Pods and Containers](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

### Autoscaling

| Name                                               | Description                                                                      | Value  |
| -------------------------------------------------- | -------------------------------------------------------------------------------- | ------ |
| `autoscaling.enabled`                              | Whether enable horizontal pod autoscale                                          | `true` |
| `autoscaling.minReplicas`                          | Configure a minimum amount of pods                                               |  `1`   |
| `autoscaling.imaxReplicas`                         | Configure a maximum amount of pods                                               |  `10`  |
| `autoscaling.targetCPUUtilizationPercentage`       | Define the CPU target to trigger the scaling actions (utilization percentage)    |  `60`  |
| `autoscaling.targetMemoryUtilizationPercentage`    | Define the memory target to trigger the scaling actions (utilization percentage) |  `75`  |
| `autoscaling.scaleDown.stabilizationWindowSeconds` | Stabilization window to restrict the flapping of replica count                   |  `300` |
| `autoscaling.scaleDown.percentage`                 | Percent of the current replicas to be scaled down in one period                  |  `100` |
| `autoscaling.scaleDown.periodSeconds`              | The length of time in the past for which the scale down policy must hold true    |  `15`  |
| `autoscaling.scaleUp.stabilizationWindowSeconds`   | Stabilization window to restrict the flapping of replica count                   |  `0`   |
| `autoscaling.scaleUp.percentage`                   | Percent of the current replicas to be scaled down in one period                  |  `50`  |
| `autoscaling.scaleUp.pods`                         | Number of the current replicas to be scaled down in one                          |  `2`   |
| `autoscaling.scaleUp.periodSeconds`                | The length of time in the past for which the scale up policy must hold true      |  `15`  |

> **Tip**: For more information please refer to [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)