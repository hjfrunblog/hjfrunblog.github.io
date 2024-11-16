# Kubernetes

`alias k="kubectl"`

```sh
k config set-context --current --namespace=dev
k create deployment hello-node --image=k8s.gcr.io/echoserver:1.10
k create deployment hello-node --image=k8s.gcr.io/echoserver:1.10 -n  dev
k get pods -n dev
k get events -n dev
k get svc
k expose deployment hello-node --type=LoadBalancer --port=8080 -n dev
k apply -f v1.yaml
k get deployments
k get replicaset
minikube service mywebapp
k logs -l app=mywebapp
k logs -f -l app=mywebapp
k rollout restart deployment mydeployment
k cordon minikube
k get nodes
k drain minikube --ignore-daemonsets=true --force
k drain minikube --ignore-daemonsets=true --force --delete-emptydir-data
```