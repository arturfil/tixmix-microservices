# TIX MIX MICROSERVICE APP

## I am going to create multiple npm projects.
- Each project will be a docler image
- We want to use kubernetes to handle the connection between each docker image
- We will be creating a clusterIp service for internal network communication
- For ease of use I also added a skaffold file to update the docker images,
  k8s deployment scripts and service scripts alongside with nginx server processes.