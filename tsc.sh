#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

export NODE_OPTIONS=""

if [[ "${CHECK}" != "false" ]]; then
  if [[ -z "${SILENT}" ]]; then
    cat <<EEE

  Type-checking ...

EEE
    npx tsc -p "${DIR}"
  else
    # if SILENT is present, only show output if tsc fails
    TSC_OUT=$(npx tsc -p "${DIR}" 2>&1) || {
      TSC_RET=$?
      printf "%s\n" "$TSC_OUT"
      exit $TSC_RET
    }
  fi
fi
