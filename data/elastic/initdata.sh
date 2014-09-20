curl -XDELETE 'http://192.168.157.130:9999/mtgcard'
curl -XPUT 'http://192.168.157.130:9999/mtgcard' -d @index_settings.json
curl -XPUT 'http://192.168.157.130:9999/mtgcard/mtgcard/_mapping' -d @index_mapping_mtg.json
curl -XPOST 'http://192.168.157.130:9999/_bulk' --data-binary @mtg.json