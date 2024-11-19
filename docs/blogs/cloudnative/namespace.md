# Namespace

```sh
k get ns
k create ns demo
k delete ns demo

k create deploy nginx-demo --image=nginx -n demo
k scale --replicas=3 deploy/nginx-demo -n demo
k expose deploy/nginx-demo --name=svc-demo --port 80 -n demo
k expose deploy/nginx-test --name=svc-test --port 80
cat /etc/resolv.conf
```

```yml
apiVersion: v1
kind: Namespace
metadata:
  name: demo
```
