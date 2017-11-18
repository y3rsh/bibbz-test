#!/bin/bash

# Names
IMAGE_NAME=bibbz-test
REPOSITORY_TARGET=bibbz-test
YARN_CACHE_VOLUME_NAME=$REPOSITORY_TARGET-yarn-cache
# this is the path in the container of the yarn cach
# we persist this as a volume to speed things up 
YARN_CACHE_PATH=/yarn-cache

function build() {
  echo "building image"
  docker build . -t $IMAGE_NAME
  
  [ $? != 0 ] && \
    echo "Docker image build failed !" && exit 100
}

function interactive_run() {
  echo "starting interactive container, use exit to quit."
  echo "$PWD directory is being mounted to $REPOSITORY_TARGET"
  docker run -it --rm \
  --mount type=bind,source="`pwd`",target="/$REPOSITORY_TARGET" \
  -v $YARN_CACHE_VOLUME_NAME:$YARN_CACHE_PATH \
  --workdir /$REPOSITORY_TARGET \
  --shm-size 1gb \
  $IMAGE_NAME bash
  echo interactive container killed
}

function make_yarn_cache_volume() {
  if docker volume ls | grep "$YARN_CACHE_VOLUME_NAME"; then
    echo "docker volume found $YARN_CACHE_VOLUME_NAME"
  else
    echo "creating docker volume $YARN_CACHE_VOLUME_NAME"
    docker volume create $YARN_CACHE_VOLUME_NAME
  fi
}

make_yarn_cache_volume
build
interactive_run
