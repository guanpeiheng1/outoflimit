#!/bin/bash

ReadOneConf() {
	while read line
	do
		if [[ ${line} =~ ^hostname.*  ]];
		then
			hostname=${line##*=}
			HOSTNAMES="${HOSTNAMES}${hostname},"
		else
			SCRIPTS="${SCRIPTS}\n${line}"
		fi
	done < $1
}

main() {
	INPUT_DIR=$1
	OUTPUT_CONF=$2
	HOSTNAMES=""
	SCRIPTS=""

	for file in `ls ${INPUT_DIR}`
	do
		if [[ ${file} =~ .*conf$ ]];
		then
			ReadOneConf "${INPUT_DIR}/${file}"
		fi
	done

	echo "" > ${OUTPUT_CONF}
	echo "hostname =${HOSTNAMES}" >> ${OUTPUT_CONF}
	echo "" >> ${OUTPUT_CONF}
	echo -e ${SCRIPTS} >> ${OUTPUT_CONF}
}


if [ ! -n "$1" ] || [ ! -n "$2" ];
then
	echo "lack of params, params1: INPUT_DIR, params2: OUTPUT_CONF"
	exit 0
fi
main $1 $2
