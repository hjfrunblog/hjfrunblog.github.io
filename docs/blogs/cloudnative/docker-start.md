# Docker 基础

## Command

```sh
# build image
docker build -t day02-todo .

# push image
docker login
docker tag day02-todo:latest hjfrun/day02-todo:1.0.0
docker images
docker push hjfrun/day02-todo:1.0.0

# pull image
docker pull hjfrun/day02-todo:1.0.0

# run the container
docker run -dp 3000:3000 hjfrun/day02-todo:1.0.0

# enter (exec) the container
docker exec -it containername sh
or
docker exec -it containerid sh

# To view docker logs
docker logs containername
or
docker logs containerid

# To view the content of Docker container
docker inspect

# delete image
docker image rm image-id
```