#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

while getopts f:h:u:p: option
do
case "${option}"
in
f) LOCUSTFILE=${OPTARG};;
h) LOCUSTHOST=${OPTARG};;
u) LOCUSTUSER=${OPTARG};;
p) LOCUSTPASSWORD=${OPTARG};;
esac
done

echo "Running $DIR/$LOCUSTFILE on host $LOCUSTHOST on localhost port 80"
echo

# Build the image if it doesn't exist yet
if [ "$(docker images -q rasch/locust 2> /dev/null)" == "" ]
then
  docker build -t rasch/locust -f $DIR/Dockerfile.locust .
fi

docker run -p 80:8089 --env LOCUSTUSER="$LOCUSTUSER" --env LOCUSTPASSWORD="$LOCUSTPASSWORD" -v $DIR:/scripts rasch/locust -f $LOCUSTFILE --host=$LOCUSTHOST