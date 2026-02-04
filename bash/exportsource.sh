
# script will properly export variables defined in .env file, where normally they are not prefixed with "export" keyword
#
# USAGE:
# eval "$(/bin/bash bash/exportsource.sh .env)"

if [ ! -f "${1}" ]; then
  echo "${0} error: file '${1}' doesn't exist"
  exit 1
fi

if [ "${2}" = "" ]; then
containsElement () {
    local e
    for e in "${@:2}"; do [[ "${e}" == "${1}" ]] && return 0; done
    return 1
}

ENV_VAR_LIST_EXISTING=();
while read -r ___ENV
do
  if [ "${___ENV}" != "" ] && [ "${!___ENV}" != "" ]; then
    ENV_VAR_LIST_EXISTING+=("${___ENV}")
  fi
done <<< "$(printenv | awk 'BEGIN {FS="="}{print $1}')"

{
source "${1}"
while read -r ___ENV
do
  if [ "${___ENV}" != "" ] && [ "${!___ENV}" != "" ]; then
    containsElement "${___ENV}" "${ENV_VAR_LIST_EXISTING[@]}"
    if [ "${?}" != "0" ]; then
      echo "export ${___ENV}=\"${!___ENV}\""
    fi
  fi

done <<< "$(cut -d= -f1 "${1}" | grep -v -E "^#")"
}
else
source "${1}"
export $(cut -d= -f1 "${1}" | grep -v -E "^#" | tr "\n" " ")
fi
