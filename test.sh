#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

source "${DIR}/.env.sh"

set -e

rm -rf "${DIR}/coverage"

# Run vitest with coverage
# If no arguments provided, it uses the include pattern from vitest.config.ts
node node_modules/.bin/vitest run --coverage "${@}"
