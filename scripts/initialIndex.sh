#!/bin/bash

HOST="http://192.168.99.100:9200"

if [ $1 ]; then
  HOST=$1
fi

# 0. delete pre index
# curl -XDELETE ${HOST}/buscase
curl -XDELETE ${HOST}/buscase_ik
curl -XDELETE ${HOST}/buscase_standard

# 1.create a index
curl -XPUT ${HOST}/buscase_ik
curl -XPUT ${HOST}/buscase_standard

# 2.create a mapping
curl -XPOST ${HOST}/buscase_ik/article/_mapping -d'
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
                "index": true
            },
            "id": {
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
# 
curl -XPOST ${HOST}/buscase_standard/article/_mapping -d'
{
    "article": {
        "properties": {
            "name": {
                "type": "text",
                "analyzer": "standard",
                "search_analyzer": "standard"
            },
            "title": {
                "type": "text",
                "analyzer": "standard",
                "search_analyzer": "standard"
            },
            "user": {
                "type": "keyword",
                "index": true
            },
             "id": {
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
# 
curl -XPOST ${HOST}/_aliases -d'
{
    "actions" : [
        { "add" : { "indices" : ["buscase_ik", "buscase_standard"], "alias" : "buscase" } }
    ]
}'
