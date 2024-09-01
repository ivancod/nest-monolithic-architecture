#!/bin/bash

# Define the project directories
DIRS=("nest-monolithic-architecture/server" "nest-monolithic-architecture/client")

# Navigate to the project directory and execute command
for dir in "${DIRS[@]}"
do
  cd /home/ivan/Desktop/$dir && docker compose down
done
