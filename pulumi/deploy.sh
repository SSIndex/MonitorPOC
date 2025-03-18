#! /usr/bin/bash

rm -rf *.zip;

cd ..;

# Create the zip file, excluding .gitignore patterns and .git directory
zip -9 -r ./pulumi/app-monitor.zip . -x@./monitor/.gitignore -x ./.git\* && cd ./pulumi && pulumi up