#! /usr/bin/bash

rm -rf *.zip;

cd ../monitor;

# Create the zip file, excluding .gitignore patterns and .git directory
zip -9 -r -x@.gitignore ../pulumi/app-monitor.zip ./* .ebextensions

# Return to pulumi directory and run pulumi up
cd ../pulumi && pulumi up