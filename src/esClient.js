import elasticsearch from 'elasticsearch';

const HOST = process.env.ES_HOST || "192.168.99.100:9200";

var client = new elasticsearch.Client({
  host: HOST,
});

export default client;
