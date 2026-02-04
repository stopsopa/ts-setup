#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# add --watch flag for dev mode

source "${DIR}/.env.sh"

set -e

/bin/bash "${DIR}/tsc.sh"

# Use --import tsx to load the TypeScript loader directly into the main Node.js process.
# This prevents double debugger attachment that occurs when the 'tsx' CLI spawns a child process.
node --import tsx "${@}"

