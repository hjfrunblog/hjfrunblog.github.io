# Service

Re-create the kind cluster
```yml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30001
    hostPort: 30001
- role: worker
- role: worker
```

NodePort

```yml
apiVersion: v1
kind: Service
metadata:
  name: nodeport-svc
  labels:
    env: demo
spec:
  type: NodePort
  ports:
    - nodePort: 30001
      port: 80
      targetPort: 80
  selector:
    env: demo
```

ClusterIP
```yml
apiVersion: v1
kind: Service
metadata:
  name: cluster-svc
  labels:
    env: demo
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 80
  selector:
    env: demo
```

LoadBalancer
```yml
apiVersion: v1
kind: Service
metadata:
  name: lb-svc
  labels:
    env: demo
spec:
  type: LoadBalancer
  ports:
    - port: 80
  selector:
    env: demo
```

```sh
k create -f nodeport.yml

kind create cluster --config=kind.yml
k get ep
k expose rc nginx --port=80 --target-port=8000
```
