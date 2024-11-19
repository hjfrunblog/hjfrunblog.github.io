# ConfigMap

```sh
k create cm app-cm --from-literal=firstname=jason \                                                                                                                                                                   ─╯
> --from-literal=lastname=he

k get cm

k describe cm/app-cm

k create cm app-cm --from-file=app.config
k create cm app-cm --from-literal=firstname=Jason --from-literal=lastname=He --dry-run=client -o yaml > cm.yml
```

```yml
apiVersion: v1
data:
  firstname: piyush
  lastname: sachdeva
kind: ConfigMap
metadata:
  name: app-cm
---
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  labels:
    app.kubernetes.io/name: MyApp
spec:
  containers:
  - name: myapp-container
    image: busybox:1.28
    env:
    - name: FIRSTNAME
      valueFrom:
        configMapKeyRef:
          name: app-cm
          key: firstname
    command: ['sh', '-c', 'echo The app is running! && sleep 3600']
```