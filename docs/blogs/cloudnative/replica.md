# ReplicationController / ReplicaSet

`rc.yml`

```yml
apiVersion: v1
kind: ReplicationController
metadata:
  name: nginx-rc
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
```

`rs.yml`
```yml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx-rs
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
  replicas: 5
  selector:
    matchLabels:
      env: demo
```

```sh
k explain rc

k get rc

k apply -f rc.yml
k delete rc/nginx-rc
k edit rs/nginx-rs
k scale --replicas=10 rs/nginx-rs
k scale -h
```