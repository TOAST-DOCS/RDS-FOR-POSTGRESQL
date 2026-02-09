## Database > RDS for PostgreSQL > DB拡張機能

## DB拡張機能
あらかじめビルドされた拡張機能をPostgreSQLにインストールして機能を拡張することができます。NHN CloudのRDS for PostgreSQLでサポートする拡張機能は次のとおりです。

### PostgreSQL基本提供機能

`auto_explain`拡張はパラメータグループの`shared_preload_libraries`パラメータに追加して、セッション全体に適用できます。残りの拡張機能はSUPERUSER権限が必要な場合、[拡張管理](db-instance/#extension)項目を参考にして制御したり、[CREATE EXTENSION](https://www.postgresql.org/docs/17/sql-createextension.html)構文で必要な拡張機能をインストールできます。

| 拡張機能名              | PostgreSQL14提供バージョン | PostgreSQL17提供バージョン | SUPERUSER権限 | 備考           | Webサイト                                                   |
|--------------------|---------------------|---------------------|-------------|--------------|----------------------------------------------------------|
| auto_explain       | -                   | -                   | O           |              | https://www.postgresql.org/docs/17/auto-explain.html     |
| citext             | 1.6                 | 1.6                 |             |              | https://www.postgresql.org/docs/17/citext.html           |
| cube               | 1.5                 | 1.5                 |             |              | https://www.postgresql.org/docs/17/cube.html             |
| dblink             | 1.2                 | 1.2                 | O           |              | https://www.postgresql.org/docs/17/dblink.html           |
| earthdistance      | 1.1                 | 1.2                 | O           | cubeインストール必要 | https://www.postgresql.org/docs/17/earthdistance.html    |
| fuzzystrmatch      | 1.1                 | 1.2                 |             |              | https://www.postgresql.org/docs/17/fuzzystrmatch.html    |
| hstore             | 1.8                 | 1.8                 |             |              | https://www.postgresql.org/docs/17/hstore.html           |
| intarray           | 1.5                 | 1.5                 |             |              | https://www.postgresql.org/docs/17/intarray.html         |
| isn                | 1.2                 | 1.2                 |             |              | https://www.postgresql.org/docs/17/isn.html              |
| lo                 | 1.1                 | 1.1                 |             |              | https://www.postgresql.org/docs/17/lo.html               |
| ltree              | 1.2                 | 1.3                 |             |              | https://www.postgresql.org/docs/17/ltree.html            |
| pg_stat_statements | 1.9                 | 1.11                | O           |              | https://www.postgresql.org/docs/17/pgstatstatements.html |
| pg_trgm            | 1.6                 | 1.6                 |              |            | https://www.postgresql.org/docs/17/pgtrgm.html           |
| pgcrypto           | 1.2                 | 1.2                 |             |              | https://www.postgresql.org/docs/17/pgcrypto.html         |
| pgrowlocks         | 1.1                 | 1.1                 | O           |              | https://www.postgresql.org/docs/17/pgrowlocks.html       |
| postgres_fdw       | 1.0                 | 1.0                 | O           |              | https://www.postgresql.org/docs/17/postgres-fdw.html     |
| tablefunc          | 1.0                 | 1.0                 |             |              | https://www.postgresql.org/docs/17/tablefunc.html        |

### RDS追加提供機能

追加提供される拡張機能をインストールするには、必要に応じてパラメータグループの`shared_preload_libraries`パラメータに設定を追加した後、DBエンジン再起動が必要です。

| 拡張機能名                        | PostgreSQL14提供バージョン | PostgreSQL17提供バージョン | SUPERUSER権限 | パラメータ設定 | 備考                             | Webサイト                               |
|------------------------------|---------------------|---------------------|-------------|---------|--------------------------------|--------------------------------------|
| address_standardizer         | 3.4.1               | 3.5.1               | O           |         | postgisインストール必要                |                                      |
| address_standardizer_data_us | 3.4.1               | 3.5.1               | O           |         | postgisインストール必要                |                                      |
| pg_cron                      | 1.6.7               | 1.6.7               | O            | 追加が必要  |                              | https://github.com/citusdata/pg_cron |
| pg_repack                    | 1.4.8               | 1.5.2               | O           |         |                                | https://reorg.github.io/pg_repack/   |
| pgAudit                      | 1.6.2               | 17.0                | O           | 追加必要    |                                | https://www.pgaudit.org/             |
| pgrouting                    | 3.6.2               | 3.7.1               | O           |         | postgisインストール必要                | https://pgrouting.org/               |
| postgis                      | 3.4.1               | 3.5.1               | O           |         |                                | https://postgis.net/                 |
| postgis_raster               | 3.4.1               | 3.5.1               | O           |         | postgisインストール必要                |                                      |
| postgis_sfcgal               | 3.4.1               | 3.5.1               | O           |         | postgisインストール必要                |                                      |
| postgis_tiger_geocoder       | 3.4.1               | 3.5.1               |             |         | fuzzystrmatch, postgisインストール必要 |                                      |
| postgis_topology             | 3.4.1               | 3.5.1               | O           |         | postgisインストール必要                |                                      |
| vector                       | 0.8.0               | 0.8.0               | O           |         |                                | https://github.com/pgvector/pgvector |
