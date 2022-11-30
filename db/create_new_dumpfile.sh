#!/usr/bin/env bash
# Create a new dumpfile for the mdhb_test mysql database
# This script is intended to be run from the root of the project
# It will create a new dumpfile.sql in the db directory

# remove the old dumpfile, if it exists
rm -f db/dumpfile.sql

# create a new dumpfile
mysqldump -u root -p mdhb_test > db/dumpfile.sql
