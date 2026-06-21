#!/bin/bash
# KvadroAir deploy script — run from Shell-клиент
# Usage: bash deploy.sh

set -e

WEBROOT="/var/www/u3553565/data/www/kvadroair.ru"
REPO_URL="https://github.com/EwEE-ECO/KLIMAT.git"
TEMP_DIR="/tmp/kvadroair-deploy-$$"

echo "=== KvadroAir Deploy ==="
echo "Webroot: $WEBROOT"

# Clean temp
rm -rf "$TEMP_DIR"

# Clone deploy branch
echo "Cloning deploy branch..."
git clone -b deploy --single-branch --depth 1 "$REPO_URL" "$TEMP_DIR"

# Copy files (excluding schema.sql for safety)
echo "Copying files..."
cp -r "$TEMP_DIR"/* "$WEBROOT/"

# Clean up
rm -rf "$TEMP_DIR"

echo "=== Done! ==="
