curl -XDELETE 'http://192.168.0.22:9200/mtgcard'
curl -XPUT 'http://192.168.0.22:9200/mtgcard' -d @index_settings.json
curl -XPUT 'http://192.168.0.22:9200/mtgcard/mtgcard/_mapping' -d @index_mapping_mtg.json
curl -XPOST 'http://192.168.0.22:9200/_bulk' --data-binary @mtg.json