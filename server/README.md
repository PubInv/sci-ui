# Simple Server

This is a simple server to test PIRDS data ingestion and querying. QuestDB is a fast time-series database that suits the PIRDS format and hardly needs any setup. You can start sending data directly to QuestDB over UDP or TCP.

Run QuestDB on Docker:
https://questdb.io/docs/get-started/docker/

`docker run -p 9000:9000 -p 9009:9009 -p 8812:8812 -p 9003:9003 questdb/questdb`

Then open the web portal:
http://localhost:9000/
