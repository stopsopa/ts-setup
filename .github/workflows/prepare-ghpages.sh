#!/bin/bash

# Exit on error
set -e
set -x

# Define BRANCH_NAME
BRANCH_NAME="${GITHUB_REF_NAME}"

# Fallback for local testing if GITHUB_REF_NAME is not set
if [ -z "${BRANCH_NAME}" ]; then
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
fi

echo "${0}: Preparing deployment for branch: ${BRANCH_NAME}"

# Replicate logic:
# mkdir -p "gh-pages/${BRANCH_NAME}"
# mv coverage "gh-pages/${BRANCH_NAME}/"     

mkdir -p "gh-pages/${BRANCH_NAME}"

if [ ! -d "coverage" ]; then
    echo "${0} error: coverage directory not found"

    exit 1
fi

mv coverage "gh-pages/${BRANCH_NAME}/"

echo "${0}: Staging directory 'gh-pages/${BRANCH_NAME}' prepared successfully."