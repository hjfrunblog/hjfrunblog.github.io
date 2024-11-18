# Pod

## Imperative Command

`k run nginx-pod --image=nginx:latest`

`pod.yml`

```yml
# This is a sample pod yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    env: demo
    type: frontend
spec:
  containers:
    - name: nginx-container
      image: nginx
      ports:
      - containerPort: 80
      resources:
        limits:
          memory: "128Mi"
          cpu: "500m"
        requests:
          memory: "64Mi"
          cpu: "250m"
```

```sh
k delete pod nginx-pod
k apply -f pod.yml
k edit pod nginx-pod    # 修改后直接生效，不需要继续apply

k exec -it nginx-pod -- sh

k run nginx --image=nginx --dry-run=client -o yaml > pod-new.yml
k run nginx --image=nginx --dry-run=client -o json > pod-new.json

k get pods nginx-pod --show-labels

k get pods -o wide
k get nodes -o wide
```