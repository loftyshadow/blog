#!/bin/sh
set -e

echo "Setting up MySQL directory permissions..."

chown -R 999:999 /mysql-host/conf.d
chmod 755 /mysql-host/conf.d
chmod 644 /mysql-host/conf.d/*.cnf
chown -R 999:999 /mysql-host/log
chmod 755 /mysql-host/log

echo "MySQL directory setup completed."
