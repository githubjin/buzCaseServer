#!/bin/bash

HOST="http://192.168.99.100:9200"

if [ $1 ]; then
  HOST=$1
fi

# 0. delete pre index
# curl -XDELETE ${HOST}/buscase

# 1.create a index
curl -XPUT ${HOST}/buscase

# 2.create a mapping
curl -XPOST ${HOST}/buscase/article/_mapping -d'
{
    "article": {
        "properties": {
            "name": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_max_word"
            },
            "title": {
                "type": "text",
                "analyzer": "ik_max_word",
                "search_analyzer": "ik_max_word"
            },
            "user": {
                "type": "keyword",
                "index": false
            },
  	      	"createdAt": {
  		        "type": "date",
              "format": "yyy-MM-dd HH:mm"
  	      	}
        }
    }
}'
