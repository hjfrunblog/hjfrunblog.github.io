# Kubernetes

## Commands

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

## kind

```sh
brew install kind

kind create cluster

kubectl cluster-info --context kind-kind

kind delete cluster

kind create cluster # Default cluster context name is `kind`.
...
kind create cluster --name kind2

kind get clusters
kind
kind2

kubectl cluster-info --context kind-kind
kubectl cluster-info --context kind-kind2
kind create cluster --config kind-example-config.yaml
kubectl config use-context CONTEXT_NAME
k config use-context kind-kind2
kind delete cluster --name=kind-kind2
```

```yaml
name: kind-multi-node
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
- role: worker
- role: worker
- role: worker
```
