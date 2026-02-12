#!/bin/bash

# Exit on error
set -e

# Create staging directory
mkdir -p site

# Move coverage to site/coverage
if [ -d "coverage" ]; then
    mv coverage site/
else
    echo "Error: coverage directory not found"
    exit 1
fi

# Copy the existing index.html to the root of the site
if [ -f "index.html" ]; then
    cp index.html site/
else
    echo "Error: index.html not found in root"
    exit 1
fi

echo "Staging directory 'site' prepared successfully for GitHub Pages."