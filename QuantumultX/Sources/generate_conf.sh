#!/bin/bash

ReadOneConf() {
	while read -r line
	do
		if [[ ${line} =~ ^hostname.*  ]];
		then
			hostname=${line##*=}
			HOSTNAMES="${HOSTNAMES}${hostname},"
		else
			SCRIPTS[${#SCRIPTS[@]}]="${line}"
		fi
	done < $1
}

main() {
	INPUT_DIR=$1
	OUTPUT_CONF=$2
	HOSTNAMES=""
	SCRIPTS=()

	# 保存默认的 IFS 并指定为新的分隔符，避免按照空格分隔
	IFSBAK=$IFS 
	IFS=$'\n'

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
	for i in ${SCRIPTS[@]}
	do
		echo $i >> ${OUTPUT_CONF}
	done

	# 还原默认分隔符
	IFS=$IFSBAK
}


if [ ! -n "$1" ] || [ ! -n "$2" ];
then
	echo "lack of params, params1: INPUT_DIR, params2: OUTPUT_CONF"
	exit 0
fi
main $1 $2
