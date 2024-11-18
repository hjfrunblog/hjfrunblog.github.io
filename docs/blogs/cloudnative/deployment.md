# Deployment

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploy
  labels:
    env: demo
spec:
  template:
    metadata:
      labels:
        env: demo
      name: nginx
    spec:
      containers:
      - image: nginx
        name: nginx
  replicas: 3
  selector:
    matchLabels:
      env: demo
```

```sh
k apply -f deploy.yml

k get deploy

k get all

k set image deploy/nginx-deploy nginx=nginx:1.9.1

k describe deploy nginx-deploy
k rollout history deploy/nginx-deploy
k rollout undo deploy/nginx-deploy

k create deploy deploy/nginx-new --image=nginx --dry-run=client -o yaml > deploy-new.yml
```
